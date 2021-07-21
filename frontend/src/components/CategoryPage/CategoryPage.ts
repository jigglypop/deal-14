import React from "../../util/react"
import "./CategoryPage.css"
import { $ } from "../../util/select";
import { redux } from "../../";
import ProductsContainer from "../Products/ProductsContainer/ProductsContainer";
import { productListApi } from "../../requests/product";
import { ProductTypes } from "../../types/product";
import KeyByCategory from "./KeyByCategory";
import { NotHave } from "../../common/NotHave/NotHave";

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
                margin: 10px;
            }  
        `
    }
    render() {
        this.$outer.innerHTML = `
            <h4 class="category-title" >카테고리(${KeyByCategory[this.categoryId]})</h4>
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

            const Productscontainer = new ProductsContainer(ProductsInner, products, redux.display.getWidthHeight().heightS)
            redux.instance.setInstance('Productscontainer',Productscontainer)

        }
    }
 

}