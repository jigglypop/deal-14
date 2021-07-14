import styled from "./style-component";

export default abstract class React {
    
    $outer: HTMLElement
    $target: HTMLElement
    state: any
    styled: any
    sementic: string | undefined
    abstract render(): void

    constructor($target: HTMLElement, name: string, sementic?: string | undefined) {
        this.$outer = document.createElement("div");
        if (sementic) {
            this.$outer = document.createElement(`${sementic}`);
        }
        this.$outer.className = name + 'Outer';
        this.$target = $target
        this.$target.appendChild(this.$outer);
    }

    
    // 시작 함수
    init() {
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
        const root = this.$outer?.className;
        const rootAll: any = document.querySelectorAll(`.${root}`);
        for (let rootEl of rootAll) {
            styled(rootEl, `.${root}`, this.styled);
        }
    }
}