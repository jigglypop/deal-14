import React from "../util/react"

export default class Card extends React{

    styled = `
        h1 {
            color: blue;
        }

        .Card-Inner {
            border: 2px_solid_black;
            margin: 10px;
        }
    `

    num: number

    constructor($target: HTMLElement, num: number) {
        super($target, 'Card')
        this.num = num
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
        <div class="Card-Inner" >
            <h4>카드섹션 ${this.num}</h4>
        </div>`
    }
}