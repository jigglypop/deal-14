import React from "../../../util/react"
import "./CategoryContainer.css"
import { LeftArrow } from "../../../svgicon/LeftArrow"
import { $ } from "../../../util/select"
import Categories from "../../../constants/category.constants"
import CategoryItem from "../Categoryitem/Categoryitem"
import { redux } from "../../.."

export default class CategoryContainer extends React {

    Categories = Categories

    constructor($target: HTMLElement) {
        super($target, 'CategoryContainer')
        this.init()
        this.methods()
    }

    css() {
        return `


        .title {
            font-size: 18px;
            font-weight: 400;
        }
        
        #CategoryContainer-Arrow {
            cursor: pointer;
        }

        #CategoryContainer-Items-Outer {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

        }

       #CategoryContainer-Items {
            position: relative;
            
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            width: 300px;
            height: 500px;
        }`
    }

    render() {
        this.$outer.innerHTML = `
            <div id="CategoryContainer-Inner" >
                <div id="CategoryContainer-Content" >
                    <div id="CategoryContainer-Header">
                        <div id="CategoryContainer-Arrow" >
                            ${LeftArrow}
                        </div>
                        <div>
                            <h4 class="title" >카테고리 (${redux.town.getCurrentTown()?.townName ?? '설정 없음'})</h4>
                        </div>
                        <div></div>
                    </div>
                    <div id="CategoryContainer-Items-Outer" >
                        <div id="CategoryContainer-Items" >
                        </div>
                    </div>
                </div>
            </div>
        `

        const CategoryContainerItems = $("#CategoryContainer-Items").getById()

        if (this.Categories && CategoryContainerItems) {
            for (let category of this.Categories) {
                new CategoryItem(CategoryContainerItems, category)

            }
        }
    }



    methods() {
        $("#CategoryContainer-Arrow").on('click', function () {
            $("#Category-Inner").css("transform", `translateX(var(--base-X))`)
        })
    }

}
