import React from "../../../util/react"
import "./StarD.css"
import { StarDSVG } from "../../../svgicon/StarD"

export default class StarD extends React{

    constructor($target: HTMLElement) {
        super($target, 'StarD')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="StarD">
                ${StarDSVG}
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