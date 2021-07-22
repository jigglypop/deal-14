import { LocationSVG } from "../../svgicon/location"
import React from "../../util/react"
import "./Header.css"
import { HamburgerSVG } from "../../svgicon/hamburger"
import { BoxSVG } from "../../svgicon/box"
import { $ } from "../../util/select"
import Avatar from "../../common/Avatar/Avatar"
import { UserTownTypes } from '../../types/userTown'
import { TownTypes } from '../../types/town'
import { redux } from '../..'
import { fetchMyTowns } from '../../requests/town'
import cache from '../../util/cache'
import { HomeSVG } from "../../svgicon/Home"
import { WriteSVG } from "../../svgicon/Write"

export default class Header extends React {

    state = {
        id: '',
        currentTown: null as (null | TownTypes),
        userTowns: [] as UserTownTypes[],
    }

    constructor($target: HTMLElement) {
        super($target, 'Header', 'nav')

        if (cache.get('token')) {
            fetchMyTowns()
                .then(data => {
                    const { userTowns } = data.data;
                    this.state.userTowns = userTowns;
                    redux.town.setCurrentTown({
                        id: userTowns[0].townId,
                        townName: userTowns[0].town.townName,
                    });

                    this.init();
                });
        }

        this.init();
    }

    css() {
        return `


        .header-link {
            display: flex;
            flex-direction: column;
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
            margin: 5px;
            align-items: center;
            color: white;
        }



        .header-title {
            font-size: 14px;
            font-weight: 800;
        }

        .header-title-content {
            font-size: 8px;
            font-weight: 800;
        }

        .username-text {
            color: white;
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


    componentWillMount() {
        if (redux.check.getCheckForm().id === '') return;

        const { userTowns } = this.state;

        const $townList = $('.header-town-list').get();

        $townList!.innerHTML = `${userTowns.map(userTown => `
            <li data-town-name="${userTown.town.townName}"  data-town-id="${userTown.townId}">${userTown.town.townName}</li>`
        ).join('')}
        <li data-go-setting="true">동네 설정하기</li>`
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Header-Inner" >
                <div class="header-link-left" >
                    <div class="header-link-item" id="category-button" >${BoxSVG}
                    </div>
                    <div class="header-link-item-small IPad" >
                        <h5 class="header-title" >10CM마켓</h5>
                        <h5 class="header-title-content" >세상 모든 물품이 다 있다</h5>
                    </div>
                </div>
                <div class="header-link" >
                    <div class="header-link-item" id="Menu-Slider-Button" >
                        ${LocationSVG} ${redux.town.getCurrentTown()?.townName ?? '설정 없음'}
                    </div>
                    <div class="header-town-slider disappear">
                        <ul class="header-town-list">
                        </ul>
                    </div>
                </div>
                <div class="header-link-right" >
                    <div class="header-link-item" id="auth-button" ></div>
                    <h5 class="username-text IPad" >${this.state.id}</h5>

                    <div class="header-link-item" id="menu-button" >${HamburgerSVG}</div>
                </div>
                <a href="/#" ><div id="Home-Button" >${HomeSVG}</div></a>
                ${this.state.id === '' ? '' : ` <div id="FaB-Button" >${WriteSVG}</div>`}
            </div>
        `

        this.componentWillMount();
    }

    methods() {
        const names = ['Menu', 'Auth', 'Category']

        names.forEach((name: string) => {
            $(`#${name.toLowerCase()}-button`).on('click', function () {
                $(`#${name}-Inner`).css('transform', "translateX(0)")
            })
        })

        $(`#FaB-Button`).on('click', function () {
            $(`#Write-Inner`).css('transform', "translateX(0)")
        })

        $('#Menu-Slider-Button').on('click', function () {
            $('.header-town-slider').get()?.classList.toggle('disappear');
        })

        $('#Menu-Slider-Bottom').on('click', function () {
            const MenuSlider = $('#Menu-Slider').getById()
            if (MenuSlider) {
                MenuSlider.classList.toggle("UpperHide")
            }

            $("#Town-Inner").css("transform", "translateX(0)")
        });

        $('.header-town-list').on('click', ((e: Event) => {
            const { townId, townName, goSetting } = (e.target as HTMLElement).dataset;

            if (goSetting) {
                location.href = '/#town';
                return;
            }

            if (!townId || !townName) return;

            redux.town.setCurrentTown({
                id: Number(townId),
                townName,
            });
        }).bind(this))

        const authbutton = $("#auth-button").getById()
        if (authbutton) {
            new Avatar(authbutton, redux.check.getCheckForm().profileImage, "40px", "40px", "2px_2px_20px_var(--text)")
        }
    }
}