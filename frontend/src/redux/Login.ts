export interface ILoginResponse {
    isError: boolean
    data: object | string
}

const Login = function() {
    let result : ILoginResponse = {
        isError: false,
        data: {}
    }
    let loginForm = {
        id: ''
    }
    return {
        // 로그인 후 promise 가로채기
        setLogin(_result: ILoginResponse) {
            result.isError = _result.isError
            result.data = _result.data
            return result
        },
        getLogin() {
            return result
        },
        // 로그인폼 게터, 세터
        setLoginForm(value: string) {
            loginForm.id = value
            return loginForm
        },
        getLoginForm() {
            return loginForm
        }
    }
}
export default Login