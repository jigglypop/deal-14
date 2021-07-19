import React from "../util/react"
import "../public/css/LineInput.css"
import getID from "../util/getID"
// import { ImageSVG } from "../svgicon/Image"
import { $ } from "../util/select"
import { UploadSVG } from "../svgicon/upload"
import { uploadApi } from "../requests/product"

export default class FileUpload extends React{

    text = ""
    ID = getID()
    labelText = ""
    method = (e: string) => { }
    
    state = {
        file: '',
        src: 'public/image/thumbnail.png'
    }

    constructor($target: HTMLElement) {
        super($target, 'FileUpload')
        this.init()
    }

    css() {
        return `
        .FileUploadWrapper {
            position: relative;
            margin: 10px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        .uploader {

        }

        .thumbnail {
            width: 90px;
            height: 90px;
        }

        .FileUpLoad {
            
            width: 100px;
            height: 100px;

            background: var(--gray);

            border: 1px_solid_var(--dark-gray);
            box-sizing: border-box;
            border-radius: 8px;

            display: flex;
            justify-content: center;
            align-items: center;
        }`
 
    }
    render() {
        this.$outer.innerHTML = `
            <div class="FileUploadWrapper" >
                <div class="uploader" >
                    ${this.state.file !== "" ? `<div id="upload" >${UploadSVG}</div>` : ""}
                    <span class="FileUpLoad" for="file-${this.ID}" id="label-${this.ID}" >
                        <img src="${this.state.src}" id="thumbnail-${this.ID}" class="thumbnail" />
                    </span>
                    <input type="file" name="upload" id="file-${this.ID}" style="display:none" >
                </div>
            </div>
        `
    }

    getUploadApi() {
        let form = {
            files: [
                this.state.file
            ]
        }
        uploadApi(form)
            .then(data => {
                console.log(data)
            })
    }
    methods() {
        let that = this
        $(`#label-${this.ID}`).on('click', function () {
            const input = $(`#file-${that.ID}`).getById()
            input?.click()
        })

        $(`#file-${this.ID}`).on('change', function (e: any) {
            const reader = new FileReader();
            const thumbnail : any = $(`#thumbnail-${that.ID}`).getById();

            reader.readAsDataURL(e.target.files[0])
            reader.onload = function(e: any) {

                if (thumbnail) {

                    that.setState({
                        src: e.target.result,
                        file: new Blob([JSON.stringify(e.target.result, null, 2)], {type : 'application/json'})
                    })
                }
             }
        })

        const upload = $("#upload").getById()
        if (upload) {
            $(upload).on('click', () => {
                this.getUploadApi()
            })
        }
    }
}