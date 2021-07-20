import Products from "./Products"
import Check from "./check"
import Display from "./display"
import Flag from "./Flag"
import Instance from "./instance"
import Login from "./Login"
import Product from "./Product"
import Register from "./Register"
import Router from "./router"
import SliderToggle from "./Slider"
import Upload from "./Upload"
import Write from "./Write"
import Remove from "./remove"
import Update from "./Update"

export function Redux() {
    return {
        login: Login(),
        register: Register(),
        check: Check(),
        product: Product(),
        flag: Flag(),
        instance: Instance(),
        display: Display(),
        slidertoggle: SliderToggle(),
        upload: Upload(),
        write: Write(),
        router: Router(),
        products: Products(),
        remove: Remove(),
        update: Update(),
    }
}