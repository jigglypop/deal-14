import React from "../../../util/react"
import "./UpdateDelete.css"
// import { $ } from "../../../util/select";
// import { redux } from "../../../";
import getID from "../../../util/getID";
import { DotSVG } from "../../../svgicon/Dot";
import { $ } from "../../../util/select";
import { redux } from "../../..";

export default class UpdateDelete extends React{

    ID = getID()
    productId: number

    constructor($target: HTMLElement, productId: number) {
        super($target, 'UpdateDelete')
        this.productId = productId
        this.init()
    }



    render() {
        this.$outer.innerHTML = `
            <div id="UpdateDelete-Inner-${this.ID}" class="UpdateDelete-Inner" >
                <div id="UpdateDelete-Button-${this.ID}" class="UpdateDelete-Button" >${DotSVG}</div>
                <div id="UpdateDelete-Slider-${this.ID}" class="UpdateDelete-Slider" >
                    <a href="/#update/${this.productId}">
                        <div id="Go-Update-${this.ID}" class="UpdateDelete-Slider-Item" >
                            <h6>수정하기</h6>
                        </div>
                    </a>
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

        $(`#Go-Delete-${this.ID}`).on('click', function () {
            const RemoveModal = $('.RemoveModalOuter').get()
            if (RemoveModal) {
                RemoveModal.classList.add("isDisplay")
            }
            redux.remove.setRemove(that.productId)
        })
    }
}