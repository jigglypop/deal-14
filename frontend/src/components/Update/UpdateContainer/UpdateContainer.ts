import React from "../../../util/react"
import "./UpdateContainer.css"
import { RightArrow } from "../../../svgicon/RightArrow"
import { $ } from "../../../util/select"
import LineInput from "../../../common/LineInput/LineInput"
import { redux } from "../../../index"
import { uploadApi, writeApi } from "../../../requests/product"
import { UCheckSVG } from "../../../svgicon/UCheck"

export default class UpdateContainer extends React{

    constructor($target: HTMLElement) {
        super($target, 'UpdateContainer')
        this.init()
    }

    css() {
        return `
        #Update-Page {
            position: relative;
            
            display: flex;
            justify-content: center;
            align-items: center;
            
            width: 100%;
            height: 100%;
        }
        #Update-Header {
            position: sticky;
            display: flex;
            justify-content: space-around;
            align-items: center;

            top: 0;
            left: 0;
            width: 100%;
            height: 80px;
            background-color: var(--white);
            border-bottom: 2px_solid_var(--deep-gray);
        }
        .title {
            font-size: 18px;
            color: var(--dark);
        }
        #Update-Content {
            position: relative;
            margin-top: 80px;

            width: 95%;
            height: 95%;
            background-color: var(--app);
        }

        #Update-Arrow {
            cursor: pointer;
        }
         
        #Update-Under {
            position: relative;
            width: 100%;
            height: 505px;
            overflow: scroll;

            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }

        #Update-Under-Content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;       
        }
        
        #UpdateCategory-Set {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            margin: 20px;        
        }
        
        #UpdateCategory-Title {
            font-size: 14px;
        }
        #UpdateCategoryWrapper {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;   
        }

        #Update-Success {
            cursor: pointer;
        }
        `
    }

    componentDidMount() {
        // 설정할 필요 없는 파라미터 추가
        const check = redux.check.getCheckForm()

        redux.update.setUpdateForm('id', check.id)
    }

    render() {
        this.componentDidMount()
        this.$outer.innerHTML = `
            <div id="Update-Page" >
                <div id="Update-Content" >
                    <div id="Update-Header">
                        <div id="Update-Success" >
                            ${UCheckSVG}
                        </div>
                        <div>
                            <h4 class="title" >업데이트</h4>
                        </div>
                        <div id="Update-Arrow" >
                            ${RightArrow}
                        </div>
                    </div>
                    <div id="Update-Under" >
                        <div id="Update-Under-Content" >
                        </div>
                    </div>
                </div>
            </div>
        `
        const UpdateUnderContent = $("#Update-Under-Content").getById()
        if (UpdateUnderContent) {

            
            const setTitle = (e: string) => {
                redux.update.setUpdateForm('title', e)
                redux.update.checkVailidate()
            }
            new LineInput(UpdateUnderContent, setTitle, "글 제목")

            const setPrice = (e: string) => {
                redux.update.setUpdateForm('price', e)
                redux.update.checkVailidate()

            }
            new LineInput(UpdateUnderContent, setPrice, "가격(선택사항)", "number")

            const setContent = (e: string) => {
                redux.update.setUpdateForm('content', e)
                redux.update.checkVailidate()
            }
            new LineInput(UpdateUnderContent, setContent, "게시글 내용을 작성해 주세요")
        }
    }

    // getUpdateApi() {
    //     writeApi()
    //         .then(data => {
    //             location.href = `/#product/${data.data.product.id}`
    //         })
    // }


    goBack() {
        redux.router.goRouter()
    }

    methods() {
        let that = this
        $("#Update-Arrow").on('click', this.goBack)

        $("#Update-Success").on('click', function () {
            const isComplite = redux.update.getIsComplete()
            if (isComplite) {
                // that.getUploadApi()
            }
        })
    }
}