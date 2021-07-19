import React from "../../util/react"
import "./Button.css"
import { $ } from "../../util/select"

export default class Button extends React{

    text = ""

    constructor($target: HTMLElement, text: string) {
        super($target, 'Button')
        this.text = text
        this.init()
    }

    render() {
        this.$outer.innerHTML = `
            <button class="buttonInner" >${this.text}</button>
        `
    }
    css() {
        return `
        .glass-button {
            text-decoration: none;
            width: 89%;
            height: 40px;
            font-size: 20px;
            font-weight: 800;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
            font-size: 14px;
            font-weight: 800;
            color: black;
            background-color: #12FFF7;
            box-shadow: 1px 1px 10px var(--baemin);
            padding: 0 20px;
            border: 2px solid var(--baemin);
            cursor: pointer;
            padding: 10px;
            font-family: "BMDOHYEON_ttf";
            font-size: 14px;
        }

        .glass-button:hover {
            box-shadow: 2px 2px 20px var(--baemin);
        }

        .glass-button:before {
            content: "";
            background-color: white;
            top: 0;
            left: 0;
            width: 200%;
            height: 30px;
            position: absolute;
            transform: translateX(-100%) rotate(45deg);
            transition: all 0.3s;
        }

        .glass-button:hover:before {
            transform: translateX(100%) rotate(45deg);
        }`
    }
    methods() {
        $("#Auth-Arrow").on('click', function() {
            
        })
    }
}