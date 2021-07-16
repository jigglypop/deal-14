import Login from "./Login"
import Product from "./Product"

export function Redux() {
    return {
        login: Login(),
        product: Product()
    }
}