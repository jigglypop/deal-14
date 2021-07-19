import Home from "./components/Home/Home";
import React from "./util/react";
import Header from "./components/Header/Header";
import Slider from "./components/Slider/Slider";
import "./public/css/App.css"
import { redux } from ".";
import check from "./util/check";
import Product from "./components/Product/Product/Product";
import ChatRoomItem from "./components/ChatRoom/ChatRoomItem";
import Chat from "./components/Chat";
import Town from "./components/Town/Town";

export interface IServiceConstructor {
    $target: HTMLElement
}

class App extends React {

    constructor($target: HTMLElement) {
        super($target, 'App');
        window.addEventListener('hashchange', () => {
            this.render()
        });
        this.render()
    }

    css() {
        return ``
    }

    render() {
        // 헤더
        const hash: string[] = location.hash.replace('#', '').split("/");

        if (this.$outer) {
            this.$outer.innerHTML = ""
            // 헤더 인스턴스 등록
            // 로그인 여부 체크
            const header = new Header(this.$outer)
            const slider = new Slider(this.$outer)

            redux.instance.setInstance('header', header)
            redux.instance.setInstance('slider',slider)
            check()

            switch (hash[0]) {
                case 'product':
                    new Product(this.$outer, hash[1])
                    break;
                case 'chat':
                    new Chat(this.$outer);
                    break;
                case 'chatroom':
                    new ChatRoomItem(this.$outer, {} as any);
                    break;
                case 'town':
                    console.log("타운임")
                    new Town(this.$outer);
                    break;
                default:
                    new Home(this.$outer)
                    break;
            }

        }
    }

    methods() {}

}

export default App