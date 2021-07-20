import React from "../../../util/react"
import "./Card.css"
import getTimes from "../../../util/getTimes"
import { $ } from "../../../util/select"
import getID from "../../../util/getID"
import { redux } from "../../../"
// import LikeButton from "../LikeButton/LikeButton"
import UpdateDelete from "../UpdateDelete/UpdateDelete"
import { ChatSVG } from "../../../svgicon/Chat"
import { ProductTypes } from "../../../types/product"
import { HeartSVG, SHeartSVG } from "../../../svgicon/Heart"
import { likeApi, unlikeApi } from "../../../requests/product"

export default class Card extends React{

    public state = {
        isUserLiked: false,
        likeCount: 0,
    }
    protected item: ProductTypes
    protected isMy = false
    private ID = ""

    constructor($target: HTMLElement, item: ProductTypes, isMy: boolean, ID: string) {
        super($target, 'Card')
        this.item = item
        this.isMy = isMy
        this.ID = ID
        this.state.isUserLiked = this.item.isUserLiked
        this.state.likeCount = this.item.likeCount
        this.init()
    }

    css() {
        return `
        .Card-Inner {
            position: relative;
            border-bottom: 2px_solid_var(--dark-gray);
            margin: 10px;
            height: 100%;

            display: flex;
            flex-direction: row;
        }

        .Card-Img {
            width: 100px;
            height: 100px;
            padding: 5px;
            box-shadow: 2px_2px_20px_black;
            border-radius: 5px;

            background-color: var(--back);
        }

        .Card-Left {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;

            width: 40%;
            height: 100%;


        }

        .Card-Mid{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            text-align: flex-start;
            line-height: 50px;
            padding: 10px;

            width: 60%;
            height: 100%;

            .price-text {
                font-size: 12px;
            }
            .time-text {
                font-size: 14px;
                color: var(--slider-header);
            }
        }
        .Card-Content-Top {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;            
        }

        .Card-Content-Bottom {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;              
        }
        .Card-Chat-Button {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;               
        }
        .card-item {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin: 3px;
            transform: scale(0.8);             
        }

        .card-text {
            color: var(--dark-gray);
        }

        .LikeButton-Inner {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            
            cursor: pointer;
        }

        .Card-Right {

        }`
    }
    
    LikeApi(productId: number) {
        likeApi(productId)
            .then(data => {
                if (!data.hasOwnProperty("status")) {
                    this.setState({
                        isUserLiked: !this.state.isUserLiked,
                        likeCount: this.state.likeCount + 1
                    })
                }
            })
    }

    UnLikeApi(productId: number) {
        unlikeApi(productId)
            .then(data => {
                if (!data.hasOwnProperty("status")) {
                    this.setState({
                        isUserLiked: !this.state.isUserLiked,
                        likeCount: this.state.likeCount - 1
                    })
                }
            })      
    }
 

    render() {
        this.$outer.innerHTML = `
        <div class="Card-Inner" >
            <div class="Card-Left" >
                <img src="${this.item.productImages? this.item.productImages[0].filePath : 'public/image/main.png'}" class="product-images" />
            </div>
            <div class="Card-Mid" >
                <div id="Card-Content-Top-${this.ID}" class="Card-Content-Top" >
                    <a href="/#product/${this.item.id}">
                        <h4>${this.item.title}</h4>
                    </a>
                    <div id="Card-Login-Button-${this.ID}" >
                        <div id="LikeButton-Inner-${this.item.id}" class="LikeButton-Inner" >
                            ${HeartSVG(this.state.isUserLiked)}
                        </div>
                    </div>

                </div>

                <h5 class="price-text" >${this.item.price ? this.item.price.toLocaleString('en-AU') + "원" : "비공개"}</h5>
                <div class="Card-Content-Bottom" >
                    <h5 class="time-text" >${getTimes().getTime(this.item.createdAt)}</h5>
                    <div id="Card-Chat-Button-${this.ID}" class="Card-Chat-Button" >
                        <div class="card-item">
                            ${SHeartSVG}
                        </div>
                        <h5 class="card-text" >
                            ${this.state.likeCount}
                        </h5>
                        <div class="card-item">
                            ${ChatSVG} 
                        </div>
                        <h5 class="card-text" >
                            ${this.item.chatroomCount}
                        </h5>
                    </div>
                </div>
            </div>
            <div class="Card-Right" >
            </div>
        </div>`
    }

    methods() {
        const CardContentTop = $(`#Card-Content-Top-${this.ID}`).getById()
        if (CardContentTop) {

            const checkedId = redux.check.getCheckForm().id
            const userId = this.item.userId

            if (checkedId) {
                if (checkedId === userId) {
                    const CardLoginButton = $(`#Card-Login-Button-${this.ID}`).getById()
                    if (CardLoginButton) {
                        CardLoginButton.innerHTML = ""
                        new UpdateDelete(CardLoginButton, this.item.id, this.item)
                    }
                } 
            }
        }

        let that = this
        $(`#LikeButton-Inner-${this.item.id}`).on('click', function () {
            console.log("클릭")
            if (that.state.isUserLiked) {
                that.UnLikeApi(that.item.id)
            } else {
                that.LikeApi(that.item.id)
            }

        })
    }
}