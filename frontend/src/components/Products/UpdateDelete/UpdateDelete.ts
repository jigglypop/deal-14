import React from "../../../util/react"
import "./UpdateDelete.css"
import getID from "../../../util/getID";
import { DotSVG } from "../../../svgicon/Dot";
import { $ } from "../../../util/select";
import { redux } from "../../..";

export default class UpdateDelete extends React {

    ID = getID()
    productId: number
    item: any

    constructor($target: HTMLElement, productId: number, item: any) {
        super($target, 'UpdateDelete')
        this.productId = productId
        this.item = item
        this.init()
    }



    render() {
        this.$outer.innerHTML = `
            <div id="UpdateDelete-Inner-${this.ID}" class="UpdateDelete-Inner" >
                <div id="UpdateDelete-Button-${this.ID}" class="UpdateDelete-Button" >${DotSVG}</div>
                <div id="UpdateDelete-Slider-${this.ID}" class="UpdateDelete-Slider" >
                    <div class="UpdateDelete-Slider-Item" id="Go-Update-${this.ID}">
                        <h6>수정하기</h6>
                    </div>
                    <div id="Go-Delete-${this.ID}" class="UpdateDelete-Slider-Item" >
                        <h6 class="delete-text" >삭제하기</h6>
                    </div>
                </div>
            </div>`
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
            .UpdateDelete-Button {
                cursor: pointer;
            }
        `
    }


    methods() {
        let that = this
        $(`#UpdateDelete-Button-${this.ID}`).on('click', function () {
            const Slider = $(`#UpdateDelete-Slider-${that.ID}`).getById()
            if (Slider) {
                Slider.classList.toggle("isSlid");
            }
        })

        $(`#Go-Update-${this.ID}`).on('click', function () {
            redux.update.setUpdateForm('category', that.item.category)
            redux.update.setUpdateForm("title", that.item.title)
            redux.update.setUpdateForm("price", that.item.price)
            redux.update.setUpdateForm("content", that.item.content)
            redux.update.setUpdateForm("isSoldOut", that.item.isSoldOut)
            if (location.hash.split("/")[0] === '#product') {
                location.href = `/#update/${location.hash.split("/")[1]}`
            } else {
                location.href = `/#update/${that.productId}`
            }
        })

        $(`#Go-Delete-${this.ID}`).on('click', function () {
            const RemoveModal = $('.RemoveModalOuter').get()
            if (RemoveModal) {
                RemoveModal.classList.add("isDisplay")
            }
            if (location.hash.split("/")[0] === '#product') {
                redux.remove.setRemove(Number(location.hash.split("/")[1]))
            } else {
                redux.remove.setRemove(that.productId)
            }
        })
    }
}