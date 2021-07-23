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

export const $ = (element: Document | HTMLElement | string) => {
    return {
        get(): HTMLElement | null {
            if (typeof element === 'string') {
                return document.querySelector(element);
            }
            else if (element instanceof HTMLElement) {
                return element;
            }
            return null;
        },
        // css valuable 가져오기
        getV(value: string): string | null {
            if (typeof element === 'string') {
                const $El = this.get()
                if ($El instanceof HTMLElement) {
                    const result = getComputedStyle($El).getPropertyValue(value)
                    if (!result) {
                        return null
                    }
                    return result;
                } else {
                    return null
                }
            }
            else if (element instanceof HTMLElement) {
                const result = getComputedStyle(element).getPropertyValue(value)
                if (!result) {
                    return null
                }
                return result;
            }
            return null;
        },
        // css valuable 세팅하기
        setV(key: string, _value: string) {
            if (typeof element === 'string') {
                const $El = this.get()
                if ($El instanceof HTMLElement) {
                    const result = $El.style.setProperty(key, _value)
                }
            }
            else if (element instanceof HTMLElement) {
                const result = element.style.setProperty(key, _value)
            }
        },
        on(type: string, cb: EventListener) {
            const $element = this.get();
            if ($element === null) {
                return;
            }
            $element.addEventListener(type, cb);
        },
        // .get()으로 가져올 수 있음
        getById() {
            if (typeof element === 'string') {
                return document.getElementById(element.slice(1, element.length));
            }

            return null;
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