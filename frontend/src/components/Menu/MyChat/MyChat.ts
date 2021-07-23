import React from "../../../util/react"
import { $ } from '../../../util/select'
import ChatRoomList from '../../ChatRoom/ChatRoomList'
import "./MyChat.css"

export default class MyChat extends React {

    constructor($target: HTMLElement) {
        super($target, 'MyChat')
        this.init()
    }

    css() {
        return `
        #MyChat-Page {
            position: relative;
            
            width: 100%;
            height: 100%;
        }
        `
    }

    render() {
        this.$outer.innerHTML = `
            <div id="MyChat-Page" >
            </div>
        `

        const $myChatPage = $('#MyChat-Page').get();
        if ($myChatPage === null) return;

        new ChatRoomList($myChatPage);
    }

    methods() {

    }
}