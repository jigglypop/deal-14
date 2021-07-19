import Check from "./check"
import Display from "./display"
import Flag from "./Flag"
import Instance from "./instance"
import Login from "./Login"
import Product from "./Product"
import Register from "./Register"
import SliderToggle from "./Slider"
import Upload from "./Upload"
import Write from "./Write"

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
    }
}