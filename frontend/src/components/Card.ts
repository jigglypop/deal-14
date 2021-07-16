import React from "../util/react"
import "../public/css/Card.css"

export default class Card extends React{

    styled = `
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

    getHour() {
        const date: Date = new Date(this.item.createdAt)
        const now: Date = new Date()
        const value = Math.floor((now.getTime() - date.getTime())/ (1000 * 60 * 60))
        return value
    }

    render() {
        this.getHour()
        this.$outer.innerHTML = `
        <div class="Card-Inner" >
            <h4>${this.item.title}</h4>
            <h5>${this.item.price}</h5>
            <h5>${this.getHour()}시간 전</h5>
        </div>`
    }
    methods(){}
}