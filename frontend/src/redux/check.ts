import { ICheckForm } from "../types/IAuthForm"

const Check = function() {
    let CheckForm : any = {
        id: '',
        mylike: [],
        mytown: [],
        townName: '',
        townId: 0,
    }
    return {
        // 체크폼 게터, 세터
        setCheckForm(key: keyof typeof CheckForm, value: any) {
            CheckForm[key] = value
            if (key === "mytown") {
                CheckForm.townName = value[0].town.townName
                CheckForm.townId = value[0].townId
            }
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