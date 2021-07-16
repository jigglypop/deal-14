import React from "../util/react"
import "../public/css/Category.css"
import { LeftArrow } from "../svgicon/LeftArrow"
import { $ } from "../util/select"
import Categories from "../constants/category.constants"
import CategoryItem from "./Categoryitem"

export default class Category extends React{

    styled = `
        #Category-Inner {
            position: absolute;
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: center;

            top: 0;
            left: 0;
            width: var(--baseX);
            height: var(--baseY);
        }

        #Category-Header {
            position: sticky;
            display: flex;
            justify-content: space-around;
            align-items: center;

            top: 0;
            left: 0;
            width: 100%;
            height: 80px;
            background-color: var(--gray);
        }

        #Category-Content {
            position: relative;

            width: 95%;
            height: 95%;
            background-color: var(--app);
        }
        
        #Category-Arrow {
            cursor: pointer;
        }

        #Category-Items-Outer {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

        }

       #Category-Items {
            position: relative;
            
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            width: 300px;
            height: 500px;
        }
    `

    Categories = Categories

    constructor($target: HTMLElement) {
        super($target, 'Category')
        this.init()
        this.methods()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Category-Inner" >
                <div id="Category-Content" >
                    <div id="Category-Header">
                        <div id="Category-Arrow" >
                            ${LeftArrow}
                        </div>
                        <div>
                            <h4>카테고리</h4>
                        </div>
                        <div></div>
                    </div>
                    <div id="Category-Items-Outer" >
                        <div id="Category-Items" >
                        </div>
                    </div>
                </div>
            </div>
        `

        const CategoryItems = $("#Category-Items").getById()

        if (this.Categories && CategoryItems) {
            for (let category of this.Categories) {
                new CategoryItem(CategoryItems, category)
            }
        }
    }
    methods() {
        $("#Category-Arrow").on('click', function() {
            $("#Category-Inner").css("transform", "translateX(-400px)")
        })
    }
    
}
