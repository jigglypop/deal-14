import { redux } from ".."
import React from "../util/react"

export default class Location extends React{

    constructor($target: HTMLElement) {
        super($target, 'Location')
        this.init()
        this.methods()
    }
    css() {
        return ``
    }
    render() {
        this.$outer.innerHTML = `
            <input id="input" />
        `
    }

    methods() {
    }
}