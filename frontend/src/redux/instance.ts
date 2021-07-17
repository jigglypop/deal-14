import AuthContainer from "../components/Auth/AuthContainer"
import Header from "../components/Header"
import Slider from "../components/Slider"

const Instance = function() {
    let instance: any = {
        header: {},
        slider: {},
        authcontainer: {}
    }
    return {
        // 헤더 가져오기
        setInstanceHeader(value: Header) {
            instance.header = value
            return instance
        },
        getInstanceHeader() {
            return instance.header
        },
        // 슬라이더 가져오기
        setInstanceSlider(value: Slider) {
            instance.slider = value
            return instance
        },
        getInstanceSlider() {
            return instance.slider
        },
        // Auth Container 
        setInstanceAuthContainer(value: AuthContainer) {
            instance.authcontainer = value
            return instance
        },
        getInstanceAuthContainer() {
            return instance.authcontainer
        }
    }
}
export default Instance