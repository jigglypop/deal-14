import React from "../util/react"
import "../public/css/CategoryItem.css"

type IData = null | {
    name: string
    key: number
}

export default class CategoryItem extends React{

    data: IData = null

    constructor($target: HTMLElement, data: {
        name: string
        key: number
     }) {
        super($target, 'CategoryItem')
        this.data = data
        this.init()
        this.methods()
    }
    css() {
        return `
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
            margin-top: 6px;
            font-size: 11px;
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

        }`
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
            </div>`
    }
    methods() {

    }
    
}
