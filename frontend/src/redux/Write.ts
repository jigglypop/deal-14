import { redux } from ".."
import { $ } from "../util/select"

const Write = function() {
    let writeForm : any = {
        id: '',
        townId: -1,
        price: 0,
        category: -1,
        title: '',
        content: '',
        images: [''],
        townName: ''
    }
    let isComplite = false
    return {
        // 글쓰기폼 게터, 세터
        setWriteForm(key: keyof typeof writeForm, value: string | number) {
            writeForm[key] = value
            return writeForm
        },
        getWriteForm() {
            return writeForm
        },
        checkVailidate() {
            const upload = Object.keys(redux.upload.getFileObject())
            const upload_length = upload.length

            if (writeForm.title !== "" && writeForm.content !== "" && writeForm.category !== -1 && upload_length >= 0) {
                $(".CheckSVGPath").css("stroke", "var(--baemin)")
                isComplite = true
                return true
            } else {
                $(".CheckSVGPath").css("stroke", "#888888")
                isComplite = false
                return false
            }
        },
        getIsComplete() {
            return isComplite
        }
    }
}
export default Write