import Home from "./components/Home/Home";
import React from "./util/react";
import Header from "./components/Header/Header";
import Slider from "./components/Slider/Slider";
import RemoveModal from "./components/Products/RemoveModal";

import "./public/css/App.css"
import { redux } from ".";
import check from "./util/check";
import Product from "./components/Product/Product/Product";
// import ChatRoomItem from "./components/ChatRoom/ChatRoomItem";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import Chat from "./components/Chat";
import Town from "./components/Town/Town/Town";
import Update from "./components/Update/Update/Update";
import ChatRoom from './components/ChatRoom';
import Toast from "./common/Toast/Toast";
import Footer from "./components/Footer/Footer";

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

            const header = new Header(this.$outer)
            const footer = new Footer(this.$outer)
            const slider = new Slider(this.$outer)
            const removeModal = new RemoveModal(this.$outer)
            const toasts = new Toast(this.$outer)

            redux.instance.setInstance('header', header)
            redux.instance.setInstance('footer', footer)
            redux.instance.setInstance('slider', slider)
            redux.instance.setInstance('removeModal', removeModal)
            redux.instance.setInstance('toasts', toasts)


            switch (hash[0]) {
                case 'product':
                    redux.router.pushRouter(location.hash)
                    const product = new Product(this.$outer, hash[1])
                    redux.instance.setInstance('product', product)
                    break;
                case 'category':
                    redux.router.pushRouter(location.hash)
                    const categorypage = new CategoryPage(this.$outer, Number(hash[1]))
                    redux.instance.setInstance('categorypage', categorypage)
                    break;
                case 'chat':
                    redux.router.pushRouter(location.hash)
                    new Chat(this.$outer);
                    break;
                case 'chatroom':
                    redux.router.pushRouter(location.hash)
                    new ChatRoom(this.$outer);
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
                    const home = new Home(this.$outer)
                    redux.instance.setInstance('home', home)
                    break;
            }
            // 로그인 여부 체크
            check()
        }
    }

    methods() { }

}

export default App