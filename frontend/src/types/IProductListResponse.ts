import { ProductTypes } from "./product";

export interface IProductListResponse {
    data: {
        products: ProductTypes[] 
    }
}