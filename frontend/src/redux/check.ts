import { ICheckForm } from "../types/IAuthForm"
import { UserTownTypes } from '../types/userTown'

const Check = function () {
    let CheckForm: any = {
        id: '',
        mylike: [],
        profileImage: '',
    }
    return {
        // 체크폼 게터, 세터
        setCheckForm(key: keyof typeof CheckForm, value: any) {
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