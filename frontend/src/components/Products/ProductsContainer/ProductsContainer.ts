import React from "../../../util/react"
import { $ } from "../../../util/select"
import Card from "../Card/Card"
import "./ProductsContainer.css"
import { ProductTypes } from "../../../types/product"
import getID from "../../../util/getID"
import { redux } from "../../.."
import { likeproductListApi, productListApi } from "../../../requests/product"

export default class ProductsContainer extends React{


    products: ProductTypes[] = []
    height = '620px'
    ID = getID()
    state = {
        flag: false,
        products: []
    }
    isMy = false

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
            overflow: scroll;
        }`
    }
    getMyList() {
        likeproductListApi()
            .then(data => {
                if (!data.hasOwnProperty('status')) {
                    const _product = data.data.products
                    for (let item of _product) {
                        // mylike.push(item.id)
                        let temp = $(`#LikeButton-Inner-${item.id}`).getById()
                        let heart: any = temp?.querySelector(".like-heart")
                        if (heart) {
                            heart.setAttribute('fill', "var(--red)")
                        }
                    }
                } 
            })
        
    }
    render() {
        this.$outer.innerHTML = `
        <div id="products-container-content${this.ID}" ></div>`
        const productsContainerContent = $(`#products-container-content${this.ID}`).getById()
        if (productsContainerContent) {
            this.state.products.forEach(product=> new Card(productsContainerContent, product, this.isMy))       
        }
        
    }
    methods() {
        this.getMyList()
    }
}