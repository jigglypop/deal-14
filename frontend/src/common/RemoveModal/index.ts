import React from "../../util/react"
import { $ } from "../../util/select"
import "./index.css"
import { redux } from "../.."
import { removeApi } from "../../requests/product"

export default class RemoveModal extends React{

    constructor($target: HTMLElement) {
      super($target, 'RemoveModal')
      this.init() 
    }
    css() {
        return ``
    }
    render() {
        this.$outer.innerHTML = `
        <div id="RemoveModal-inner" class="RemoveModal-inner" >
          <h5 id="removemodal-title" >정말로 삭제하시겠습니까?</h5>
          <div id="RemoveModal-inner-Item" >
            <h5 id="removemodal-goback" >취소</h5>
            <h5 id="removemodal-delete" >삭제</h5>
          </div>
        </div>`
    }

  RemoveApi() {
    const productId = redux.remove.getRemove()
    console.log(productId)
    removeApi(productId)
      .then(data => {
        const RemoveModal = $('.RemoveModalOuter').get()
        if (RemoveModal) {
            RemoveModal.classList.remove("isDisplay")
        }
        const products = redux.instance.getInstance('products')
        products.init()

        const menucontainer = redux.instance.getInstance('menucontainer')
        menucontainer.init()
      })
  }

  methods() {
    let that = this
    $(`#removemodal-goback`).on('click', function () {
        const RemoveModal = $('.RemoveModalOuter').get()
        if (RemoveModal) {
            RemoveModal.classList.remove("isDisplay")
        }
    })
    
    $(`#removemodal-delete`).on('click', function () {
        that.RemoveApi()
    })
  }
}