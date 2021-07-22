import React from "../../util/react"
import "./Footer.css"
export default class Footer extends React{


    constructor($target: HTMLElement) {
        super($target, 'Footer', 'footer')
        this.init()
    }
    css() {
        return `
        .footer-link-left {
            display: flex;
            justify-content: center;
            align-items: center;
            
            width: 100%;
        }
        .footer-title {
            font-size: 10px;
            color: white;
            font-weight: 800;
        }
        `
    }
    render() {
        this.$outer.innerHTML = `
            <div id="Footer-Inner" class="IPad">
                <div class="footer-link-left" >
                    <h5 class="footer-title" >© 2021 10CM MARKET | MADE BY 염동환 / 최진우 | WITH 우아한 테크 캠프</h5>
                </div>
            </div>
        `
    }

    methods() {
    }
}