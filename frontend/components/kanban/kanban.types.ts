import type { EnumStatus } from "~/types/orders.types"

export interface ICard {
    id: string
    name: string
    price: number
    $createdAt: Date
    companyName: string
    status: string
}

export interface IColumn {
    id: EnumStatus
    name: string
    items: ICard[]
}