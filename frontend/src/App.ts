import Home from "./components/Home/Home";
import React from "./util/react";
import Header from "./components/Header/Header";
import Slider from "./components/Slider/Slider";
import "./public/css/App.css"
<<<<<<< HEAD
import { redux } from ".";
import check from "./util/check";
import Product from "./components/Product/Product";
=======
import Town from './components/Town';
import Location from "./components/Location";
import Chat from './components/Chat';
import ChatRoomItem from './components/ChatRoom/ChatRoomItem';
>>>>>>> b7a5c9684d1e1869b2690d9340bd2488ffc985bc

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
                    // new Chat(this.$outer);
                    new ChatRoomItem(this.$outer, {} as any);
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