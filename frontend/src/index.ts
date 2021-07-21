import App from "./App"
import BackGround from "./components/BackGround/BackGround"
import ColorPicker from "./components/Phone/ColorPicker/ColorPicker"
import DarkPicker from "./components/Phone/DarkPicker/DarkPicker"
import DisplayPicker from "./components/Phone/DisplayPicker/DisplayPicker"
import Phone from "./components/Phone/Phone/Phone"
import "./public/css/Layout.css"
import { Redux } from "./redux"
import defaultDisplay from "./util/display"
import { setBefore } from "./util/setDisplay"

setBefore()
export const redux = Redux()
// 리덕스에 초기 디스플레이 설정
defaultDisplay()
const body = document.querySelector("body")
if (body) {
    new BackGround(body)
    new Phone(body)
    new ColorPicker(body)
    new DisplayPicker(body)
    new DarkPicker(body)
}

const root = document.getElementById("root")
if (root !== null) {
    new App(root)
}
