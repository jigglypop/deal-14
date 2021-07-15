const setCSSProperty = ($element: HTMLElement, attr: keyof CSSStyleDeclaration, value: string) => {
    if (attr === 'length'
        || attr === 'parentRule'
        || attr === 'item'
        || attr === 'setProperty'
        || attr === 'removeProperty'
        || attr === 'getPropertyPriority'
        || attr === 'getPropertyValue') {
        return;
    }

    $element.style[attr] = value;
}

export const $ = (element: Document | string) => {
    return {
        get(): HTMLElement | null {
            if (typeof element === 'string') {
                return document.querySelector(element);
            }

            return null;
        },
        on(type: string, cb: EventListener) {
            const $element = this.get();
            if ($element === null) {
                return;
            }

            $element.addEventListener(type, cb);
        },
        ready(cb: () => void) {
            if (element === document) {
                cb();
            }
        },
        css(attr: keyof CSSStyleDeclaration, value: string) {
            const $element = this.get();
            if ($element === null) {
                return;
            }

            setCSSProperty($element, attr, value);
        },
    }
}

export const $$ = (element: string) => {
    return {
        get(): NodeListOf<HTMLElement> {
            return document.querySelectorAll<HTMLElement>(element);
        },
        on(type: string, cb: EventListener) {
            const $elements = this.get()
            $elements.forEach($el => $el.addEventListener(type, cb))
        },
        css(attr: keyof CSSStyleDeclaration, value: string) {
            const $elements = this.get()
            $elements.forEach(($el) => setCSSProperty($el, attr, value));
        },
    }
}