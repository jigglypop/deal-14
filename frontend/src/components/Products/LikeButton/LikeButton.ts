// import React from "../../../util/react"
// // import "./LikeButton.css"
// // import { $ } from "../../../util/select";
// import { redux } from "../../../";
// // import getID from "../../../util/getID";
// import { HeartSVG } from "../../../svgicon/Heart";
// import { unlikeApi, likeApi } from "../../../requests/product";
// import { ProductTypes } from "../../../types/product";
// 
// export default class LikeButton extends React{
// 
//     protected item: ProductTypes
//     private productId: number
//     private UUID: string
// 
//     constructor($target: HTMLElement, productId: number, item: ProductTypes, UUID: string) {
//         super($target, 'LikeButton')
//         this.productId = productId
//         this.item = item
//         this.UUID = UUID
//         this.init()
//     }
// 
//     css() {
//         return `
//             .LikeButton-Inner {
//                 position: relative;
//                 width: 100%;
//                 height: 100%;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 text-align: center;
//                 
//                 cursor: pointer;
//             }
//         `
//     }
// 
//     render() {
//         this.$outer.innerHTML = `
//             <div id="LikeButton-Inner-${this.productId}" class="LikeButton-Inner" >
//                 ${HeartSVG}
//             </div>`
//         this.componentWillMount()
//     }
// 
// 
// 
//     methods() {
//         const card = redux.instance.getInstance(`card-${this.UUID}`)
//         console.log(redux.instance.getInstanceAll(), `card-${this.UUID}`, card)
//         // let that = this
//         // $(`#LikeButton-Inner-${this.productId}`).on('click', function () {
//         //     const heart = $(`#LikeButton-Inner-${that.productId}`).getById()
//         //     console.log(heart)
//         //     if (heart) {
//         //         const heartSVG = heart.querySelector(".like-heart")
//         //         if (heartSVG) {
//         //             if (heartSVG.getAttribute('fill') === 'var(--deep-gray)') {
//         //                 console.log("라이크")
//         //                 that.getLikeApi(that.productId)
//         //             } else {
//         //                 console.log("언라이크")
//         //                 that.getUnLikeApi(that.productId)
//         //             }
//         //         }
//         //     }  
//         // })
//     }
// }