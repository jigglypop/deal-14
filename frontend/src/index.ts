import App from "./App"
import "./public/css/Layout.css"
import { Redux } from "./redux"
import defaultDisplay from "./util/display"

export const redux = Redux()
// 리덕스에 초기 디스플레이 설정
defaultDisplay()
const root = document.getElementById("root")
if (root !== null) {
    new App(root)
}
