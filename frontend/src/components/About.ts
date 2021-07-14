import React from "../util/react"

export interface IAboutConstructor {
    $target: HTMLElement
}

export default class About extends React{

    $target: HTMLElement
    styled = `
        h1 {
            color: red;
        }
    `

    constructor({ $target }: IAboutConstructor) {
        super()
        this.$target = $target 
        this.init($target)
    }

    render() {
        this.$outer.innerHTML = `<h1>어바웃입니다.</h1>`
    }
}