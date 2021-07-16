import React from "../util/react"
import "../public/css/About.css"

export default class About extends React{

    styled = `
        h1 {
            color: red;
        }
    `
    constructor($target: HTMLElement) {
        super($target, 'About')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
        <div id="about" >
            <img src="public/image/main.png" />
            <h1>어바웃입니다.</h1>
        </div>
        `
    }
}