import React from "../../../util/react"
import "./WriteContainer.css"
import { RightArrow } from "../../../svgicon/RightArrow"
import { $ } from "../../../util/select"
import { CheckSVG } from "../../../svgicon/Check"
import LineInput from "../../../common/LineInput/LineInput"
import { redux } from "../../../index"
import Uploader from "../Uploader/Uploader"
import Categories, { ICategory } from "../../../constants/category.constants"
import WriteCategory from "../WriteCategory/WriteCategory"
import { uploadApi, writeApi } from "../../../requests/product"
import { BLocationSVG, LocationSVG } from "../../../svgicon/location"
import { createToast } from "../../../util/createToast"

export default class WriteContainer extends React{

    constructor($target: HTMLElement) {
        super($target, 'WriteContainer')
        this.init()
    }

    css() {
        return `
        #Write-Page {
            position: relative;
            
            display: flex;
            justify-content: center;
            align-items: center;
            
            width: 100%;
            height: 100%;
        }
        #Write-Header {
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
            color: var(--text);
        }
        #Write-Content {
            position: relative;

            width: 95%;
            height: 95%;
            background-color: var(--app);
        }

        #Write-Arrow {
            cursor: pointer;
        }
         
        #Write-Under {
            position: relative;
            width: 100%;
            height: 505px;
            overflow: scroll;

            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }

        #Write-Under-Content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;       
        }
        
        #WriteCategory-Set {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            margin: 20px;        
        }
        
        #WriteCategory-Title {
            font-size: 14px;
        }
        #WriteCategoryWrapper {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;   
        }

        #Write-Success {
            cursor: pointer;
        }

        #location {
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--text);            
        }

        `
    }

    componentDidMount() {
        // 설정할 필요 없는 파라미터 추가
        const check = redux.check.getCheckForm()

        redux.write.setWriteForm('id', check.id)
    }

    render() {
        this.componentDidMount()
        this.$outer.innerHTML = `
            <div id="Write-Page" >
                <div id="Write-Content" >
                    <div id="Write-Header">
                        <div id="Write-Success" >
                            ${CheckSVG}
                        </div>
                        <div>
                            <h4 class="title" >글쓰기</h4>
                        </div>
                        <div id="Write-Arrow" >
                            ${RightArrow}
                        </div>
                    </div>
                    <div id="Write-Under" >
                        <div id="Write-Under-Content" >
                        </div>
                    </div>
                    <div id="location">
                        ${BLocationSVG}${redux.write.getWriteForm().townName}
                    </div>
                </div>
            </div>
        `
        const WriteUnderContent = $("#Write-Under-Content").getById()
        if (WriteUnderContent) {

            new Uploader(WriteUnderContent)

            const div = document.createElement('div')
            div.id = "WriteCategoryWrapper"
            div.innerHTML = `
                <h4 id="WriteCategory-Title" >카테고리 설정(필수)</h4>
                <div id="WriteCategory-Set" ></div>

            `
            WriteUnderContent.appendChild(div)
            
            const setTitle = (e: string) => {
                redux.write.setWriteForm('title', e)
                redux.write.checkVailidate()
            }
            new LineInput(WriteUnderContent, setTitle, "글 제목")

            const setPrice = (e: string) => {
                redux.write.setWriteForm('price', e)
                redux.write.checkVailidate()

            }
            new LineInput(WriteUnderContent, setPrice, "가격(선택사항)", "number")

            const setContent = (e: string) => {
                redux.write.setWriteForm('content', e)
                redux.write.checkVailidate()
            }
            new LineInput(WriteUnderContent, setContent, "게시글 내용을 작성해 주세요")
        }
        this.componentWillMount()
    }

    getUploadApi() {
        uploadApi()
            .then(data => {
                if (data.message === "파일 업로드 성공") {
                    redux.write.setWriteForm('images', data.data.files)
                }
            }).then(() => {
                this.getWriteApi()
            })
    }

    getWriteApi() {
        writeApi()
            .then(data => {
                location.href = `/#product/${data.data.product.id}`
            }).then(() => {
                createToast("글쓰기")                
            })
    }

    componentWillMount() {
        const WriteCategorySet = $("#WriteCategory-Set").getById()
        if (WriteCategorySet) {
            Categories.forEach((category: ICategory) => {
                new WriteCategory(WriteCategorySet, category)
            })
        }
    }

    methods() {
        let that = this
        $("#Write-Arrow").on('click', function() {
            $("#Write-Inner").css("transform", `translateX(${redux.display.getWidthHeight().width})`)
        })

        $("#Write-Success").on('click', function () {
            const isComplite = redux.write.getIsComplete()
            if (isComplite) {
                that.getUploadApi()
            }
        })
    }
}