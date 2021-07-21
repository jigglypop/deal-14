import React from "../../util/react"
import "./BackGround.css"

export default class BackGround extends React{

    constructor($target: HTMLElement) {
        super($target, 'BackGround')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="BackGround"></div>
        `
    }
    css() {
        return ``
    }
    methods() {}
}