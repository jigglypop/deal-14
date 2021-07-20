import React from "../../../util/react"
import "./Category.css"
import { redux } from "../../..";
import { $ } from "../../../util/select";
import CategoryContainer from "../CategoryContainer/CategoryContainer";

export default class Category extends React{

    constructor($target: HTMLElement) {
        super($target, 'Category')
        this.init()
    }

    css() {
        return ``
    }
    render() {
        this.$outer.innerHTML = `
            <div id="Category-Inner" >
            </div>`
        const CategoryInner = $('#Category-Inner').get()
        if (CategoryInner) {
            const categorycontainer = new CategoryContainer(CategoryInner)
            redux.instance.setInstance('categorycontainer',categorycontainer)
        }
    }
 
    methods() {
    }
}