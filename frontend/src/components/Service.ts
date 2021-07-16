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
    }

    render() {
        this.$outer.innerHTML = `<h1>지역별 입니다.</h1>`
    }
}