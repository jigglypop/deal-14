import Home from "./components/home";
import React from "./util/react";
import Header from "./components/Header";
import Slider from "./components/Slider";
import "./public/css/App.css"
import Town from './components/Town';
import Location from "./components/Location";
import { redux } from ".";
import check from "./util/check";
import { $ } from "./util/select";

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
        const hash: string = location.hash.replace('#', '');

        if (this.$outer) {
            this.$outer.innerHTML = ""
            // 헤더 인스턴스 등록
            // 로그인 여부 체크
            const header = new Header(this.$outer)
            const slider = new Slider(this.$outer)

            redux.instance.setInstanceHeader(header)
            redux.instance.setInstanceSlider(slider)
            check()

            switch (hash) {
                case 'location':
                    new Location(this.$outer)
                    break;
                case 'town':
                    new Town(this.$outer)
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