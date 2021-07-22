import React from "../../../util/react"
import "./StarB.css"
import { StarBSVG } from "../../../svgicon/StarB"

export default class StarB extends React{

    constructor($target: HTMLElement) {
        super($target, 'StarB')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="StarB">
                ${StarBSVG}
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