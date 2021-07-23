import React from "../../../util/react"
import "./Product.css"
import { $ } from "../../../util/select";
import ProductContainer from "../ProductContainer/ProductContainer";
import { redux } from "../../../";
import { productApi } from "../../../requests/product";
import { errorMsg } from "../../../util/errorMsg";
import { IProductResponse } from "../../../types/IProducResponse";

export default class Product extends React {

    productId = ""

    constructor($target: HTMLElement, productId: string) {
        super($target, 'Product')
        this.productId = productId
        this.init()
    }

    css() {
        return `        
        `
    }

    getProductApi() {
        productApi(this.productId)
            .then((data) => {
                if (data.hasOwnProperty('status')) {
                    this.setError(errorMsg(data))
                } else {
                    this.componentWillMount(data)
                }
            })
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Product-Inner" >
                
            </div>`
        this.getProductApi()

    }

    setError(err: string) {
        const ProductInner = $('#Product-Inner').get()
        if (ProductInner) {
            ProductInner.innerHTML = `
            <h4 id="product-error" >${err}</h4>
            `
        }


    }

    componentWillMount(data: IProductResponse) {
        const ProductInner = $('#Product-Inner').get()
        if (ProductInner) {
            const Productcontainer = new ProductContainer(ProductInner, data)
            redux.instance.setInstance('productcontainer', Productcontainer)
        }
    }

    methods() {
    }
}