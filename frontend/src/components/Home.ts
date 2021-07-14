import React from "../util/react"

export default class Home extends React{

    styled = `
        h1 {
            color: blue;
        }
    `

    constructor($target: HTMLElement) {
        super($target, 'Home')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `<h1>홈입니다.</h1>`
    }
}