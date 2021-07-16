import React from "../util/react"
import { $ } from "../util/select"
import Card from "./Card"
import "../public/css/Home.css"
import { productListApi } from "../requests/product"

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
        this.getList()
    }

    getList() {
        productListApi()
            .then(data => {
                this.componentWillMount(data)
            }).catch(err => {
                console.log(err)
            })
    }

    componentWillMount(data: any) {
        const homeContent: any = $("#home-content").getById()

        for (let i = 0; i < data.data.products.length; i++) {
            const item = data.data.products[i]
            new Card(homeContent, item)
        }
    }
    methods(){}
}