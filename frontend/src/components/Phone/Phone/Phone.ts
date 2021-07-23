import React from "../../../util/react"
import "./Phone.css"

export default class Phone extends React{

    constructor($target: HTMLElement) {
        super($target, 'Phone')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Phone"></div>
        `
    }

    css() {
        return ``
    }
    methods() {}
}