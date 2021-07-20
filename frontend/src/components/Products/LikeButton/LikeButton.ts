import React from "../../../util/react"
import "./LikeButton.css"
import { $ } from "../../../util/select";
import { redux } from "../../../";
import getID from "../../../util/getID";
import { HeartSVG } from "../../../svgicon/Heart";
import { unlikeApi, likeApi } from "../../../requests/product";

export default class LikeButton extends React{

    ID = getID()
    productId: number

    constructor($target: HTMLElement, productId: number) {
        super($target, 'LikeButton')
        this.productId = productId
        this.init()
    }

    css() {
        return `
            .LikeButton-Inner {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                
                cursor: pointer;
            }
        `
    }
    render() {
        this.$outer.innerHTML = `
            <div id="LikeButton-Inner-${this.productId}" class="LikeButton-Inner" >
                ${HeartSVG}
            </div>`
    }

    getLikeApi(productId: number) {
        likeApi(productId)
            .then(data => {
                if (!data.hasOwnProperty("status")) {
                    const products = redux.instance.getInstance('products')
                    products.init()
                }
            })
    }

    getUnLikeApi(productId: number) {
        unlikeApi(productId)
            .then(data => {
                if (!data.hasOwnProperty("status")) {
                    const products = redux.instance.getInstance('products')
                    products.init()
                }
            })      
    }
 
    methods() {
        let that = this
        $(`#LikeButton-Inner-${this.productId}`).on('click', function () {
            const heart = $(`#LikeButton-Inner-${that.productId}`).getById()
            console.log(heart)
            if (heart) {
                const heartSVG = heart.querySelector(".like-heart")
                if (heartSVG) {
                    if (heartSVG.getAttribute('fill') === 'var(--deep-gray)') {
                        console.log("라이크")
                        that.getLikeApi(that.productId)
                    } else {
                        console.log("언라이크")
                        that.getUnLikeApi(that.productId)
                    }
                }
            }  
        })
    }
}