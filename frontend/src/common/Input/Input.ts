import React from "../../util/react"
import "./Input.css"
import { $ } from "../../util/select"
import getID from "../../util/getID"

export default class Input extends React{

    text = ""
    ID = getID()
    method = (e: string) => {}

    constructor($target: HTMLElement, method: (e: string) =>  void) {
        super($target, 'Input')

        this.method = method
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <input class="Input" id="${this.ID}" >${this.text}</button>
        `
    }
    css() {
        return `
        .Input {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            padding: 10px;
            margin: 10px;

            position: absolute;
            width: 300px;
            height: 80px;
            left: 15px;
            top: 52px;

            background: transparent;

            box-sizing: border-box;
            border-radius: 8px;


            position: static;
            width: 250px;
            height: 40px;
            left: 16px;
            bottom: 8px;

            font-size: 16px;
            line-height: 22px;

            color: var(--deep-gray);
        }`
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