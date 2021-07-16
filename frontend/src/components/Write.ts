import React from "../util/react"
import "../public/css/Write.css"
import { RightArrow } from "../svgicon/RightArrow"
import { $ } from "../util/select"

export default class Write extends React{

    styled = `
        #Write-Inner {
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

        #Write-Header {
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

        #Write-Content {
            position: relative;

            width: 95%;
            height: 95%;
            background-color: var(--app);
        }

        #Write-Arrow {
            cursor: pointer;
        }
    `

    constructor($target: HTMLElement) {
        super($target, 'Write')
        this.init()
        this.methods()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Write-Inner" >
                <div id="Write-Content" >
                    <div id="Write-Header">
                        <div></div>
                        <div>
                            <h4>글쓰기</h4>
                        </div>
                        <div id="Write-Arrow" >
                            ${RightArrow}
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    methods() {
        $("#Write-Arrow").on('click', function() {
            $("#Write-Inner").css("transform", "translateX(400px)")
        })
    }
}