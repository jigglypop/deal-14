import styled from "./style-component";

export default abstract class React {
    
    $outer: any
    state: any
    styled: any
    abstract render(): void

    constructor() { }
    
    // 시작 함수
    init($target: HTMLElement, sementic?: any) {
        // 아우터 만들기
        let $outer = null;
        if (sementic !== undefined) {
            $outer = document.createElement(`${sementic}`);
        } else {
            $outer = document.createElement("div");
        }
        const outerName = String(this.constructor.name);
        $outer.className = outerName;
        this.$outer = $outer;
        // $target에 appendChild
        $target.appendChild($outer);
        // 렌더링
        this.render();
        // 스타일링
        this.style();
    }

    // setState
    setState(data: any) {
        for (let param of Object.keys(data)) {
            this.state[param] = data[param];
        }
        this.render();
        this.style();
    }

    // styled-component
    style() {
        const root = this.$outer.className;
        const rootAll: any = document.querySelectorAll(`.${root}`);
        for (let rootEl of rootAll) {
            styled(rootEl, `.${root}`, this.styled);
        }
    }
}