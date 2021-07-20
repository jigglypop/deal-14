import React from "../../util/react"
import { $ } from "../../util/select"
import "./Home.css"
import { redux } from "../.."
import Products from "../Products/Products/Products"

export default class Home extends React{

    constructor($target: HTMLElement) {
        super($target, 'Home')
        this.init() 
    }
    css() {
        return `
        #home-inner {
            position: relative;
        }`
    }
    render() {
        this.$outer.innerHTML = `
        <div id="home-inner" >
        </div>`
        this.componentWillMount()
    }

    componentWillMount() {
        const homeContent = $("#home-inner").getById()
        if (homeContent ) {
            const products = new Products(homeContent)
            redux.instance.setInstance("products", products)
        } 
    }

    methods() {}
}