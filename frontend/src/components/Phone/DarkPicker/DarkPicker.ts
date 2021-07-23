import { MoonSVG } from "../../../svgicon/Moon"
import { SunSVG } from "../../../svgicon/Sun"
import cache from "../../../util/cache"
import React from "../../../util/react"
import { $ } from "../../../util/select"
import { MoonAttr, setMode, setVAll, SunAttr } from "../../../util/setDisplay"
import "./DarkPicker.css"

export default class DarkPicker extends React{

    constructor($target: HTMLElement) {
        super($target, 'DarkPicker')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="DarkPicker">
                <div class="dark-item" id="dark-sun" >
                    ${SunSVG}
                </div>
                <div class="dark-item" id="dark-moon" >
                    ${MoonSVG}
                </div>
            </div>
        `
    }
    css() {
        return `

        `
    }

    changeMode(mode: string, attr: object) {
        setVAll(attr)
        cache.set("dark", attr)
        cache.set("mode", mode)
        const darkSun = $('#dark-sun').getById()
        if (darkSun) {
            darkSun.classList.toggle("isNotDisplay")
        }
        const darkMoon = $('#dark-moon').getById()
        if (darkMoon) {
            darkMoon.classList.toggle("isNotDisplay")
        }
    }

    methods() {
        setMode()
        $('#dark-sun').on('click', () => this.changeMode('sun', SunAttr))
        $('#dark-moon').on('click', () => this.changeMode('moon', MoonAttr))
    }
}