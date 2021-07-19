import React from "../../util/react"
import { $ } from "../../util/select"
import Card from "./Card"
import "../../public/css/ProductsContainer.css"
import { ProductTypes } from "../../types/product"
import getID from "../../util/getID"

export default class ProductsContainer extends React{


    products: ProductTypes[] = []
    height = '620px'
    ID = getID()
    state = {
        flag: false
    }

    constructor($target: HTMLElement, products: ProductTypes[], height: string) {
        super($target, 'ProductsContainer')
        this.height = height;
        this.products = products
        this.init() 
    }
    css() {
        return `
        #products-container-content${this.ID} {
            position: relative;
            height: ${this.height};
            overflow: scroll;
        }`
    }
    render() {
        this.$outer.innerHTML = `
        <div id="products-container-content${this.ID}" ></div>`
        const productsContainerContent = $(`#products-container-content${this.ID}`).getById()
        if (productsContainerContent) {
            this.products.forEach(product=> new Card(productsContainerContent, product))       
        }
    }
    methods() {}
}