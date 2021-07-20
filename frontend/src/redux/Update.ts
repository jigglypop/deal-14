import { redux } from ".."
import { $ } from "../util/select"

const Update = function() {
    let updateForm : any = {
        id: '',
        price: -1,
        category: -1,
        title: '',
        content: '',
    }
    let isComplite = false
    return {
        // 글쓰기폼 게터, 세터
        setUpdateForm(key: keyof typeof updateForm, value: string | number) {
            updateForm[key] = value
            return updateForm
        },
        getUpdateForm() {
            return updateForm
        },
        checkVailidate() {

            if (updateForm.title !== "" && updateForm.content !== "" && updateForm.category !== -1) {
                $(".UCheckSVGPath").css("stroke", "var(--baemin)")
                isComplite = true
                return true
            } else {
                $(".UCheckSVGPath").css("stroke", "#888888")
                isComplite = false
                return false
            }
        },
        getIsComplete() {
            return isComplite
        }
    }
}
export default Update