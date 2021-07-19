import React from "../../../util/react"
import "./Auth.css"
import { redux } from "../../../";
import { $ } from "../../../util/select";
import AuthContainer from "../AuthContainer/AuthContainer";

export default class Auth extends React{

    constructor($target: HTMLElement) {
        super($target, 'Auth')
        this.init()
    }

    css() {
        return ``
    }
    render() {
        this.$outer.innerHTML = `
            <div id="Auth-Inner" >
            </div>`
        const AuthInner = $('#Auth-Inner').get()
        if (AuthInner) {
            const authcontainer = new AuthContainer(AuthInner)
            redux.instance.setInstance('authcontainer',authcontainer)
        }
    }
 
    methods() {
    }
}