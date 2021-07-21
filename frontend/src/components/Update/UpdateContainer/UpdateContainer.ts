import React from "../../../util/react"
import "./UpdateContainer.css"
import { RightArrow } from "../../../svgicon/RightArrow"
import { $ } from "../../../util/select"
import LineInput from "../../../common/LineInput/LineInput"
import { redux } from "../../../index"
import { updateApi, uploadApi, writeApi } from "../../../requests/product"
import { UCheckSVG } from "../../../svgicon/UCheck"

export default class UpdateContainer extends React{

    item: any
    productId: number

    constructor($target: HTMLElement, productId: number) {
        super($target, 'UpdateContainer')
        this.item = redux.update.getUpdateForm()
        this.productId = productId
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
            margin-top: 20px;
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

        #soldout-setting {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        #update-soldout {
            border: 2px_solid_var(--text);
            padding: 5px_15px;
            margin: 5px;
            border-radius: 10px;
            cursor: pointer;
        }
        `
    }


    render() {
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
                        <div id="soldout-setting" >
                            <h5>판매완료 여부 : </h5>
                            <h5 id="update-soldout" >판매중</h5>
                        </div>
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
            new LineInput(UpdateUnderContent, setTitle, "글 제목", "", this.item.title)

            const setPrice = (e: string) => {
                redux.update.setUpdateForm('price', e)
                redux.update.checkVailidate()

            }
            new LineInput(UpdateUnderContent, setPrice, "가격(선택사항)", "number", this.item.price)

            const setContent = (e: string) => {
                redux.update.setUpdateForm('content', e)
                redux.update.checkVailidate()
            }
            new LineInput(UpdateUnderContent, setContent, "게시글 내용을 작성해 주세요", "", this.item.content)
        }
        this.componentWillMount()
    }

    componentWillMount() {
        const updateSoldout = $('#update-soldout').getById()
        const isSoldOut = redux.update.getUpdateForm().isSoldOut

        if (updateSoldout) {
            if (!isSoldOut) {
                updateSoldout.innerText = "판매중"   
            }else {
                updateSoldout.innerText = "판매완료"
            }
        }
    }

    UpdateApi() {
        updateApi()
            .then(data => {
                location.href = `/#product/${this.productId}`
            })
    }


    goBack() {
        redux.router.goRouter()
    }

    methods() {
        let that = this
        $("#Update-Arrow").on('click', this.goBack)

        $("#Update-Success").on('click', function () {
            const isComplite = redux.update.getIsComplete()
            if (isComplite) {
                that.UpdateApi()
            }
        })

        $('#update-soldout').on('click', function () {
            const updateSoldout = $('#update-soldout').getById()
            
            if (updateSoldout) {
                if (updateSoldout.innerText === "판매중") {
                    updateSoldout.innerText = "판매완료"
                    redux.update.setUpdateForm('isSoldOut', 1)
                } else {
                    updateSoldout.innerText = "판매중"
                    redux.update.setUpdateForm('isSoldOut', 0)
                }
            }
        })
    }
}