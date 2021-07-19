import React from "../../util/react"
import "../../public/css/Town.css"
import { $ } from "../../util/select";
import { redux } from "../../index";
import TownContainer from "./TownContainer";

export default class Town extends React{

    constructor($target: HTMLElement) {
        super($target, 'Town')
        this.init()
    }

    css() {
        return ``
    }
    render() {
        this.$outer.innerHTML = `
            <div id="Town-Inner" >
            </div>`
        const TownInner = $('#Town-Inner').getById()
        if (TownInner) {
            const Towncontainer = new TownContainer(TownInner)
            redux.instance.setInstance('towncontainer', Towncontainer)
        }
    }
 
    methods() {
    }
}