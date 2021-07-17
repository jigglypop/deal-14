import React from "../../util/react"
import "../../public/css/Write.css"
import { RightArrow } from "../../svgicon/RightArrow"
import { $ } from "../../util/select"
import { CheckSVG } from "../../svgicon/Check"
import LineInput from "../../common/LineInput"
import { redux } from "../../index"
import FileUpload from "../../common/FileUpload"

export default class WriteContainer extends React{

    constructor($target: HTMLElement) {
        super($target, 'WriteContainer')
        this.init()
        this.methods()
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
            color: var(--dark);
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
            height: 100%;

            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }

        #Write-Under-Content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;       
        }`
    }

    render() {
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
                </div>
            </div>
        `
        const WriteUnderContent = $("#Write-Under-Content").getById()
        if (WriteUnderContent) {

            new FileUpload(WriteUnderContent)
            
            const setTitle = (e: string) => console.log(e)
            new LineInput(WriteUnderContent, setTitle, "글 제목")

            const setPrice = (e: string) => console.log(e)
            new LineInput(WriteUnderContent, setPrice, "가격(선택사항)")

            const setContent = (e: string) => console.log(e)
            new LineInput(WriteUnderContent, setContent, "게시글 내용을 작성해 주세요")
        }
    }

    methods() {
        $("#Write-Arrow").on('click', function() {
            $("#Write-Inner").css("transform", "translateX(400px)")
        })
    }
}