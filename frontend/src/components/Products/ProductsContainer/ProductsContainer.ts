import React from "../../../util/react"
import { $ } from "../../../util/select"
import Card from "../Card/Card"
import "./ProductsContainer.css"
import { ProductTypes } from "../../../types/product"
import getID from "../../../util/getID"
import { redux } from "../../.."
import { likeproductListApi, productListApi } from "../../../requests/product"
import { NotHave } from "../../../common/NotHave/NotHave"

export default class ProductsContainer extends React{

    protected products: ProductTypes[] = []
    protected height = redux.display.getWidthHeight().heightSS
    protected ID = getID()
    public state = {
        flag: false,
        products: []
    }
    protected isMy = false

    constructor($target: HTMLElement, products: ProductTypes[], height: string, isMy?: boolean) {
        super($target, 'ProductsContainer')
        this.height = height;
        this.setState({
            products: products
        })
        if (isMy) {
            this.isMy = true
        }
        this.init() 
    }

    css() {
        return `
        #products-container-content${this.ID} {
            position: relative;
            height: ${this.height};
            overflow-x: hidden;
            overflow-y: scroll;
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