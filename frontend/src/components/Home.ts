import React from "../util/react"

export interface IHomeConstructor {
    $target: HTMLElement
}

export default class Home extends React{

    $target: HTMLElement
    styled = `
        h1 {
            color: blue;
        }
    `

    constructor({ $target }: IHomeConstructor) {
        super()
        this.$target = $target 
        this.init($target)
    }

    render() {
        this.$outer.innerHTML = `<h1>홈입니다.</h1>`
    }
}