import React from "../../../util/react"
import "./FileUpLoad.css"
import getID from "../../../util/getID"
import { $ } from "../../../util/select"
import { redux } from "../../../"

export default class FileUpload extends React {

    text = ""
    ID = getID()
    labelText = ""
    method = (e: string) => { }

    state = {
        src: 'public/image/thumbnail.png',
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

        .thumbnail {
            width: 90px;
            height: 90px;
        }

        .FileUpLoad {
            
            width: 100px;
            height: 100px;

            background: var(--gray);

            border: 1px_solid_var(--dark-gray);
            box-shadow: 2px_2px_10px_var(--dark-gray);

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
                    <span class="FileUpLoad" for="file-${this.ID}" id="label-${this.ID}" >
                        <img src="${this.state.src}" id="thumbnail-${this.ID}" class="thumbnail" />
                    </span>
                    <input type="file" name="recfiles" id="recfiles" class="file-${this.ID}" style="display: none" >
                </div>
            </div>`
    }


    methods() {
        let that = this
        $(`#label-${this.ID}`).on('click', function () {
            const input = $(`.file-${that.ID}`).get()
            input?.click()
        })

        $(`.file-${this.ID}`).on('change', function (e: any) {
            redux.write.checkVailidate()
            let temp = {
                file: "",
                src: ""
            }
            const onLoadFunc = () => {
                return new Promise(function (resolve, reject) {
                    const fileObject = Object.keys(redux.upload.getFileObject())
                    let length = fileObject.length
                    const files: any = $(`.file-${that.ID}`).get()
                    if (files) {
                        for (let file of files.files) {
                            temp.file = file
                        }
                    }
                    const reader = new FileReader();
                    const thumbnail = $(`#thumbnail-${that.ID}`).getById();
                    reader.readAsDataURL(e.target.files[0])
                    reader.onload = function (e: any) {
                        if (thumbnail && length < 10) {
                            resolve(e.target.result)
                        } else {
                            reject()
                        }
                    }
                })
            }

            onLoadFunc()
                .then((result: any) => {
                    temp.src = result
                }).then(() => {
                    const ID = getID()
                    redux.upload.setFileObject(ID, temp)
                    redux.write.checkVailidate()
                }).then(() => {
                    const dummyUpload = redux.instance.getInstance("dummyUpload")
                    dummyUpload.setState({
                        flag: true
                    })
                })
        })
    }
}