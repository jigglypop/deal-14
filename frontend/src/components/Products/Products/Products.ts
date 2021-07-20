import React from "../../../util/react"
import "./Products.css"
import { $ } from "../../../util/select";
import { redux } from "../../../";
import ProductsContainer from "../ProductsContainer/ProductsContainer";
import { productListApi } from "../../../requests/product";
import { IProductListResponse } from "../../../types/IProductListResponse";
import { errorMsg } from "../../../util/errorMsg";

export default class Products extends React{

    constructor($target: HTMLElement) {
        super($target, 'Products')
        this.init()
    }
    getList() {
        productListApi()
            .then(data => {
                redux.products.setProducts(data.data.products)
                this.componentWillMount(data, '')
            }).catch(err => {
                this.componentWillMount(null, errorMsg(err))
            })
    }
    css() {
        return `        
        `
    }
    render() {
        this.$outer.innerHTML = `
            <div id="Products-Inner" >
            </div>`
        this.getList()
    }

    componentWillMount(data: IProductListResponse | null, err: string) {
        const ProductsInner = $('#Products-Inner').get()
        if (ProductsInner && data) {
            const Productscontainer = new ProductsContainer(ProductsInner, data.data.products, redux.display.getWidthHeight().height)
            redux.instance.setInstance('Productscontainer',Productscontainer)
        }
    }
 
    methods() {
    }
}