import React from "../../util/react"
import "../../public/css/Upload.css"
import { $ } from "../../util/select"
import FileUpload from "./FileUpload"
import { uploadApi } from "../../requests/product"

export default class Upload extends React{

    constructor($target: HTMLElement) {
        super($target, 'Upload')
        this.init()
    }

    css() {
        return `
            #Upload-Inner {
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

    getUploadApi() {
        uploadApi()
            .then(data => console.log(data))
    }
    render() {
        this.$outer.innerHTML = `
            <div id="Upload-Inner" >
            </div>
        `
        const UploadInner = $("#Upload-Inner").getById()
        if (UploadInner) {
            new FileUpload(UploadInner)
        }
    }

    methods() {

    }
}

