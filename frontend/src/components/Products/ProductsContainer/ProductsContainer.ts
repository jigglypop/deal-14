import React from "../../../util/react"
import { $ } from "../../../util/select"
import Card from "../Card/Card"
import "./ProductsContainer.css"
import { ProductTypes } from "../../../types/product"
import getID from "../../../util/getID"
import { redux } from "../../.."
import { NotHave } from "../../../common/NotHave/NotHave"

export default class ProductsContainer extends React{

    protected products: ProductTypes[] = []
    protected height = true
    protected ID = getID()
    public state = {
        flag: false,
        products: []
    }
    protected isMy = false

    constructor($target: HTMLElement, products: any, height?: boolean, isMy?: boolean) {
        super($target, 'ProductsContainer')
        if (height) {
            this.height = height;
        }
        if (isMy) {
            this.isMy = true
        }
        this.state.products = products
        this.init() 
    }

    css() {
        return `
        #products-container-content${this.ID} {
            position: relative;
            width: 100%;
            height: 525px;
            overflow-x: hidden;
            overflow-y: scroll;

            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            text-align: center;
            flex-wrap: wrap;
        }`
    }

    render() {
        this.$outer.innerHTML = `
        <div id="products-container-content${this.ID}" ></div>`
        const productsContainerContent = $(`#products-container-content${this.ID}`).getById()
        if (productsContainerContent) {
            const products = this.state.products

            if (products.length !== 0) {
                products.forEach(product => {
                    const UUID = getID()
                    const card = new Card(productsContainerContent, product, this.isMy, UUID)
                    redux.instance.setInstance(`card-${UUID}`, card)
                })
            } else {
                productsContainerContent.innerHTML = NotHave
            }
        }
        
    }
    methods() {
    }
}