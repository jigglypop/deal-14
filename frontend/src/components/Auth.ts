import React from "../util/react"
import "../public/css/Auth.css"
import { RightArrow } from "../svgicon/RightArrow"
import { $ } from "../util/select"

export default class Auth extends React{

    styled = `
        #Auth-Inner {
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

        #Auth-Header {
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

        #Auth-Content {
            position: relative;

            width: 95%;
            height: 95%;
            background-color: var(--app);
        }

        #Auth-Arrow {
            cursor: pointer;
        }
    `

    constructor($target: HTMLElement) {
        super($target, 'Auth')
        this.init()
        this.methods()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Auth-Inner" >
                <div id="Auth-Content" >
                    <div id="Auth-Header">
                        <div></div>
                        <div>
                            <h4>로그인</h4>
                        </div>
                        <div id="Auth-Arrow" >
                            ${RightArrow}
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    methods() {
        $("#Auth-Arrow").on('click', function() {
            $("#Auth-Inner").css("transform", "translateX(400px)")
        })
    }
}