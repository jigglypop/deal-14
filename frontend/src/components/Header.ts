import { LocationSVG } from "../svgicon/location"
import React from "../util/react"
import "../public/css/Header.css"
import { HamburgerSVG } from "../svgicon/hamburger"
import { BoxSVG } from "../svgicon/box"
import { AvatarSVG } from "../svgicon/Avatar"
import Menu from "./Menu"
import Category from "./Category"
import Auth from "./Auth"
import Write from "./Write"
import { $ } from "../util/select"

export default class Header extends React{

    styled = `
        #Header-Inner {
            position: sticky;
            display: flex;
            justify-content: space-around;
            align-items: center;
            z-index: 1;

            top: 0;
            left: 0;
            width: 100%;
            height: 50px;
            background-image: var(--header);
        }

        .header-link {
            display: flex;
            justify-content: center;
            align-items: center;           
        }

        .header-link-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;           
        }

        .header-link-right {
            display: flex;
            justify-content: flex-end;
            align-items: center;           
        }

        .header-link-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            
            margin: 3px;
        }

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
        }


    `

    constructor($target: HTMLElement) {
        super($target, 'Header', 'nav')

        this.init()
        this.methods()
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Header-Inner" >
                <div class="header-link-left" >
                    <div class="header-link-item" id="category-button" >${BoxSVG}</div>
                </div>
                <div class="header-link" >
                    <a href="#service" class="header-link-item" >${LocationSVG} 역삼동</a>
                </div>
                <div class="header-link-right" >
                    <div class="header-link-item" id="auth-button" >${AvatarSVG}</div>
                    <div class="header-link-item" id="menu-button" >${HamburgerSVG}</div>
                </div>
                <div id="FaB-Button" >
                    <h1>+</h1>
                </div>
            </div>
        `
        // 슬라이더들
        new Menu(this.$outer)
        // 카테고리
        new Category(this.$outer)
        // 회원가입/로그인
        new Auth(this.$outer)
        // 회원가입/로그인
        new Write(this.$outer)
    }

    methods() {
        const names = ['Menu', 'Auth', 'Category']
        names.forEach((name: string) => {
            $(`#${name.toLowerCase()}-button`).on('click', function(){
                $(`#${name}-Inner`).css('transform', "translateX(0)")
            })
        })

        $(`#FaB-Button`).on('click', function () {
            $(`#Write-Inner`).css('transform', "translateX(0)")
        })
    }
}