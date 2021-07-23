import React from "../../../util/react"
import "./Update.css"
import { $ } from "../../../util/select";
import { redux } from "../../..";
import UpdateContainer from "../UpdateContainer/UpdateContainer";

export default class Update extends React{

    productId: number

    constructor($target: HTMLElement, productId: number) {
        super($target, 'Update')
        this.productId = productId
        redux.update.setUpdateForm("productId", productId)
        this.init()
    }

    css() {
        return ``
    }
    render() {
        this.$outer.innerHTML = `
            <div id="Update-Inner" >
            </div>`
        const UpdateInner = $('#Update-Inner').get()
        if (UpdateInner) {
            const Updatecontainer = new UpdateContainer(UpdateInner, this.productId)
            redux.instance.setInstance('Updatecontainer',Updatecontainer)
        }
    }
 
    methods() {
    }
}