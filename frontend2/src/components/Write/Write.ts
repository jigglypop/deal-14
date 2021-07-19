import React from "../../util/react"
import "../../public/css/Write.css"
import { $ } from "../../util/select";
import { redux } from "../..";
import WriteContainer from "./WriteContainer";

export default class Write extends React{

    constructor($target: HTMLElement) {
        super($target, 'Write')
        this.init()
    }

    css() {
        return `        
        `
    }
    render() {
        this.$outer.innerHTML = `
            <div id="Write-Inner" >
            </div>`
        const WriteInner = $('#Write-Inner').get()
        if (WriteInner) {
            const Writecontainer = new WriteContainer(WriteInner)
            redux.instance.setInstance('writecontainer',Writecontainer)
        }
    }
 
    methods() {
    }
}