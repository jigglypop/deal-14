import React from "../../util/react"
import { $ } from "../../util/select"
import "./Home.css"
import { productListApi } from "../../requests/product"
import { errorMsg } from "../../util/errorMsg"
import { IProductListResponse } from "../../types/IProductListResponse"
import ProductsContainer from "../Products/ProductsContainer/ProductsContainer"

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
        this.getList()
    }

    getList() {
        productListApi()
            .then(data => {
                this.componentWillMount(data, '')
            }).catch(err => {
                this.componentWillMount(null, errorMsg(err))
            })
    }

    componentWillMount(data: IProductListResponse | null, err: string) {
        const homeContent = $("#home-inner").getById()
        if (homeContent && data) {
            if (data) {
                new ProductsContainer(homeContent, data.data.products, '620px')
            } else {
                homeContent.innerHTML = `<h4>${err}</h4>`
            }
        } 
    }

    methods() {}
}