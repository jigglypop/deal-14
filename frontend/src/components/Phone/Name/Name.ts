import { redux } from "../../.."
import cache from "../../../util/cache"
import React from "../../../util/react"
import { $ } from "../../../util/select"
import "./Name.css"

export default class Name extends React{

    constructor($target: HTMLElement) {
        super($target, 'Name')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Name">
                <div class="name-item" id="name-large" >
                    <h5>10CM</h5>
                </div>
                <div class="name-item" id="name-small" >
                    <h5>IPad</h5>
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