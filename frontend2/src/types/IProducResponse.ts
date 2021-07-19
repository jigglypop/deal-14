import { ProductTypes } from "./product";

export interface IProductResponse {
    data: {
        product: ProductTypes
    }
}