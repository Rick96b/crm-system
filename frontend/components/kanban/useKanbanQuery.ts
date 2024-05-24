import { useQuery } from "@tanstack/vue-query";
import { BASE_BACKEND_URL } from "~/app.constants";
import { KANBAN_DATA } from "./kanban.data";
import type { IOrder } from "~/types/orders.types";

export function useKanbanQuery() {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: $fetch(`${BASE_BACKEND_URL}/`),
        select(data) {
            const newBoard = KANBAN_DATA
            const orders = data as IOrder[]
        }
    })
}