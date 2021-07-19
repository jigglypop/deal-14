import { redux } from "../index";
import { IWidthHeight } from "../types/IDisplay";
import { $ } from "./select";

export default function defaultDisplay() {
    
    const base_X = $("body").getV("--base-X")
    const baseX  = $("body").getV("--baseX")
    const baseY = $("body").getV("--baseY")
    const base_sY = $("body").getV("--base_sY")
    const base_ssY = $("body").getV("--base_ssY")

    if (baseX && baseY && base_X && base_sY && base_ssY) {
        const width_height: IWidthHeight = {
            width: baseX,
            height: baseY,
            _width: base_X,
            heightS: base_sY,
            heightSS: base_ssY,            
        }
        redux.display.setWidthHeight(width_height)
    }
}