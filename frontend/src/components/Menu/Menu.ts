import React from "../../util/react"
import "../../public/css/Menu.css"
import { $ } from "../../util/select";
import { redux } from "../../index";
import MenuContainer from "./MenuContainer";

export default class Menu extends React{

    constructor($target: HTMLElement) {
        super($target, 'Menu')
        this.init()
    }

    css() {
        return ``
    }
    render() {
        this.$outer.innerHTML = `
            <div id="Menu-Inner" >
            </div>`
        const MenuInner = $('#Menu-Inner').getById()
        if (MenuInner) {
            const Menucontainer = new MenuContainer(MenuInner)
            redux.instance.setInstance('menucontainer', Menucontainer)
        }
    }
 
    methods() {
    }
}