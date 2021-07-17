import { redux } from "../index";
import { IWidthHeight } from "../types/IDisplay";
import { $ } from "./select";

export default function defaultDisplay() {
    
    const base_X = $("body").getV("--base-X")
    const baseX  = $("body").getV("--baseX")
    const baseY = $("body").getV("--baseY")

    if (baseX && baseY && base_X) {
        const width_height: IWidthHeight = {
            width: baseX,
            height: baseY,
            _width: base_X
        }
        redux.display.setWidthHeight(width_height)
    }
}