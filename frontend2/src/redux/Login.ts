import { ILoginForm } from "../types/IAuthForm"

const Login = function() {
    let loginForm : ILoginForm = {
        id: ''
    }
    return {
        // 로그인폼 게터, 세터
        setLoginForm(key: keyof typeof loginForm, value: string) {
            loginForm[key] = value
            return loginForm
        },
        getLoginForm() {
            return loginForm
        }
    }
}
export default Login