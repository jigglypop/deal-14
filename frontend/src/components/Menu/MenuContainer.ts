import React from "../../util/react"
import "../../public/css/MenuContainer.css"
import { RightArrow } from "../../svgicon/RightArrow"
import { $ } from "../../util/select"
import { redux } from "../../index"
import MyChat from "./MyChat"
import MyProduct from "./MyProduct"
import MyLike from "./MyLike"

export default class MenuContainer extends React{

    state = {
        checked: ''
    }

    constructor($target: HTMLElement) {
        super($target, 'MenuContainer')
        this.init()
    }

    css() {
        return `
        #Menu-Page {
            position: relative;
            
            display: flex;
            justify-content: center;
            align-items: center;
            
            width: 100%;
            height: 100%;
        }
        
        #Menu-Header {
            position: relative;
            display: flex;
            justify-content: space-around;
            align-items: center;

            top: 0;
            left: 0;
            width: 100%;
            height: 70px;
            background-color: var(--gray);
        }

        .Menu-Content {
            position: relative;
            flex-direction: column;

            width: 95%;
            height: 95%;
            background-color: var(--app);
        }

        .title {
            font-size: 18px;
            font-weight: 400;
        }


        #Menu-Arrow {
            cursor: pointer;
        }

        #Menu-My-Content {
            position: relative;
            display: flex;
            justify-content: center;

            width: 100%;
            height: 80%;
        }        
        `
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Menu-Page" >
                <div class="Menu-Content" >
                    <div id="Menu-Header">
                        <div></div>
                        <div>
                            <h4 class="title" >메뉴</h4>
                        </div>
                        <div id="Menu-Arrow" >
                            ${RightArrow}
                        </div>
                    </div>
                    <div id="Menu-Tab">
                        <h4 class="title-tab" id="tab-myproduct" >판매목록</h4>
                        <h4 class="title-tab" id="tab-mychat" >채팅</h4>
                        <h4 class="title-tab" id="tab-mylike" >관심목록</h4>
                    </div>
                    <div id="Menu-My-Content" >
                    </div>
                </div>
            </div>
        `
    }

    methods() {
        $("#Menu-Arrow").on('click', function() {
            $("#Menu-Inner").css("transform", "translateX(400px)")
        })

        const MenuMyContent = $("#Menu-My-Content").getById()
        if (MenuMyContent) {
            if (this.state.checked === "") {
                MenuMyContent.innerHTML = `
                <div class="need-login-text" >
                    <h4 >로그인이 필요한 서비스입니다.</h4>
                </div>
                `
            } else {
                MenuMyContent.innerHTML = ""
                new MyProduct(MenuMyContent)
                $("#tab-myproduct").on('click', function () {
                    MenuMyContent.innerHTML = ""
                    new MyProduct(MenuMyContent)
                })
                $("#tab-mychat").on('click', function() {
                    MenuMyContent.innerHTML = ""
                    new MyChat(MenuMyContent)
                })
                $("#tab-mylike").on('click', function() {
                    MenuMyContent.innerHTML = ""
                    new MyLike(MenuMyContent)
                })
            }
        }
    }
}