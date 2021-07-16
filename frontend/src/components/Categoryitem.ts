import React from "../util/react"
import "../public/css/CategoryItem.css"


export default class CategoryItem extends React{

    styled = `
        .Category-Item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            width: 80px;
            height: 80px;
            margin: 10px;
        }
        .Category-Text {
            font-size: 12px;
        }

        .Category-Box {
            position: relative;
            width: 40px;
            height: 40px;

            background: #F6F6F6;
            border: 1px solid #D7D7D7;
            box-sizing: border-box;
            border-radius: 6px;
        }

        .Category-Item-Inner {

        }
    `
    data: null | {
        name: string
        key: number
     } = null

    constructor($target: HTMLElement, data: {
        name: string
        key: number
     }) {
        super($target, 'CategoryItem')
        this.data = data
        this.init()
        this.methods()
    }

    render() {
        this.$outer.innerHTML = `
            <div class="Category-Item" >
                <div class="Category-Item-Inner" >
                    <div class="Category-Box" ></div>
                </div>
                <div class="Category-Item-Inner" >
                    <h5 class="Category-Text" >${this.data?.name}</h5>
                </div>
            </div>
        `
    }
    methods() {

    }
    
}
