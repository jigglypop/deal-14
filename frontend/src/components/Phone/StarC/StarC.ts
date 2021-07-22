import React from "../../../util/react"
import "./StarC.css"
import { StarCSVG } from "../../../svgicon/StarC"

export default class StarC extends React{

    constructor($target: HTMLElement) {
        super($target, 'StarC')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="StarC">
                ${StarCSVG}
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