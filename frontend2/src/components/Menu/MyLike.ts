import React from "../../util/react"
import "../../public/css/MyLike.css"
import { $ } from "../../util/select"

export default class MyLike extends React{

    constructor($target: HTMLElement) {
        super($target, 'MyLike')
        this.init()
        this.methods()
    }

    css() {
        return `
        #MyLike-Page {
            position: relative;
            
            display: flex;
            justify-content: center;
            align-items: center;
            
            width: 100%;
            height: 100%;
        }`
    }

    render() {
        this.$outer.innerHTML = `
            <div id="MyLike-Page" >
                <h4>관심목록</h4>
            </div>
        `
    }

    methods() {
    }
}