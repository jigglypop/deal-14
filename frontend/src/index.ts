import App from "./App"
import "./public/css/Layout.css"
import { Redux } from "./redux"

export const redux = Redux()

const root = document.getElementById("root")
if (root !== null) {
    new App(root)
}
