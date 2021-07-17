import React from "../util/react"
import { $ } from "../util/select"
import Card from "./Card"
import "../public/css/Home.css"
import { productListApi } from "../requests/product"
import { errorMsg } from "../util/errorMsg"
import { IProductListResponse } from "../types/IProductListResponse"

export default class Home extends React{

    constructor($target: HTMLElement) {
        super($target, 'Home')
        this.init() 
    }
    css() {
        return `
        #home-inner {
            position: relative;
        }

        #home-content {
            position: relative;
            height: 620px;
            overflow: scroll;
        }`
    }
    render() {
        this.$outer.innerHTML = `
        <div id="home-inner" >
            <div id="home-content" ></div>
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
        let homeContent: HTMLElement | null = $("#home-content").getById()
        if (data) {
            data.data.products.forEach(product=> homeContent? new Card(homeContent, product) : null)       
        } else if (!data && homeContent){
            homeContent.innerHTML = `
                <h4>${err}</h4>
            `
        }
    }

    methods() {}
}