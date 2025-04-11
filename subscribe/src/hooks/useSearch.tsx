import { Subscription } from "@/lib/types";
import { useMemo } from "react";
import useDebounce from "./UseDebounce";

type FilterFunction = (data: Subscription[], query: string) => Subscription[];

function useSearch(data: Subscription[], query: string, ...filters: FilterFunction[]) {
    const debouncedQuery = useDebounce(query, 300);

    return useMemo(() => {
        const dataArray = Array.isArray(data) ? data : [data];

        try {
            // Apply each filter function in sequence
            return filters.reduce(
                (acc, feature) => feature(acc, debouncedQuery),
                dataArray
            );
        } catch (error) {
            console.error("Error applying search features:", error);
            return dataArray;
        }
    }, [data, debouncedQuery, filters]);
}

export default useSearch;