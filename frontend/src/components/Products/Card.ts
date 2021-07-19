import React from "../../util/react"
import "../../public/css/Card.css"
import getTimes from "../../util/getTimes"

export default class Card extends React{

    item: any

    constructor($target: HTMLElement, item: any) {
        super($target, 'Card')
        this.item = item
        this.init()
    }

    css() {
        return `
        .Card-Inner {
            position: relative;
            border: 2px_solid_black;
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
            line-height: 30px;
            padding: 10px;

            width: 40%;
            height: 100%;

            .price-text {
                font-size: 12px;
            }
            .time-text {
                font-size: 14px;
                color: var(--slider-header);
            }
        }

        .Card-Right {

        }`
    }

    render() {
        this.$outer.innerHTML = `
        <div class="Card-Inner" >
            <div class="Card-Left" >
                <img src="public/image/main.png" class="Card-Img" />
            </div>
            <div class="Card-Mid" >
                <a href="/#product/${this.item.id}">
                    <h4>${this.item.title}</h4>
                </a>
                <h5 class="price-text" >${this.item.price}원</h5>
                <h5 class="time-text" >${getTimes().getTime(this.item.createdAt)}</h5>
            </div>
            <div class="Card-Right" >
            </div>
        </div>`
    }
    methods(){}
}