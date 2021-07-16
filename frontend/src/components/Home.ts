import React from "../util/react"
import { $ } from "../util/select"
import Card from "./Card"
import "../public/css/Home.css"

export default class Home extends React{

    styled = `

        h1 {
            color: blue;
        }

        ul {
            li {
                color: red;
            }
        }

        #home-inner {
            position: relative;
        }

        #home-content {
            position: relative;
            height: 620px;
            overflow: scroll;
        }
    `

    constructor($target: HTMLElement) {
        super($target, 'Home')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
        <div id="home-inner" >
            <div id="home-content" ></div>
        </div>`
        const homeContent = $("#home-content").getById()
        if (homeContent) {
            for (let i = 0; i < 20; i++){
                new Card(homeContent, 1)
            }
        }
    }
}