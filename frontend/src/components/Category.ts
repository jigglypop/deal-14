import React from "../util/react"
import "../public/css/Category.css"
import { LeftArrow } from "../svgicon/LeftArrow"

export default class Category extends React{

    styled = `
        #Category-Inner {
           position: absolute;
            z-index: 2;

            top: 0;
            left: 0;
            width: var(--baseX);
            height: var(--baseY);
            background-color: var(--app);
        }

        #Category-Header {
            position: sticky;
            display: flex;
            justify-content: space-around;
            align-items: center;

            top: 0;
            left: 0;
            width: 100%;
            height: 50px;
            background-color: var(--slider-header);
        }
    `

    constructor($target: HTMLElement) {
        super($target, 'Category')
        this.init()
        this.methods()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Category-Inner" >
                <div id="Category-Header">
                    <div id="Category-Arrow" >
                        ${LeftArrow}
                    </div>
                    <div>
                        <h4>카테고리</h4>
                    </div>
                    <div></div>
                </div>
            </div>
        `
    }
    methods() {
        const CategoryArrow = document.getElementById("Category-Arrow")
        const CategoryInner = document.getElementById("Category-Inner")

        CategoryArrow?.addEventListener('click', () => {
            if (CategoryInner) {
                CategoryInner.style.transform = "translateX(-400px)"
            }
        })
    }
}