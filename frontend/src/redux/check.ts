import { ICheckForm } from "../types/IAuthForm"

const Check = function() {
    let CheckForm : ICheckForm = {
        id: ''
    }
    return {
        // 체크폼 게터, 세터
        setCheckForm(key: keyof typeof CheckForm, value: string) {
            CheckForm[key] = value
            return CheckForm
        },
        getCheckForm() {
            return CheckForm
        },
        resetCheckForm() {
            CheckForm.id = ''
        }
    }
}
export default Check