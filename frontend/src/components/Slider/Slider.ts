import React from "../../util/react"
import "./Slider.css"
import Menu from "../Menu/Menu/Menu"
import Category from "../Category/Category/Category"
import Auth from "../Auth/Auth/Auth"
import Write from "../Write/Write/Write"
import { $ } from "../../util/select"
// import Town from "../Town/Town"

export default class Slider extends React{

    state = {
        id: ''
    }
    constructor($target: HTMLElement) {
        super($target, 'Slider', 'aside')

        this.init()
    }
    css() {
        return `
        a:link {
            color: var(--text);
            text-decoration: none;
        }

        a:visited {
            color: var(--text);
            text-decoration: none;
        }

        a:hover {
            color: var(--text);
            text-decoration: none;
        }

        a:active {
            color: var(--text);
            text-decoration: none;
        }`
    }
    render() {
        // 슬라이더들
        this.$outer.innerHTML = `
            <div id="Slider-Inner"></div>
        `
        const SliderInner = $("#Slider-Inner").get()
        if (SliderInner) {
            new Menu(SliderInner)
            // 카테고리
            new Category(SliderInner)
            // 회원가입/로그인
            new Auth(SliderInner)
            // 글쓰기
            new Write(SliderInner)
            // // 타운
            // new Town(SliderInner)
        }
    }

    methods() {
    }
}