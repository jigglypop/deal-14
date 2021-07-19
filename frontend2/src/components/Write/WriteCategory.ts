import React from "../../util/react"
import "../../public/css/WriteCategory.css"
import { $, $$ } from "../../util/select";
import { redux } from "../../index";
import { ICategory } from "../../constants/category.constants";

export default class WriteCategory extends React{

    category: ICategory

    constructor($target: HTMLElement, category: ICategory) {
        super($target, 'WriteCategory')
        this.category = category
        this.init()
    }

    css() {
        return `
  
        `
    }
    render() {
        this.$outer.innerHTML = `
            <div id="WriteCategory-${this.category.keys}" class="WriteCategory" >
                <h6>${this.category.name}</h6>
            </div>`
    }
 
    methods() {
        let that = this
        $(`#WriteCategory-${this.category.keys}`).on('click', function () {
            redux.write.setWriteForm('category', that.category.keys)

            const category = $(`#WriteCategory-${that.category.keys}`).getById()
            
            const categories = $$('.WriteCategory').get()
            categories.forEach(_category => _category.classList.remove("isOn"))

            if (category) {
                category.classList.toggle("isOn")
            }

            redux.write.checkVailidate()
        })

    }
}