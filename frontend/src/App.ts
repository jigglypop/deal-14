import Home from "./components/Home/Home";
import React from "./util/react";
import Header from "./components/Header/Header";
import Slider from "./components/Slider/Slider";
import RemoveModal from "./common/RemoveModal";

import "./public/css/App.css"
import { redux } from ".";
import check from "./util/check";
import Product from "./components/Product/Product/Product";
import ChatRoomItem from "./components/ChatRoom/ChatRoomItem";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import Chat from "./components/Chat";
<<<<<<< HEAD
import Town from "./components/Town/Town";
import ChatRoomList from './components/ChatRoom/ChatRoomList';
=======
import Town from "./components/Town/Town/Town";
import Update from "./components/Update/Update/Update";
>>>>>>> dev

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
            const removeModal = new RemoveModal(this.$outer)

            redux.instance.setInstance('header', header)
            redux.instance.setInstance('slider', slider)
            redux.instance.setInstance('removeModal', removeModal)

            check()

            switch (hash[0]) {
                case 'product':
                    redux.router.pushRouter(location.hash)
                    new Product(this.$outer, hash[1])
                    break;
                case 'category':
                    redux.router.pushRouter(location.hash)
                    new CategoryPage(this.$outer, Number(hash[1]))
                    break;
                case 'chat':
                    redux.router.pushRouter(location.hash)
                    new Chat(this.$outer);
                    break;
                case 'chatroom':
<<<<<<< HEAD
                    new ChatRoomList(this.$outer);
=======
                    redux.router.pushRouter(location.hash)
                    new ChatRoomItem(this.$outer, {} as any);
>>>>>>> dev
                    break;
                case 'town':
                    redux.router.pushRouter(location.hash)
                    new Town(this.$outer);
                    break;
                case 'update':
                    redux.router.pushRouter(location.hash)
                    new Update(this.$outer, Number(hash[1]));
                    break;
                default:
                    redux.router.pushRouter(location.hash)
                    new Home(this.$outer)
                    break;
            }

        }
    }

    methods() { }

}

export default App