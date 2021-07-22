import React from "../../../util/react"
import "./Name.css"
import { StarASVG } from "../../../svgicon/StarA"

export default class Name extends React{

    constructor($target: HTMLElement) {
        super($target, 'Name')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Name">
                <div class="name-item" id="name-item-large" >
                    <h5>10CM</h5>
                </div>
                <div class="name-item" id="name-item-small" >
                    <h5>열살차이나는 10CM들</h5>
                    <h5 class="name-item-name" >염동환 | 최진우</h5>
                </div>
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