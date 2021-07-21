import { redux } from ".."
// import AuthContainer from "../components/Auth/AuthContainer/AuthContainer"
import Header from "../components/Header/Header"
import Home from "../components/Home/Home"
import MenuContainer from "../components/Menu/MenuContainer/MenuContainer"
import { checkApi } from "../requests/auth"
import { fetchMyTowns } from "../requests/town"
import cache from "./cache"

const check = () => {
    // 토큰 받기
    const token = cache.get('token')
    // 리덕스 체크, 상태바꾸기 함수
    const ChangeState = (_id: string, townName: string) => {
        redux.check.setCheckForm('id', _id)
        if (_id === '') {
            redux.check.setCheckForm("profileImage", "")
        }
        const header: Header = redux.instance.getInstance('header')
        header.setState({
            id: _id,
            townName: townName
        })
            
        const slider = redux.instance.getInstance('slider')
        slider.init()

        // const authcontainer: AuthContainer = redux.instance.getInstance('authcontainer')
        // authcontainer.setState({
        //     checked: _id
        // })
        // 
        const menucontainser: MenuContainer = redux.instance.getInstance('menucontainer')
        menucontainser.setState({
            checked: _id
        })
        // 라우팅별로 check후에 잡아주기
        if (location.hash === "" || location.hash === "#") {
            const home: Home = redux.instance.getInstance('home')
            home.init()       
        }
        

    }

    // 토큰 없으면 헤더 처리, auth창 닫기
    if (!token) {
        const townName = cache.get('townName')
        ChangeState('', townName )
        return 
    }
    // 있으면 헤더 처리
    checkApi()
        .then(data => {
            if (data.data.user.id) {
                FetchMyTowns(data.data.user.id)
            }
            if (data.data.user.profileImage) {
                redux.check.setCheckForm('profileImage', data.data.user.profileImage)
            }
        })
    
    const FetchMyTowns = (userId: string) => {
        fetchMyTowns()
            .then(data => {
                redux.check.setCheckForm('mytown', data.data.userTowns)
                const checkform = redux.check.getCheckForm()
                const townName = checkform.townName
                const townId = checkform.townId
                cache.set("townName", townName)
                cache.set("townId", townId)

                redux.write.setWriteForm('townName', townName)
                redux.write.setWriteForm('townId', townId)


                ChangeState(userId, townName)
            })
    }
}

export default check