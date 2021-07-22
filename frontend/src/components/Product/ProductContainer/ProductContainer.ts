import React from "../../../util/react"
import "./ProductContainer.css"
import { IProductResponse } from "../../../types/IProducResponse"
import { ProductTypes } from "../../../types/product"
import { $ } from "../../../util/select"
import { redux } from "../../.."
import { joinChatRoom } from '../../../requests/chatRoom'
import { ProductImageTypes } from '../../../types/productImage'
import { LeftArrow } from '../../../svgicon/LeftArrow'
import Categories, { ICategory } from '../../../constants/category.constants'
import getTimes from '../../../util/getTimes'
import { HeartSVG } from '../../../svgicon/Heart'
import { formatPrice } from '../../../util/price'
import { likeApi, unlikeApi, updateApi, updateSpecificApi } from '../../../requests/product'
import UpdateDelete from '../../Products/UpdateDelete/UpdateDelete'
import { createToast } from '../../../util/createToast'

const SELLING = 'SELLING';
const SOLD_OUT = 'SOLD_OUT';

interface IImages {
    filePath: string;
}

const getCategoryName = (categoryKey: number) => {
    const category: ICategory | undefined = Categories.find(c => c.keys === categoryKey);
    if (category === undefined) {
        return '없음';
    }

    return category.name;
}

export default class ProductContainer extends React {

    private product: ProductTypes

    constructor($target: HTMLElement, data: IProductResponse) {
        super($target, 'ProductContainer')
        this.product = data.data.product;
        this.init();
    }

    css() {
        return ``
    }

    render() {
        this.$outer.innerHTML = `
        <div class="image-slider-wrapper">
            <div class="image-header">
                <span class="product-go-back">${LeftArrow}</span>
                <div class="image-control">
                </div>
            </div>
            <div class="image-slider">
            </div>

            <div class="image-slider-dot-wrapper">
            </div>
        </div>

        <div class="product-content">
            <hr/>
            <div class="product-sold-out-wrapper disappear">
                <select class="product-sold-out-select">
                    <option ${!this.product.isSoldOut && 'selected'} value="${SELLING}">판매중</option>
                    <option ${this.product.isSoldOut && 'selected'} value="${SOLD_OUT}">판매완료</option>
                </select>
            </div>
            <div class="product-title-wrapper">
                <h1 class="product-title" >${this.product.title}</h1>
            </div>
            <div class="product-category-time">
                ${getCategoryName(this.product.category)},
                ${getTimes().getTime(this.product.createdAt)}
            </div>
            <hr/>
            <div class="product-content-text">
                ${this.product.content}
            </div>
            <div class="product-detail-info">
                <span>채팅 ${this.product.chatroomCount}</span>
                <span>관심 <span class="product-like-count">${this.product.likeCount}</span></span>
            </div>
            <div class="product-user">
                <span>판매자 정보</span>
                <div class="product-user-profile">
                    <img src="${this.product.user.profileImage}" class="product-user-profile-image" />
                    <span class="product-user-name">
                        ${this.product.userId}
                    </span>
                    <span class="product-user-town">
                        ${this.product.town.townName}
                    </div>
                </div>
            </div>
        </div>

        <footer class="product-footer">
            <div class="product-footer-detail">
                <div class="product-like-button-wrapper">
                    ${HeartSVG(this.product.isUserLiked)}
                </div>
                <span class="product-footer-price">${formatPrice(this.product.price)}</span>
            </div>

            <div class="chat-button-wrapper">
            <div>
        </footer>
        <div id="product-dummy">
        </div>
        `
        this.componentWillMount()
    }

    appendImageOnSlider(productImages: IImages[]) {
        const slider = $('.image-slider').get();
        const sliderDot = $('.image-slider-dot-wrapper').get();

        $('.image-slider').css('width', `calc(var(--baseX) * ${productImages.length})`);

        productImages.forEach((image, index) => {
            const { filePath } = image;

            const $image = document.createElement('img');
            $image.src = filePath;
            slider?.appendChild($image);

            const $dot = document.createElement('div');
            $dot.className = 'image-slider-dot';
            if (index === 0) {
                $dot.classList.add('selected');
            }

            $dot.dataset.imageIndex = index.toString();
            sliderDot?.appendChild($dot);
        });
    }

