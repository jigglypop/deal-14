import React from "../../../util/react"
import "./AuthContainer.css"
import { RightArrow } from "../../../svgicon/RightArrow"
import { $ } from "../../../util/select"
import { redux } from "../../../index";
import LineInput from "../../../common/LineInput/LineInput";
import GlassButton from "../../../common/GlassButton/GlassButton";
import { loginApi, registerApi } from "../../../requests/auth";
import { ILoginForm, IRegisterForm } from "../../../types/IAuthForm";
import { errorMsg } from "../../../util/errorMsg";
import check from "../../../util/check";
import cache from "../../../util/cache";
import Avatar from "../../../common/Avatar/Avatar";
import { createToast } from "../../../util/createToast";

export default class AuthContainer extends React {

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
                        <h4 class="title" >${this.state.checked === '' ? (this.state.isLogin ? "로그인" : "회원가입") : '내 계정'}</h4>
                        <div id="Auth-Arrow" >
                            ${RightArrow}
                        </div>
                    </div>
                    <div id="Auth-Under" >
                        <div id="Auth-Under-Content" >
                        </div>
                        <h5 id="isLogin" >${this.state.checked === '' ? (this.state.isLogin ? "회원가입" : "로그인") : ''}</h5>
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
                if (!data.hasOwnProperty('status')) {
                    createToast("로그인")
                    redux.instance.getInstance('header').refreshTowns();
                }
            })
    }

    getRegisterApi(form: IRegisterForm) {
        registerApi(form)
            .then(data => {
                this.rerender(data)
                if (!data.hasOwnProperty('status')) {
                    createToast("회원가입")
                    redux.instance.getInstance('header').refreshTowns();
                }
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

        redux.router.moveRouter("#")
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
        redux.town.clear();
        check()
        const display = redux.display.getWidthHeight()
        $("#Auth-Inner").css("transform", `translateX(${display.width})`)

        redux.router.moveRouter("#")
        createToast("로그아웃")
    }


    renderChecked(content: HTMLElement) {
        new Avatar(content, redux.check.getCheckForm().profileImage, "150px", "150px")
        const h3 = document.createElement("h3")
        h3.id = "myid"
        h3.innerText = redux.check.getCheckForm().id
        content.appendChild(h3)
        new GlassButton(content, '로그아웃', this.logout)
    }

    renderLogin(content: HTMLElement) {

        const setId = (e: string) => redux.login.setLoginForm('id', e)
        new LineInput(content, setId, "로그인 아이디")

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
        new LineInput(content, setId, "회원가입 아이디 영문 + 숫자 조합")

        const setImage = (e: string) => redux.register.setRegisterForm('profileImage', e)
        new LineInput(content, setImage, "프로필 이미지(선택사항)")

        const setTown = (e: string) => redux.register.setRegisterForm('town', e)
        new LineInput(content, setTown, "동네 이름 입력")

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
        $("#Auth-Arrow").on('click', function () {
            $("#Auth-Inner").css("transform", `translateX(var(--baseX))`)
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