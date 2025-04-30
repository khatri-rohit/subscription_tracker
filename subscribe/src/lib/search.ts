/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
import { Subscription } from "./types";

type Options = {
    fields: string[],
    matchType: string
}

export function search(options: Options) {
    const { fields, matchType } = options;

    return (data: Subscription[], query: string) => {
        const trimmedQuery = String(query).trim().toLowerCase();

        if (trimmedQuery === "") {
            return data;
        }

        return data.filter((item: Subscription) => {
            const fieldsArray = fields
                ? Array.isArray(fields)
                    ? fields
                    : [fields]
                : getAllKeys(item);

            return fieldsArray.some((field: string) => {
                const fieldValue = getFieldValue(item, field);

                if (fieldValue == null) {
                    return false;
                }

                const stringValue = convertToString(fieldValue).toLowerCase();

                switch (matchType) {
                    case "exact":
                        return stringValue === trimmedQuery;
                    case "startsWith":
                        return stringValue.startsWith(trimmedQuery);
                    case "endsWith":
                        return stringValue.endsWith(trimmedQuery);
                    case "contains":
                        return stringValue.includes(trimmedQuery);
                    case "fuzzySearch": {
                        const threshold = 0.3;
                        const score = nGramFuzzySearch(stringValue, trimmedQuery);
                        return score >= threshold;
                    }
                    default:
                        throw new Error(`Unsupported match type: ${matchType}`);
                }
            });
        });
    };
}

export const nGramFuzzySearch = (value: string, query: string) => {
    const n = 2;

    const valueGrams = generateNGrams(value.toLowerCase(), n);
    const queryGrams = generateNGrams(query.toLowerCase(), n);

    const intersection = valueGrams.filter((gram) => queryGrams.includes(gram));
    // console.log(valueGrams);
    // console.log(intersection.length / Math.max(valueGrams.length, queryGrams.length));

    return intersection.length / Math.max(valueGrams.length, queryGrams.length);
};

const generateNGrams = (str: string, n: number) => {
    const grams = [];

    for (let i = 0; i <= str.length - n; i++) {
        grams.push(str.slice(i, i + n));
    }

    return grams;
};


export function convertToString(value: any): string { // Modified to accept any value
    if (value instanceof Date) {
        return value.toISOString();
    }

    if (typeof value === "boolean") {
        return value ? "true" : "false";
    }

    return String(value);
}

export function getFieldValue(item: Subscription, field: string) {
    const keys = field.split(/[\.\[\]]/).filter(Boolean);
    let value: any = item; // Allow any type for nested properties

    for (const key of keys) {
        if (value == null) {
            return null;
        }
        value = value[key as keyof typeof value]; // Type-safe property access
    }

    return value;
}


export function getAllKeys(item: any, prefix = "") {
    if (!item || typeof item !== "object") {
        return [];
    }

    const fields: string[] = [];

    for (const key in item) { // Use "in" to iterate object properties. Can be replaced by Object.keys(item) for own properties
        const value = item[key as keyof Subscription]; // corrected type access
        const fieldPath = prefix ? `${prefix}.${key}` : key;
        // console.log(value);

        if (Array.isArray(value)) {
            fields.push(...value.flatMap((arrayItem, index) => getAllKeys(arrayItem, `${fieldPath}[${index}]`)));
        } else if (typeof value === "object" && value !== null) {
            fields.push(...getAllKeys(value, fieldPath));

        } else {
            fields.push(fieldPath);
        }

    }

    return fields;
}