import { redux } from ".."
import AuthContainer from "../components/Auth/AuthContainer/AuthContainer"
import Header from "../components/Header/Header"
import MenuContainer from "../components/Menu/MenuContainer/MenuContainer"
import { checkApi } from "../requests/auth"
import cache from "./cache"

const check = () => {
    // 토큰 받기
    const token = cache.get('token')
    // 리덕스 체크, 상태바꾸기 함수
    const ChangeState = (_id: string) => {
        redux.check.setCheckForm('id', _id)
        
        const header: Header = redux.instance.getInstance('header')
        header.setState({
            id: _id
        })
        const authcontainer: AuthContainer = redux.instance.getInstance('authcontainer')
        authcontainer.setState({
            checked: _id
        })
        
        const menucontainser: MenuContainer = redux.instance.getInstance('menucontainer')
        menucontainser.setState({
            checked: _id
        })

    }

    // 토큰 없으면 헤더 처리, auth창 닫기
    if (!token) {
        ChangeState('')
        return 
    }
    // 있으면 헤더 처리
    checkApi()
        .then(data => {
            if (data.data.user.id) {
                ChangeState(data.data.user.id)
            }
        })
}

export default check