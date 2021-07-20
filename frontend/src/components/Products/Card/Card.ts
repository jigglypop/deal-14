import React from "../../../util/react"
import "./Card.css"
import getTimes from "../../../util/getTimes"
import { $ } from "../../../util/select"
import getID from "../../../util/getID"
import { redux } from "../../../"
import LikeButton from "../LikeButton/LikeButton"
import UpdateDelete from "../UpdateDelete/UpdateDelete"
import { ChatSVG } from "../../../svgicon/Chat"

export default class Card extends React{

    item: any
    ID = getID()
    isMy = false

    constructor($target: HTMLElement, item: any, isMy: boolean) {
        super($target, 'Card')
        this.item = item
        this.isMy = isMy
        this.init()
    }

    css() {
        return `
        .Card-Inner {
            position: relative;
            border-bottom: 2px_solid_var(--dark-gray);
            margin: 10px;
            height: 100%;

            display: flex;
            flex-direction: row;
        }

        .Card-Img {
            width: 100px;
            height: 100px;
            padding: 5px;
            box-shadow: 2px_2px_20px_black;
            border-radius: 5px;

            background-color: var(--back);
        }

        .Card-Left {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;

            width: 40%;
            height: 100%;


        }

        .Card-Mid{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            text-align: flex-start;
            line-height: 50px;
            padding: 10px;

            width: 60%;
            height: 100%;

            .price-text {
                font-size: 12px;
            }
            .time-text {
                font-size: 14px;
                color: var(--slider-header);
            }
        }
        .Card-Content-Top {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;            
        }

        .Card-Content-Bottom {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;              
        }
        .Card-Chat-Button {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;               
        }

        .Card-Right {

        }`
    }

    render() {
        this.$outer.innerHTML = `
        <div class="Card-Inner" >
            <div class="Card-Left" >
                <img src="${this.item.productImages? this.item.productImages[0].filePath : 'public/image/main.png'}" class="product-images" />
            </div>
            <div class="Card-Mid" >
                <div id="Card-Content-Top-${this.ID}" class="Card-Content-Top" >
                    <a href="/#product/${this.item.id}">
                        <h4>${this.item.title}</h4>
                    </a>
                    <div id="Card-Login-Button" >
                    </div>
                </div>

                <h5 class="price-text" >${this.item.price ? this.item.price.toLocaleString('en-AU') + "원" : "비공개"}</h5>
                <div class="Card-Content-Bottom" >
                    <h5 class="time-text" >${getTimes().getTime(this.item.createdAt)}</h5>
                    <div id="Card-Chat-Button-${this.ID}" class="Card-Chat-Button" >
                        ${ChatSVG}
                    </div>
                </div>
            </div>
            <div class="Card-Right" >
            </div>
        </div>`
    }
    methods() {
        const CardContentTop = $(`#Card-Content-Top-${this.ID}`).getById()
        if (CardContentTop) {

            const checkedId = redux.check.getCheckForm().id
            const userId = this.item.userId
            if (checkedId && !this.isMy) {
                if (checkedId !== userId) {
                    new LikeButton(CardContentTop, this.item.id, this.item)
                } else {
                    new UpdateDelete(CardContentTop, this.item.id, this.item)
                }
            }
        }
    }
}