import getID from "../../util/getID"
import React from "../../util/react"
import { $ } from "../../util/select"
import "./LineInput.css"

export default class LineInput extends React {

    text = ""
    ID = getID()
    labelText = ""
    type = ""
    method = (e: string) => {}

    constructor($target: HTMLElement, method: (e: string) =>  void, labelText: string, type?: string) {
        super($target, 'LineInput')

        this.method = method
        this.labelText = labelText
        if (type) {
            this.type = type
        }
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div class="LineInput" id="LineInput-${this.ID}"  >
                <input id="${this.ID}" ${this.type === 'number' ? 'type="number"' : ""} >${this.text}</button>
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
                const LineInput = $(`#LineInput-${that.ID}`).getById()

                if (LineInput) {
                    if (target.value.length > 0) {
                        LineInput.classList.add("Hold")
                    } else {
                        LineInput.classList.remove("Hold")
                    }
                }
            })

        }
    }
}