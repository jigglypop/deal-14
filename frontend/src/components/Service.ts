import React from "../util/react"

export interface IServiceConstructor {
    $target: HTMLElement
}

export default class Service extends React{

    $target: HTMLElement
    styled = `
        h1 {
            color: red;
        }
    `

    constructor({ $target }: IServiceConstructor) {
        super()
        this.$target = $target 
        this.init($target)
    }

    render() {
        this.$outer.innerHTML = `<h1>서비스입니다.</h1>`
    }
}