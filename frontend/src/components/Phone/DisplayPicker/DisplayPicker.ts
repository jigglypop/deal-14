import { redux } from "../../.."
import cache from "../../../util/cache"
import React from "../../../util/react"
import { $ } from "../../../util/select"
import { IPadAttr, IPhoneAttr, setVAll } from "../../../util/setDisplay"
import "./DisplayPicker.css"

export default class DisplayPicker extends React{

    constructor($target: HTMLElement) {
        super($target, 'DisplayPicker')
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="DisplayPicker">
                <div class="display-item" id="display-small" >
                    <h5>IPhone</h5>
                </div>
                <div class="display-item" id="display-large" >
                    <h5>IPad</h5>
                </div>
            </div>
        `
    }
    css() {
        return `

        `
    }

    methods() {
        $('#display-small').on('click', function () {
            setVAll(IPhoneAttr)
            const data = {
                width: "400px",
                _width: "-400px",
                height: "665px",
                heightS: "555px",
                heightSS: "505px"
            }
            cache.set("attr", IPhoneAttr)
            redux.display.setWidthHeight(data)
        })
        $('#display-large').on('click', function () {
            setVAll(IPadAttr)
            const data = {
                width: "1040px",
                _width: "-1040px",
                height: "768px",
                heightS: "658px",
                heightSS: "608px"
            }
            cache.set("attr", IPadAttr)
            redux.display.setWidthHeight(data)
        })
    }
}