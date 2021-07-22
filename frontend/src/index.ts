import App from "./App"
import BackGround from "./components/BackGround/BackGround"
import ColorPicker from "./components/Phone/ColorPicker/ColorPicker"
import DarkPicker from "./components/Phone/DarkPicker/DarkPicker"
import DisplayPicker from "./components/Phone/DisplayPicker/DisplayPicker"
import Name from "./components/Phone/Name/Name"
import Phone from "./components/Phone/Phone/Phone"
import StarA from "./components/Phone/Star/StarA"
import StarB from "./components/Phone/StarB/StarB"
import StarD from "./components/Phone/StarD/StarD"
import StarE from "./components/Phone/StarE/StarE"
import "./public/css/Layout.css"
import { Redux } from "./redux"
import defaultDisplay from "./util/display"
import rotate3D from "./util/rotate3D"
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
    new Name(body)

    // 스타
    new StarA(body)
    new StarB(body)
    new StarD(body)
    new StarE(body)
}

const root = document.getElementById("root")
if (root !== null) {
    new App(root)
}
rotate3D()
