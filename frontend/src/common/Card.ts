import React from "../util/react"
import "../public/css/Card.css"

export default class Card extends React{

    styled = `
        h1 {
            color: blue;
        }

        .Card-Inner {
            position: relative;
            border: 2px_solid_black;
            margin: 10px;
            height: 100%;
        }
    `

    item: any

    constructor($target: HTMLElement, item: any) {
        super($target, 'Card')
        this.item = item
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
        <div class="Card-Inner" >
            <h4>카드섹션 ${this.item.title}</h4>
            <h4>${this.item.image}</h4>
            <h5>${this.item.price}</h5>
            <h5>${this.item.createdAt}</h5>
        </div>`
    }
    methods(){}
}