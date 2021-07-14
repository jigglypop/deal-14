import Service from "./components/Service";
import Home from "./components/home";
import About from "./components/About";
import React from "./util/react";

export interface IServiceConstructor {
    $target: HTMLElement
}

class App extends React {
    
    $target: HTMLElement | null
    styled = `
    `;

    constructor() {
        super();
        this.$target = document.querySelector("#root");
        window.addEventListener('hashchange', () => {
            this.render()
        });
        window.addEventListener('DOMContentLoaded', () => {
            this.render()
        });
        this.render()
    }

    render() {
        // // 헤더
        const hash: string = location.hash.replace('#', '');
        if (this.$target) {
            this.$target.innerHTML = ""
            switch (hash) {
                case 'about':
                    new About({ $target: this.$target })
                    break;
                case 'service':
                    new Service({ $target: this.$target })
                    break;
                default:
                    new Home({ $target: this.$target })
                    break;
            }
                      
        }
    }
}

export default new App()