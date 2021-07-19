import React from "../../../util/react"
import "./Uploader.css"
import { $ } from "../../../util/select"
import Upload from "../Upload/Upload"
import DummyUpload from "../DummyUpload/DummyUpload"
import { redux } from "../../../"

export default class Uploader extends React{

    constructor($target: HTMLElement) {
        super($target, 'Uploader')
        this.init()
    }

    css() {
        return `
            #Uploader-Inner {
                position: relative;
                width: 100%;

                display: flex;
                flex-wrap: wrap;

                justify-content: flex-start;
                align-items: center;
                padding: 10px;
            }
        `
    }

    render() {
        this.$outer.innerHTML = `
            <div id="Uploader-Inner" >
            </div>
        `
        const UploaderInner = $("#Uploader-Inner").getById()
        if (UploaderInner) {
            new Upload(UploaderInner)
            const dummyUpload = new DummyUpload(UploaderInner)
            redux.instance.setInstance('dummyUpload', dummyUpload)
        }
    }

    methods() {

    }
}

