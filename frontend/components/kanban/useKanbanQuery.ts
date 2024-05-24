import { useQuery } from "@tanstack/vue-query";
import { BASE_BACKEND_URL } from "~/app.constants";
import { KANBAN_DATA } from "./kanban.data";
import type { IOrder } from "~/types/orders.types";

export function useKanbanQuery() {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () => $fetch(`${BASE_BACKEND_URL}/order/getAll`),
        select(data) {
            const newBoard = KANBAN_DATA
            const orders = data as IOrder[]
            console.log(data)
            for(const order of orders) {
                const column = newBoard.find(col => col.id === order.status)
                if (column) {
                    column.items.push({
                        id: order.id,
                        name: order.title,
                        price: order.price,
                        $createdAt: new Date(order.dateOfCreation),
                        companyName: order.client,
                        status: order.status
                    })
                }
            }
            
        }
    })
}