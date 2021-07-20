import React from "../../../util/react"
import "./CategoryItem.css"

type IData = null | {
    name: string
    keys: number
}

export default class CategoryItem extends React{

    data: IData = null

    constructor($target: HTMLElement, data: IData) {
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
            cursor: pointer;
        }
        .Category-Text {
            margin-top: 16px;
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
            box-shadow: 2px_2px_10px_var(--text)
        }

        .Category-Item-Inner {

        }`
    }
    render() {
        this.$outer.innerHTML = `
            <a href="/#category/${this.data?.keys}" >
                <div class="Category-Item" >
                    <div class="Category-Item-Inner" >
                        <div class="Category-Box" ></div>
                    </div>
                    <div class="Category-Item-Inner" >
                        <h5 class="Category-Text" >${this.data?.name}</h5>
                    </div>
                </div>
            </a>`
    }
    methods() {

    }
    
}
