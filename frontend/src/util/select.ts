// 요소 선택자 1개
export const $ = (el: Document | string) => {
    return {
        get(){
            let El = null
            if (typeof el === 'string') {
                if (el.match(/#(.)+/g)){
                    El = document.querySelector(el)
                } else {
                    El = document.getElementById(el.slice(1, el.length ))
                }                
            }
            return El
        },
        getById() {
            if (typeof el === 'string') {
                return document.getElementById(el.slice(1, el.length ))
            }
        },
        on(method: string, cb: () => void){
            const El = this.get()
            if (El) {
                El.addEventListener(method, cb)
            }
        },
        ready(cb: ()=> void){
            if (el === document){
                cb()
            } 
        },
        css(attr: string, value: string) {
            const El: any = this.get()
            if (El) {
                El.style[attr] = value
            }
        }
    }
}

// 요소 선택자 2
export const $$ = (el: string) => {
    return {
        get(){
            let Els = null
            if (typeof el === 'string') {
                Els = document.querySelectorAll(el)
            }
            return Els
        },
        on(method: string, cb: () => void){
            const Els = this.get()
            if (Els){
                Els.forEach(El => El.addEventListener(method, cb))
            }
        },
        css(attr: string, value: string) {
            const Els = this.get()
            if (Els) {
                Els.forEach((El: any) => El.style[attr] = value)
            }
        }
    }
}