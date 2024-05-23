import { useQuery } from "@tanstack/vue-query";
import { BASE_BACKEND_URL } from "~/app.constants";

export function useKanbanQuery() {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: $fetch(`${BASE_BACKEND_URL}/`)
    })
}