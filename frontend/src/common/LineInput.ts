import React from "../util/react"
import "../public/css/LineInput.css"
import { $ } from "../util/select"
import getID from "../util/getID"

export default class LineInput extends React{

    text = ""
    ID = getID()
    labelText = ""
    method = (e: string) => {}

    constructor($target: HTMLElement, method: (e: string) =>  void, labelText: string) {
        super($target, 'LineInput')

        this.method = method
        this.labelText = labelText
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div class="LineInput" >
                <input id="${this.ID}" >${this.text}</button>
                <label>${this.labelText}</label>
            </div>
        `
    }
    css() {
        return ``
    }
    methods() {
        let that = this
        const input = $(`#${this.ID}`).getById()
        if (input) {
            $(input).on('input', function (e: Event) {
                const target = e.target as HTMLButtonElement;
                that.method(target.value)
            })
        }
    }
}