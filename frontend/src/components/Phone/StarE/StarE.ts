import React from "../../../util/react"
import "./StarE.css"
import { StarESVG } from "../../../svgicon/StarE"

export default class StarE extends React{

    constructor($target: HTMLElement) {
        super($target, 'StarE')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="StarE">
                ${StarESVG}
            </div>
        `
    }
    css() {
        return `

        `
    }

    methods() {
    }
}