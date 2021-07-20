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
            if (products.length !== 0) {
                const Productscontainer = new ProductsContainer(ProductsInner, products, redux.display.getWidthHeight().heightS)
                redux.instance.setInstance('Productscontainer',Productscontainer)
            } else {
                ProductsInner.innerHTML = `
                    <div class="no-category-outer" >
                        <img src="public/image/main.png" class="no-category" />
                        <h4>카테고리 상품이 없습니다</h4>
                    </div>
                `
            }

        }
    }
 

}