import React from "../util/react"
import "../public/css/Auth.css"
import { RightArrow } from "../svgicon/RightArrow"

export default class Auth extends React{

    styled = `
        #Auth-Inner {
           position: absolute;
            z-index: 2;

            top: 0;
            left: 0;
            width: var(--baseX);
            height: var(--baseY);
            background-color: var(--app);
        }

        #Auth-Header {
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
        super($target, 'Auth')
        this.init()
        this.methods()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Auth-Inner" >
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
        `
    }

    methods() {
        const AutoArrow = document.getElementById("Auth-Arrow")
        const AuthInner = document.getElementById("Auth-Inner")

        AutoArrow?.addEventListener('click', () => {
            if (AuthInner) {
                AuthInner.style.transform = "translateX(400px)"
            }
        })
    }
}