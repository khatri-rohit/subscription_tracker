import { string } from "zod";
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

            // console.log(fieldsArray);

            return fieldsArray.some((field) => {
                const fieldValue = getFieldValue(item, field);
                // console.log(fieldValue);

                if (fieldValue == null) {
                    return false;
                }

                const stringValue = convertToString(fieldValue).toLowerCase();
                // console.log(stringValue, trimmedQuery);

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
                        const threshold = 0.3; // Minimum similarity score required
                        const score = nGramFuzzySearch(stringValue, trimmedQuery);
                        // console.log(score);
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
    const n = 2; // Default to bigrams (two-character sequences)

    const valueGrams = generateNGrams(value.toLowerCase(), n);
    const queryGrams = generateNGrams(query.toLowerCase(), n);
    // console.log(valueGrams);
    // console.log(queryGrams);

    const intersection = valueGrams.filter((gram) => queryGrams.includes(gram));
    // console.log(intersection);

    return intersection.length / Math.max(valueGrams.length, queryGrams.length);
};

const generateNGrams = (str: string, n: number) => {
    const grams = [];

    for (let i = 0; i <= str.length - n; i++) {
        grams.push(str.slice(i, i + n));
    }

    return grams;
};


export function convertToString(value: Date | boolean) {
    if (value instanceof Date) {
        return value.toISOString();
    }

    if (typeof value === "boolean") {
        return value ? "true" : "false";
    }

    return String(value);
}

export function getFieldValue(item, field) {
    const keys = field.split(/[\.\[\]]/).filter(Boolean);
    let value = item;

    for (const key of keys) {
        if (value == null) {
            return null;
        }
        value = value[key];
    }

    return value;
}


export function getAllKeys(item: Subscription, prefix = "") {
    console.log("Get All Keys 1");
    if (!item || typeof item !== "object") {
        return [];
    }
    console.log("Get All Keys 2");


    const fields = [];

    for (const key of Object.keys(item)) {
        const value = item[key];
        console.log(value);

        const fieldPath = prefix ? `${prefix}.${key}` : key;

        if (Array.isArray(value)) {
            value.forEach((arrayItem, index) => {
                if (
                    arrayItem &&
                    typeof arrayItem === "object" &&
                    !(arrayItem instanceof Date)
                ) {
                    fields.push(...getAllKeys(arrayItem, `${fieldPath}[${index}]`));
                } else {
                    fields.push(`${fieldPath}[${index}]`);
                }
            });
        } else if (value instanceof Date) {
            fields.push(fieldPath);
        } else if (value && typeof value === "object") {
            fields.push(...getAllKeys(value, fieldPath));
        } else {
            fields.push(fieldPath);
        }
    }
    console.log(fields);
    return fields;
}