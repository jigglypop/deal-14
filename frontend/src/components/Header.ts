import { LocationSVG } from "../svgicon/location"
import React from "../util/react"
import "../public/css/Header.css"
import { HamburgerSVG } from "../svgicon/hamburger"
import { BoxSVG } from "../svgicon/box"
import { AvatarSVG } from "../svgicon/Avatar"
// import Menu from "./Menu"
// import Category from "./Category"
// import Auth from "./Auth"
// import Write from "./Write"
import { $ } from "../util/select"
import { redux } from ".."

export default class Header extends React{

    state = {
        id: ''
    }


    constructor($target: HTMLElement) {
        super($target, 'Header', 'nav')
        this.init()
    }
    css() {
        return `
        #Header-Inner {
            position: sticky;
            display: flex;
            justify-content: space-between;
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
            
            width: 33%;
        }

        .header-link-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            
            width: 33%;
        }

        .header-link-right {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            width: 33%;
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
        }`
    }
    render() {
        this.$outer.innerHTML = `
            <div id="Header-Inner" >
                <div class="header-link-left" >
                    <div class="header-link-item" id="category-button" >${BoxSVG}</div>
                </div>
                <div class="header-link" >
                    <a href="#town" class="header-link-item" >${LocationSVG} 역삼동</a>
                </div>
                <div class="header-link-right" >
                    <div class="header-link-item" id="auth-button" >${AvatarSVG}</div>
                    <div class="header-link-item">
                        <h5 id="checkedId" >${this.state.id === '' ? '비로그인' : this.state.id }</h5>
                    </div>
                    <div class="header-link-item" id="menu-button" >${HamburgerSVG}</div>
                </div>
                <div id="FaB-Button" >
                    <h1>+</h1>
                </div>
            </div>
        `
        // console.log("슬라이더", this.$outer)
        // // 슬라이더들
        // new Menu(this.$outer)
        // // 카테고리
        // new Category(this.$outer)
        // // 회원가입/로그인
        // new Auth(this.$outer)
        // // 글쓰기
        // new Write(this.$outer)
        // const AuthInner = $("#Auth-Inner").get()
        // if (AuthInner) {
        //     $(AuthInner).css("transform", "translateX(400px)")
        // }
        // // $('#Auth-Inner').css("transform", "translateX(-400px)")


        // console.log(AuthInner)
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