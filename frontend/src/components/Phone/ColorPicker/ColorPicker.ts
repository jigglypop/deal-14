import React from "../../../util/react"
import { $ } from "../../../util/select"
import ColorPickerItem from "../ColorPickerItem/ColorPickerItem"
import "./ColorPicker.css"

export default class ColorPicker extends React{

    constructor($target: HTMLElement) {
        super($target, 'ColorPicker')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="ColorPicker">
            </div>
        `
    }
    css() {
        return `
        
        `
    }
    methods() {
        const ColorPicker = $('#ColorPicker').getById()
        if (ColorPicker) {
            new ColorPickerItem(ColorPicker, "linear-gradient(45deg, #0cebeb, #20e3b2, #29ffc6)", "#0cebeb");
            new ColorPickerItem(ColorPicker, "linear-gradient(45deg, #8e2de2, #4a00e0)", "#8e2de2")
            new ColorPickerItem(ColorPicker, "linear-gradient(45deg, #ff6a00, #ee0979)", "#ee0979")
            new ColorPickerItem(ColorPicker, "linear-gradient(45deg, #ffe259, #ffa751)", "#ffa751")
        }
    }
}