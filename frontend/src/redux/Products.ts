import { ProductTypes } from "../types/product"

const Products = function() {
    let products: ProductTypes[] = []
    return {
        // 리스트 가져온 후 promise 가로채기
        setProducts(_products: ProductTypes[]) {
            products = _products
            return products
        },
        getProducts() {
            return products
        },
    }
}
export default Products