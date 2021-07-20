import React from "../../../util/react"
import "./MyLike.css"
import { $ } from "../../../util/select"
import { errorMsg } from "../../../util/errorMsg"
import { IProductListResponse } from "../../../types/IProductListResponse"
import ProductsContainer from "../../Products/ProductsContainer/ProductsContainer"
import { likeproductListApi } from "../../../requests/product"
import { redux } from "../../.."

export default class MyLike extends React{

    constructor($target: HTMLElement) {
        super($target, 'MyLike')
        this.init()
    }

    css() {
        return `
        #MyLike-Page {
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
            <div id="MyLike-Page" >
            </div>`
        this.getMyList()
    }

    getMyList() {
        likeproductListApi()
            .then(data => {
                this.componentWillMount(data, '')
            }).catch(err => {
                this.componentWillMount(null, errorMsg(err))
            })
    }

    componentWillMount(data: IProductListResponse | null, err: string) {
        const MyProductPage = $("#MyLike-Page").getById()
        if (MyProductPage && data) {
            if (data) {
                new ProductsContainer(MyProductPage, data.data.products, redux.display.getWidthHeight().heightSS, true)
            } else {
                MyProductPage.innerHTML = `<h4>${err}</h4>`
            }
        } 
    }

    methods() {
    }
}