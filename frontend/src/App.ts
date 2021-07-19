import Home from "./components/home";
import About from "./components/About";
import React from "./util/react";
import Header from "./components/Header";
import "./public/css/App.css"
import Town from './components/Town';
import Location from "./components/Location";
import Chat from './components/Chat';
import ChatRoomItem from './components/ChatRoom/ChatRoomItem';

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
                case 'location':
                    new Location(this.$outer)
                    break;
                case 'town':
                    new Town(this.$outer)
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

}

export default App