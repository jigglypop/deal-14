import React from "../../../util/react"
import "./ProductContainer.css"
import { IProductResponse } from "../../../types/IProducResponse"
import { ProductTypes } from "../../../types/product"
import getTimes from "../../../util/getTimes"
import { LeftArrow } from "../../../svgicon/LeftArrow"
import { $ } from "../../../util/select"
import { redux } from "../../.."
import { BLocationSVG } from "../../../svgicon/location"
import { joinChatRoom } from '../../../requests/chatRoom'

export default class ProductContainer extends React {

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

        #Product-Top {
            position: absolute;
            top: 5px;
            width: 100%;
            display: flex;
            flex-direction: space-between;
            align-items: flex-start;
            padding: 20px;
            z-index: 1;        
        }

        #Product-Top-Back {
            cursor: pointer;
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
            margin: 10px_0;
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

        #product-content-under {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;             
        }

        .product-price {
            color: var(--deep-gray);
        }

        .product-town {
            display: flex;
            justify-content: center;
            align-items: center;            
        }

        `
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Product-Page" >
                <div id="Product-Top" >
                    <div id="Product-Top-Back" >
                        ${LeftArrow}
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                </div>
                <img src="${this.product.productImages ? this.product.productImages[0].filePath : 'public/image/shoes.jpg'}" class="product-images" />
                <div id="product-content" >
                    <h3 class="product-title" >${this.product.title}</h3>
                    <h3 class="product-time" >기타 중고물품 - ${getTimes().getTime(this.product.createdAt)}</h3>    
                    <h3 class="product-content" >${this.product.content}</h3>
                    <div id="product-content-under" >
                        <h4 class="product-price">${this.product.price ? this.product.price.toLocaleString('en-AU') + "원" : "비공개"}</h4>
                        <h4 class="product-town">${BLocationSVG}${this.product.town.townName}</h4>
                    </div>

                </div>
                <div id="product-user" >
                    <div class="product-user-item" >
                        <h5>판매자 정보</h5>
                    </div>
                    <div class="product-user-item" >
                        <h5 class="product-user-name" >${this.product.userId}</h5>
                        <h5 class="product-user-town" >${this.product.town.townName}</h5>
                    </div>
                </div>

                <button id="chat-product-button">문의하기</button>
            </div>
        `
    }

    goBack() {
        redux.router.goRouter()
    }

    onChatProductButtonClicked = () => {
        joinChatRoom(this.product.id)
            .then(data => {
                const { chatRoom } = data.data;
                location.href = `/#chat/${chatRoom.id}`;
            })
            .catch(error => [
                // error handling
            ])
    }

    methods() {
        $("#Product-Top-Back").on("click", this.goBack)
        $('#chat-product-button').on('click', this.onChatProductButtonClicked);
    }
}