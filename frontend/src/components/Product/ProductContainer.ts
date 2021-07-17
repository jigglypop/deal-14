import React from "../../util/react"
import "../../public/css/ProductContainer.css"
import { IProductResponse } from "../../types/IProducResponse"
import { ProductTypes } from "../../types/product"
import getTimes from "../../util/getTimes"

export default class ProductContainer extends React{

    productId = ""
    product: ProductTypes

    constructor($target: HTMLElement, data: IProductResponse) {
        super($target, 'ProductContainer')

        this.product = data.data.product
        this.init()
    }

    css() {
        return `
        #Product-Page {
            position: relative;
            
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            
            width: 100%;
            height: 600px;
            overflow: scroll;
        }
        
        .product-images {
            position: relative;
            width: 100%;
            height: 320px;
            object-fit: cover;
        }

        #product-content {
            position: relative;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 20px;
        }

        .product-title {
            font-size: 18px;
            margin: 20px_0_0_0;
            font-weight: 400;
        }

        .product-time {
            font-size: 12px;
            margin: 5px_0;
            color: var(--deep-gray);
        }

        .product-content {
            font-size: 16px;
            margin: 24px_0;
            
            height: 100px;
        }

        #product-user {
            position: relative;
            width: 100%;
            height: 50px;
            background-color: var(--gray);

            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 10px;
        }

        .product-user-item {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .product-user-name {
            font-size: 14px;
            margin: 5px;
        }

        .product-user-town {
            font-size: 12px;
            color: var(--deep-gray);
        }

        `
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Product-Page" >
                <img src="public/image/shoes.jpg" class="product-images" />
                <div id="product-content" >
                    <h3 class="product-title" >${this.product.title}</h3>
                    <h3 class="product-time" >기타 중고물품 - ${getTimes().getTime(this.product.createdAt)}</h3>    
                    <h3 class="product-content" >${this.product.content}</h3>
                </div>
                <div id="product-user" >
                    <div class="product-user-item" >
                        <h5>판매자 정보</h5>
                    </div>
                    <div class="product-user-item" >
                        <h5 class="product-user-name" >${this.product.userId}</h5>
                        <h5 class="product-user-town" >역삼동</h5>
                    </div>
                </div>
            </div>
        `
    }

    methods() {}
}