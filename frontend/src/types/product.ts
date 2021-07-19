export type ProductTypes = {
    id: number;
    title: string;
    price: number;
    isSoldOut: boolean;
    content: string;
    category: number;
    userId: string;
    townId: number;
    createdAt: string;
    updatedAt: string;
    user?: any;
    town?: any;
    productImages: [
        {
            filePath: string
        }
    ]
}