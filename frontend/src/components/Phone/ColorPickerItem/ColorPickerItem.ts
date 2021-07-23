import cache from "../../../util/cache"
import getID from "../../../util/getID"
import React from "../../../util/react"
import { $ } from "../../../util/select"
import "./ColorPickerItem.css"

export default class ColorPickerItem extends React{

    private key = ""
    private value = ""
    private ID = getID()
    
    constructor($target: HTMLElement, key: string, value: string) {
        super($target, 'ColorPickerItem')
        this.key = key
        this.value = value
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="ColorPickerItem-${this.ID}" class="ColorPickerItem" >
            </div>
        `
    }
    css() {
        return `
            #ColorPickerItem-${this.ID} {
                width: 25px;
                height: 25px;
                cursor: pointer;
                background: ${this.value};
                z-index: 2;
                border-radius: 50%;
                box-shadow: 2px_2px_10px_black;
            }
        
        `
    }
    methods() {
        let that = this
        $(`#ColorPickerItem-${this.ID}`).on('click', function () {
            const mode = cache.get("mode")
            $("body").setV("--header", that.key)
            if (mode === "moon") {
                $("body").setV("--text", that.value)
                $("body").setV("--white-text", that.value)      
            }
        })
    }
}