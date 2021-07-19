import React from "../../../util/react"
import "./LikeButton.css"
import { $ } from "../../../util/select";
import { redux } from "../../../";
import getID from "../../../util/getID";
import { HeartSVG } from "../../../svgicon/Heart";

export default class LikeButton extends React{

    ID = getID()

    constructor($target: HTMLElement) {
        super($target, 'LikeButton')
        this.init()
    }

    css() {
        return `
            .LikeButton-Inner {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;    
            }
        `
    }
    render() {
        this.$outer.innerHTML = `
            <div id="LikeButton-Inner-${this.ID}" class="LikeButton-Inner" >
                ${HeartSVG}
            </div>`
    }
 
    methods() {
    }
}