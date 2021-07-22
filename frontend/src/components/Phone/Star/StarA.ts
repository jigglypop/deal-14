import React from "../../../util/react"
import "./StarA.css"
import { StarASVG } from "../../../svgicon/StarA"

export default class StarA extends React{

    constructor($target: HTMLElement) {
        super($target, 'StarA')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="StarA">
                ${StarASVG}
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