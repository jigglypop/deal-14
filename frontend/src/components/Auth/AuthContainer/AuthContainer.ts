import React from "../../../util/react"
import "./AuthContainer.css"
import { RightArrow } from "../../../svgicon/RightArrow"
import { $ } from "../../../util/select"
import { redux } from "../../../index";
import Input from "../../../common/Input/Input";
import GlassButton from "../../../common/GlassButton/GlassButton";
import { loginApi, registerApi } from "../../../requests/auth";
import { ILoginForm, IRegisterForm } from "../../../types/IAuthForm";
import { errorMsg } from "../../../util/errorMsg";
import check from "../../../util/check";
import cache from "../../../util/cache";

export default class AuthContainer extends React{

    state = {
        isLogin: true,
        checked: redux.check.getCheckForm().id
    }

    isLogin = redux.flag.getFlagById('isLogin');
    checked = redux.check.getCheckForm().id

    constructor($target: HTMLElement) {
        super($target, 'AuthContainer')
        this.state.isLogin = redux.flag.getFlagById('isLogin')

        this.init()
    }

    css() {
        return `


        .title {
            font-size: 18px;
            font-weight: 400;
        }`
    }
    render() {
        this.$outer.innerHTML = `
            <div id="Auth-Page" >
                <div id="Auth-Content" >
                    <div id="Auth-Header">
                        <h4 class="title" >${this.state.checked === '' ? (this.state.isLogin ? "로그인" : "회원가입" ) : '내 계정' }</h4>
                        <div id="Auth-Arrow" >
                            ${RightArrow}
                        </div>
                    </div>
                    <div id="Auth-Under" >
                        <div id="Auth-Under-Content" >
                        </div>
                        <h5 id="isLogin" >${this.state.checked === '' ? (this.state.isLogin ? "회원가입" : "로그인" ) : '' }</h5>
                    </div>
                </div>
            </div>`
        const AuthUnderContent = $("#Auth-Under-Content").getById()
        if (AuthUnderContent) {

            if (this.state.checked !== '') {
                this.renderChecked(AuthUnderContent)   
            } else {
                if (this.state.isLogin) {
                    this.renderLogin(AuthUnderContent)
                } else {
                    this.renderRegister(AuthUnderContent)
                }
            }
        }
    }


 
    getLoginApi(form: ILoginForm) {
        loginApi(form)
            .then(data => {
                this.rerender(data)
            })
    }

    getRegisterApi(form: IRegisterForm) {
        registerApi(form)
            .then(data => {
                this.rerender(data)
            })
    }

    rerender(data: any) {
        if (data.hasOwnProperty('status')) {
            this.setError(errorMsg(data))
        } else {
            this.componentWillMount()
        }
    }

    componentWillMount() {
        check()

        const display = redux.display.getWidthHeight()
        $("#Auth-Inner").css("transform", `translateX(${display.width})`)

        const products = redux.instance.getInstance("products")
        products.init()
        
    }

    setError(err: any) {
        const error = $("#error").getById()
        if (error) {
            error.innerText = err
        }
    }

    logout() {
        cache.remove('token')
        redux.check.resetCheckForm()
        check()
        const display = redux.display.getWidthHeight()
        $("#Auth-Inner").css("transform", `translateX(${display.width})`)

        const products = redux.instance.getInstance("products")
        products.init()
    }
    

    renderChecked(content: HTMLElement) {
        const h3 = document.createElement("h3")
        h3.id = "myid"
        h3.innerText = redux.check.getCheckForm().id
        content.appendChild(h3)
        new GlassButton(content, '로그아웃', this.logout)
    }

    renderLogin(content: HTMLElement) {

        const setId = (e: string) => redux.login.setLoginForm('id', e)
        new Input(content, setId)

        const submitLogin = () => {
            const loginForm = redux.login.getLoginForm()
            this.getLoginApi(loginForm)
        }

        new GlassButton(content, '로그인', submitLogin)
        const h5 = document.createElement("h5")
        h5.id = "error"
        content.appendChild(h5)
    }


    renderRegister(content: HTMLElement) {

        const setId = (e: string) => redux.register.setRegisterForm('id', e)
        new Input(content, setId)

        const setTown = (e: string) => redux.register.setRegisterForm('town', e)
        new Input(content, setTown)

        const submitRegister = () => {
            const registerForm = redux.register.getRegisterForm()
            this.getRegisterApi(registerForm)
        }

        new GlassButton(content, '회원가입', submitRegister)
        const h5 = document.createElement("h5")
        h5.id = "error"
        content.appendChild(h5)

    }

    methods() {
        let that = this
        const display = redux.display.getWidthHeight()
        $("#Auth-Arrow").on('click', function() {
            $("#Auth-Inner").css("transform", `translateX(${display.width})`)
            redux.slidertoggle.setSliderToggle('auth')
        })

        $("#isLogin").on('click', function () {
            that.setState({
                isLogin: !that.state.isLogin
            })
            $("#Auth-Inner").css("transform", "translateX(0)")
        })
    }
}