import Login from "./Login"
import Minus from "./Minus"
import Plus from "./Plus"
import Product from "./Product"

export function Redux() {
    return {
        minus: Minus(),
        plus: Plus(),
        login: Login(),
        product: Product()
    }
}