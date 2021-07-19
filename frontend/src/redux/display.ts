import { IWidthHeight } from "../types/IDisplay"


const Display = function() {
    let width_height = {
        width: "",
        height: "",
        _width: "",
        heightS: "",
        heightSS: "",
    }
    return {
        // width, height 설정
        setWidthHeight(data: IWidthHeight) {
            width_height = { ...data }
            return width_height
        },
        getWidthHeight() {
            return width_height
        }
    }
}
export default Display