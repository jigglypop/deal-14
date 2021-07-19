import React from "../../util/react"
import "../../public/css/Write.css"
import { RightArrow } from "../../svgicon/RightArrow"
import { $ } from "../../util/select"
import { CheckSVG } from "../../svgicon/Check"

export default class WriteContainer extends React{

    constructor($target: HTMLElement) {
        super($target, 'WriteContainer')
        this.init()
        this.methods()
    }

    css() {
        return `
        #Write-Page {
            position: relative;
            
            display: flex;
            justify-content: center;
            align-items: center;
            
            width: 100%;
            height: 100%;
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
            background-color: var(--white);
            border-bottom: 2px_solid_var(--deep-gray);
        }

        #Write-Content {
            position: relative;

            width: 95%;
            height: 95%;
            background-color: var(--app);
        }

        #Write-Arrow {
            cursor: pointer;
        }`
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Write-Page" >
                <div id="Write-Content" >
                    <div id="Write-Header">
                        <div id="Write-Success" >
                            ${CheckSVG}
                        </div>
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