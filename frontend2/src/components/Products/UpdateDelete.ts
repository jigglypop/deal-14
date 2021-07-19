import React from "../../util/react"
import "../../public/css/Card.css"
import { $ } from "../../util/select";
import { redux } from "../..";
import getID from "../../util/getID";
import { DotSVG } from "../../svgicon/Dot";

export default class UpdateDelete extends React{

    ID = getID()

    constructor($target: HTMLElement) {
        super($target, 'UpdateDelete')
        this.init()
    }

    css() {
        return `
            .UpdateDelete-Inner{
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
            <div id="UpdateDelete-Inner-${this.ID}" class="UpdateDelete-Inner" >
                ${DotSVG}
            </div>`
    }
 
    methods() {
    }
}