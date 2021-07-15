import Service from "./components/Service";
import Home from "./components/home";
import About from "./components/About";
import React from "./util/react";
import Header from "./components/Header";
import "./public/css/App.css"

export interface IServiceConstructor {
    $target: HTMLElement
}

class App extends React {
    
    styled = `
    `;

    constructor($target: HTMLElement) {
        super($target, 'App');
        window.addEventListener('hashchange', () => {
            this.render()
        });
        window.addEventListener('DOMContentLoaded', () => {
            this.render()
        });
        this.render()
    }

    render() {
        // 헤더
        const hash: string = location.hash.replace('#', '');
        if (this.$outer) {
            this.$outer.innerHTML = ""
            new Header(this.$outer)

            switch (hash) {
                case 'about':
                    new About(this.$outer)
                    break;
                case 'service':
                    new Service(this.$outer)
                    break;
                default:
                    new Home(this.$outer)
                    break;
            }
                      
        }
    }

}

export default App