    componentWillMount() {
        const $chatButtonWrapper = $('.chat-button-wrapper').get() as HTMLElement;
        const isHost = redux.check.getCheckForm().id === this.product.userId;

        if (isHost) {
            if ($chatButtonWrapper) {
                $chatButtonWrapper.innerHTML = `
                <button class="product-chat-button show-chatroom">채팅 목록 보기</button>
            `;
            }
            $('.product-like-button-wrapper').get()?.classList.add('disappear');

            const $imageControl = $('.image-control').get();
            if ($imageControl !== null) {
                new UpdateDelete($imageControl, this.product.id, this.product);
            }

            $('.product-sold-out-wrapper').get()?.classList.remove('disappear');
        } else {
            if ($chatButtonWrapper) {
                $chatButtonWrapper.innerHTML = `
                <button class="product-chat-button ask-product">문의하기</button>
            `
            }
        }

        this.appendImageOnSlider(this.product.productImages);
    }

    goBack() {
        redux.router.goRouter()
    }

    onAskProductClicked = () => {
        joinChatRoom(this.product.id)
            .then(data => {
                const { chatRoom } = data.data;
                location.href = `/#chat/${chatRoom.id}`;
            })
            .catch(error => {
                createToast('채팅방 가입에 실패했습니다');
            })
    }

    onChatButtonClicked = (e: Event) => {
        if (redux.check.getCheckForm().id === '') {
            // 로그인해주세요
            alert('login required');
            return;
        }

        const target = e.target as HTMLElement;
        if (target.classList.contains('ask-product')) {
            this.onAskProductClicked();
        } else if (target.classList.contains('show-chatroom')) {
            this.onShowChatRoomClicked();
        }
    }

    onShowChatRoomClicked = () => {
        location.href = '#chatroom';
    }

    onSoldOutSelectChanged = (e: Event) => {
        const { value } = (e.target as HTMLSelectElement);

        if (value === SELLING) {
            updateSpecificApi({
                ...this.product,
                isSoldOut: false,
            }).then(() => {
                this.product.isSoldOut = false;
            })
        } else {
            updateSpecificApi({
                ...this.product,
                isSoldOut: true,
            }).then(() => {
                this.product.isSoldOut = true;
            })
        }
    }

    slideImages(e: Event) {
        const { imageIndex } = (e.target as HTMLElement).dataset;
        if (!imageIndex || isNaN(Number(imageIndex))) {
            return;
        }

        $('.image-slider-dot.selected').get()?.classList.remove('selected');
        $('.image-slider').css('transform', `translateX(calc(${Number(imageIndex)} * var(--base-X)))`);
        (e.target as HTMLElement).classList.add('selected');
    }

    onLikeButtonClicked() {
        if (redux.check.getCheckForm().id === '') {
            alert('login required');
        }

        let requestPromise;
        if (this.product.isUserLiked) {
            requestPromise = unlikeApi(this.product.id);
        } else {
            requestPromise = likeApi(this.product.id);
        }

        requestPromise
            .then(() => {
                this.product.isUserLiked = !this.product.isUserLiked;
                const $productLikedButtonWrapper = $('.product-like-button-wrapper').get();
                if ($productLikedButtonWrapper === null) return;

                $productLikedButtonWrapper.innerHTML = `
                    ${HeartSVG(this.product.isUserLiked)}
                `

                const $productLikeCount = $('.product-like-count').get();
                if ($productLikeCount === null) return;
                const increaseCount = this.product.isUserLiked ? 1 : -1;
                $productLikeCount.innerText = `${this.product.likeCount + increaseCount}`;
                this.product.likeCount += increaseCount;
            })
            .catch(error => {
                alert(error);
            })
    }

    methods() {
        $('.product-go-back').on("click", this.goBack)
        $('.image-slider-dot-wrapper').on('click', this.slideImages);
        $('.product-chat-button').on('click', this.onChatButtonClicked);
        $('.product-like-button-wrapper').on('click', this.onLikeButtonClicked.bind(this));
        $('.product-sold-out-select').on('change', this.onSoldOutSelectChanged.bind(this));
    }
}