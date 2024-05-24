export interface OrderDto {
    title: string,
    price: number,
    status: string,
    client: string,
    dateOfCreation: Date,
    commentaries: { text: string, createdAt: Date }[]
}

export interface OrderOutDto extends OrderDto {
    id: number
}