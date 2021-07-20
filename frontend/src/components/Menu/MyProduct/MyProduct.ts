import React from "../../../util/react"
import "./MyProduct.css"
import { errorMsg } from "../../../util/errorMsg"
import { myproductListApi } from "../../../requests/product"
import { IProductListResponse } from "../../../types/IProductListResponse"
import { $ } from "../../../util/select"
import ProductsContainer from "../../Products/ProductsContainer/ProductsContainer"

export default class MyProduct extends React{


    constructor($target: HTMLElement) {
        super($target, 'MyProduct')
        this.init()
    }

    css() {
        return `
        #MyProduct-Page {
            position: relative;
            
            display: flex;
            justify-content: center;
            align-items: center;
            
            width: 100%;
            height: 100%;
        }`
    }
    
    render() {
        this.$outer.innerHTML = `
            <div id="MyProduct-Page" >
            </div>`
        this.getMyList()
    }

    getMyList() {
        myproductListApi()
            .then(data => {
                this.componentWillMount(data, '')
            }).catch(err => {
                this.componentWillMount(null, errorMsg(err))
            })
    }

    componentWillMount(data: IProductListResponse | null, err: string) {
        const MyProductPage = $("#MyProduct-Page").getById()
        if (MyProductPage && data) {
            if (data) {
                const products = new ProductsContainer(MyProductPage, data.data.products, '520px')
                products.init()
            } else {
                MyProductPage.innerHTML = `<h4>${err}</h4>`
            }
        } 
    }

    methods() { }
}