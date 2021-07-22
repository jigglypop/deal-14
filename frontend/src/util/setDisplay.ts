import cache from "./cache"
import { $ } from "./select"

export const IPadAttr = {
    "--baseX": "1040px",
    "--base-X": "-1040px",
    "--baseY": "768px",
    "--base_sY": "658px",
    "--base_ssY": "608px",
    "--cardX": "470px",
    "--outerX": "1075px",
    "--outerY": "803px",
    "--halfX": "620px",
    "--halfY": "484px",
    "--IPad": "flex",
    "--Hheight": "65px",
}


export const SunAttr = {
    "--back": "#1d1d1d",
    "--text": "#1d1d1d",
    "--white-text": "white",
    "--app": "white",
}

export const MoonAttr = {
    "--back": "white",
    "--text": "#12fff7",
    "--white-text": "#12fff7",
    "--app": "#1d1d1d",
}


export const IPhoneAttr = {
    "--baseX": "400px",
    "--base-X": "-400px",
    "--baseY": "665px",
    "--base_sY": "555px",
    "--base_ssY": "505px",
    "--cardX": "360px",
    "--outerX": "435px",
    "--outerY": "700px",
    "--halfX": "300px",
    "--halfY": "450px",
    "--IPad": "none",
    "--Hheight": "50px",                
}



export const setVAll = (Attr: any) => {
    const body = document.querySelector("body")
    if (body) {
        for (let param of Object.keys(Attr)) {
            $(body).setV(param, Attr[param])
        }
    }
}

export const setBefore = () => {
    const attr = cache.get('attr')
    if (attr) {
        setVAll(attr)
    }
    const dark = cache.get('dark')
    if (dark) {
        setVAll(dark)
    }


}

export const setMode = () => {
    const mode = cache.get('mode')
    const darkSun = $('#dark-sun').getById()
    const darkMoon = $('#dark-moon').getById()
    if (darkSun && darkMoon) {
        if (mode) {
            if (mode === "sun") {
                darkSun.classList.add("isNotDisplay")
            } else {
                darkMoon.classList.add("isNotDisplay")
            }
        } else {
            darkSun.classList.add("isNotDisplay")
        }
    }
}