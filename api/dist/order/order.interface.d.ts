export interface OrderDto {
    id: number;
    title: string;
    price: number;
    status: string;
    client: string;
    dateOfCreation: Date;
    commentaries: {
        text: string;
        createdAt: Date;
    }[];
}
