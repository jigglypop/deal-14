import { IRegisterForm } from "../types/IAuthForm"

const Register = function() {
    let registerForm : IRegisterForm = {
        id: '',
        town: ''
    }
    return {
        // 레지스터 폼 게터, 세터
        setRegisterForm(key: keyof typeof registerForm, value: string) {
            registerForm[key] = value
            return registerForm
        },
        getRegisterForm() {
            return registerForm
        }
    }
}
export default Register