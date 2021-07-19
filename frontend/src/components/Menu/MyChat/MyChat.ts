import React from "../../../util/react"
import "./MyChat.css"

export default class MyChat extends React{

    constructor($target: HTMLElement) {
        super($target, 'MyChat')
        this.init()
        this.methods()
    }

    css() {
        return `
        #MyChat-Page {
            position: relative;
            
            display: flex;
            justify-content: center;
            align-items: center;
            
            width: 100%;
            height: 100%;
        }
        `
    }

    render() {
        this.$outer.innerHTML = `
            <div id="MyChat-Page" >
                <h4>채팅</h4>
            </div>
        `
    }

    methods() {

    }
}