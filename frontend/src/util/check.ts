import { redux } from ".."
import AuthContainer from "../components/Auth/AuthContainer"
import Header from "../components/Header"
import Slider from "../components/Slider"
import { checkApi } from "../requests/auth"
import cache from "./cache"
import { $ } from "./select"

const check = () => {
    // 토큰 받기
    const token = cache.get('token')
    // 토큰 없으면 헤더 처리, auth창 닫기
    if (!token) {
        redux.check.setCheckForm('id', '')
        const header: Header = redux.instance.getInstanceHeader()
        header.setState({
            id: ''
        })
        const authcontainer: AuthContainer = redux.instance.getInstanceAuthContainer()

        authcontainer.setState({
            checked: ''
        })

        return 
    }
    // 있으면 헤더 처리
    checkApi()
        .then(data => {
            if (data.data.user.id) {
                redux.check.setCheckForm('id', data.data.user.id)

                const header: Header = redux.instance.getInstanceHeader()

                header.setState({
                    id: data.data.user.id
                })

                const authcontainer: AuthContainer = redux.instance.getInstanceAuthContainer()

                authcontainer.setState({
                    checked: data.data.user.id
                })

                // const slidertoggle = redux.slidertoggle.getSlider()
                // if (slidertoggle.auth) {
                //     $("#Auth-Inner").css("transform", "translateX(0)")
                //     redux.slidertoggle.setSliderToggle('auth')
                // }
            }
        })
}

export default check