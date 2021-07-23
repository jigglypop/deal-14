import React from "../../../util/react"
import "./Dummy.css"
import { $ } from "../../../util/select"
import { UploadObject } from "../../../redux/Upload"
import { redux } from "../../../index"

export default class Dummy extends React {

    dummy: UploadObject
    UUID: string

    constructor($target: HTMLElement, dummy: UploadObject, UUID: string) {
        super($target, 'Dummy')
        this.dummy = dummy

        this.UUID = UUID
        this.init()
    }

    css() {
        return `
        .DummyWrapper {
            position: relative;
            margin: 10px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        .thumbnail {
            width: 60px;
            height: 60px;
        }

        .Dummy {
            
            width: 65px;
            height: 65px;

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
            <div class="DummyWrapper" >
                <div class="uploader" >
                    <div class="upload" id="delete-${this.UUID}" >x</div>
                    <span class="Dummy" for="file-${this.UUID}" id="label-${this.UUID}" >
                        <img src="${this.dummy.src}" id="thumbnail-${this.UUID}" class="thumbnail" />
                    </span>
                    <input type="file" name="recfiles" id="recfiles" class="file-${this.UUID}" style="display: none" >
                </div>
            </div>`
    }


    methods() {
        let that = this
        $(`#delete-${this.UUID}`).on('click', function () {

            redux.upload.removeFileObject(that.UUID)

            const dummyUpload = redux.instance.getInstance('dummyUpload')
            dummyUpload.setState({
                flag: false
            })

            redux.write.checkVailidate()
        })

    }
}