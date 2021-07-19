import { LocationSVG } from "../../svgicon/location"
import React from "../../util/react"
import "./Header.css"
import { HamburgerSVG } from "../../svgicon/hamburger"
import { BoxSVG } from "../../svgicon/box"
import { AvatarSVG } from "../../svgicon/Avatar"
import { $ } from "../../util/select"

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
            z-index: 2;

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
            padding-left: 10px;
            
            width: 33%;
        }

        .header-link-right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-right: 10px;

            width: 33%;
        }

        .header-link-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        a:link {
            color: var(--text);
            text-decoration: none;
        }

        #checkedId {
            font-size: 8px;
            margin: 5px;
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
                    <div class="header-link-item" id="Menu-Slider-Button" >${LocationSVG} 역삼동</div>
                    <div class="Menu-Slider UpperHide" id="Menu-Slider" >
                        <div id="Menu-Slider-Top" >
                            <h4 class="Menu-Slider-Text" >역삼동</h4>
                        </div>
                        <div id="Menu-Slider-Bottom" >
                            <h4 class="Menu-Slider-Text" >내 동네 설정하기</h4>
                        </div>
                    </div>
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

        $('#Menu-Slider-Button').on('click', function () {
            const MenuSlider = $('#Menu-Slider').getById()
            if (MenuSlider) {
                MenuSlider.classList.toggle("UpperHide")
            }
        })

        $('#Menu-Slider-Bottom').on('click', function () {
            const MenuSlider = $('#Menu-Slider').getById()
            if (MenuSlider) {
                MenuSlider.classList.toggle("UpperHide")
            }
            
            $("#Town-Inner").css("transform", "translateX(0)")
        })
    }
}