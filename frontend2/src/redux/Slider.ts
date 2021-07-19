
const SliderToggle = function() {
    let slider = {
        menu: false,
        auth: false,
        category: false
    }
    return {
        // 슬라이더 오픈 토글
        setSliderToggle(key: keyof typeof slider) {
            slider[key] = !slider[key]
            return slider
        },
        getSlider() {
            return slider
        }
    }
}
export default SliderToggle