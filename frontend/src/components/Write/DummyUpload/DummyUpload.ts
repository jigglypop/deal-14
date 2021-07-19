import React from "../../../util/react"
import "./DummyUpload.css"
import { $ } from "../../../util/select"
import Dummy from "../Dummy/Dummy"
import { redux } from "../../.."

export default class DummyUpload extends React{

    state = {
        flag: false
    }
    length = 0

    constructor($target: HTMLElement) {
        super($target, 'DummyUpload')
        this.init()
    }

    css() {
        return `
            #DummyUpload-Inner {
                position: relative;
                width: 100%;

                display: flex;
                flex-wrap: wrap;

                justify-content: center;
                align-items: center;
                padding: 10px;
            }
        `
    }


    render() {
        const Length = Object.keys(redux.upload.getFileObject())

        this.$outer.innerHTML = `
            <h6 id="dummy-length" >0/10(사진은 10개까지 설정 가능합니다) 1개 필수</h6>
            <div id="DummyUpload-Inner" >
            </div>
        `
        const DummyUploadInner = $("#DummyUpload-Inner").getById()
        const dummyLength  = $('#dummy-length').getById()
        if (dummyLength && Length) {
            dummyLength.innerText = `${Length.length}/10(사진은 10개까지 설정 가능합니다) 1개 필수`
        }

        const dummys = redux.upload.getFileObject()

        if (DummyUploadInner) {
            for (let key of Object.keys(dummys)) {
                new Dummy(DummyUploadInner, dummys[key], key)
            }
        }
    }

    methods() {

    }
}

