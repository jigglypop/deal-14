import React from "../../util/react"
import "./CategoryPage.css"
import { $ } from "../../util/select";
import { redux } from "../../";
import ProductsContainer from "../Products/ProductsContainer/ProductsContainer";
import { productListApi } from "../../requests/product";
import { ProductTypes } from "../../types/product";
import KeyByCategory from "./KeyByCategory";

export default class CategoryPage extends React{

    categoryId: number

    constructor($target: HTMLElement, categoryId: number) {
        super($target, 'CategoryPage')

        this.categoryId = categoryId
        this.init()
    }

    css() {
        return `
            .category-title {
                font-size: 14px;
                border: 2px_solid_var(--text);
                color: var(--text);
                border-radius: 10px;
                margin: 20px;
                padding: 10px;
            }
            
            .category-title-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        `
    }
    render() {
        this.$outer.innerHTML = `
            <div class="category-title-wrapper" >
                <h4 class="category-title" >카테고리(${KeyByCategory[this.categoryId]})</h4>
            </div>
            <div id="CategoryPage-Inner" >
            </div>`
        this.getList()
    }

    methods() {
    }

    getList() {
        productListApi()
            .then(data => {
                return data.data.products.filter((product: ProductTypes) => product.category === this.categoryId)
            }).then(products => {
                this.componentWillMount(products, '')
            })
    }

    componentWillMount(products: ProductTypes[], err: string) {
        const ProductsInner = $('#CategoryPage-Inner').get()
        if (ProductsInner && products) {
            redux.products.setProducts(products)

            const Productscontainer = new ProductsContainer(ProductsInner, products, false)
            redux.instance.setInstance('Productscontainer',Productscontainer)

        }
    }
 

}