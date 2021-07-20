import getID from "../../util/getID"
import React from "../../util/react"
import { $ } from "../../util/select"
import "./LineInput.css"

export default class LineInput extends React {

    text = ""
    ID = getID()
    labelText = ""
    type = ""
    defaultValue : any = null
    method = (e: string) => {}

    constructor($target: HTMLElement, method: (e: string) =>  void, labelText: string, type?: string, defaultValue?: string | number) {
        super($target, 'LineInput')

        this.method = method
        this.labelText = labelText
        if (type) {
            this.type = type
        }
        if (defaultValue) {
            this.defaultValue = defaultValue
        }
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <div class="LineInput" id="LineInput-${this.ID}"  >
                <input id="${this.ID}" ${this.type === 'number' ? 'type="number"' : ""} ${this.defaultValue !== null && this.defaultValue !== -1 ? `value="${this.defaultValue}"`:""} >${this.text}</button>
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
        const LineInput = $(`#LineInput-${that.ID}`).getById()
        if (input) {
            $(input).on('input', function (e: Event) {
                const target = e.target as HTMLButtonElement;
                that.method(target.value)

                if (LineInput) {
                    if (target.value.length > 0) {
                        LineInput.classList.add("Hold")
                    } else {
                        LineInput.classList.remove("Hold")
                    }
                }
            })
        }

        const defaultValue = this.defaultValue

        if (defaultValue && defaultValue !== -1 && LineInput) {
            LineInput.classList.add("Hold")
        } 
    }
}