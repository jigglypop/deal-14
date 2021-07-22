import React from "../../util/react"
import "./GlassButton.css"
import { $ } from "../../util/select"
import getID from "../../util/getID"

export default class GlassButton extends React{

    private text = ""
    private ID = getID()
    protected method = () => {}

    constructor($target: HTMLElement, text: string, method: () =>  void) {
        super($target, 'GlassButton')
        this.text = text
        this.method = method
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <button class="glass-button" id="${this.ID}" >${this.text}</button>
        `
    }
    css() {
        return `
        .glass-button {
            text-decoration: none;
            width: var(--input-length);
            height: 40px;
            position: relative;
            overflow: hidden;
            font-size: 14px;
            font-weight: 800;

            background: var(--header);
            box-shadow: 1px_1px_10px_var(--back);
            border: none;

            border-radius: 5px;

            cursor: pointer;
            font-size: 14px;
            color: black;
            margin: 10px;
        }`
    }
    methods() {
        let that = this
        const button = $(`#${this.ID}`).getById()
        if (button) {
            $(button).on('click', function() {
                that.method()
            })     
        }

    }
}