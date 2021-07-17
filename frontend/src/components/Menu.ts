import React from "../util/react"
import "../public/css/Menu.css"
import { RightArrow } from "../svgicon/RightArrow"
import { $ } from "../util/select"

export default class Menu extends React{


    constructor($target: HTMLElement) {
        super($target, 'Menu')
        this.init()
        this.methods()
    }
    css() {
        return `
        #Menu-Inner {
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

        #Menu-Header {
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

        #Menu-Content {
            position: relative;

            width: 95%;
            height: 95%;
            background-color: var(--app);
        }


        #Menu-Arrow {
            cursor: pointer;
        }`
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Menu-Inner" >
                <div id="Menu-Content" >
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
            </div>`
    }

    methods() {
        $("#Menu-Arrow").on('click', function () {
            $("#Menu-Inner").css("transform", "translateX(400px)")
        })
    }
}