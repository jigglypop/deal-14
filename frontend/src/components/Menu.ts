import React from "../util/react"
import "../public/css/Menu.css"
import { RightArrow } from "../svgicon/RightArrow"
import { $ } from "../util/select"

export default class Menu extends React{

    styled = `
        #Menu-Inner {
            position: absolute;
            z-index: 2;

            top: 0;
            left: 0;
            width: var(--baseX);
            height: var(--baseY);
            background-color: var(--app);
        }

        #Menu-Header {
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
        super($target, 'Menu')
        this.init()
        this.methods()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Menu-Inner" >
                <div id="Menu-Header">
                    <div></div>
                    <div>
                        <h4>메뉴</h4>
                    </div>
                    <div id="Menu-Arrow" >
                        ${RightArrow}
                    </div>
                </div>
            </div>
        `
    }
    methods() {
        $("#Menu-Arrow").on('click', function() {
            $("#Menu-Inner").css("transform", "translateX(400px)")
        })
    }
}