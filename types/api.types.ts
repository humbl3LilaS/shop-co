export interface IProduct {
    id: string;
    name: string;
    price: number;
    discount: number | null;
    description: string;
    coverImage: string;
    arrivedAt: Date;
}