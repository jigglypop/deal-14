import { redux } from ".."
import React from "../util/react"

export default class Location extends React{

    styled = `
        h1 {
            color: red;
        }
    `

    constructor($target: HTMLElement) {
        super($target, 'Location')
        this.init()
        this.methods()
    }

    render() {
        this.$outer.innerHTML = `
            <input id="input" />
        `
    }

    methods() {
    }
}