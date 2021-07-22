import React from "../../util/react"
import "./Toast.css"

export default class Toast extends React{

    constructor($target: HTMLElement) {
        super($target, 'Toast')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
        `
    }
    css() {
        return ``
    }
    methods() {}
}