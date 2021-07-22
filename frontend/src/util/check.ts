import { redux } from ".."
// import AuthContainer from "../components/Auth/AuthContainer/AuthContainer"
import Header from "../components/Header/Header"
import Home from "../components/Home/Home"
import MenuContainer from "../components/Menu/MenuContainer/MenuContainer"
import Product from '../components/Product/Product/Product'
import { checkApi } from "../requests/auth"
import cache from "./cache"

const check = () => {
    // 토큰 받기
    const token = cache.get('token')
    // 리덕스 체크, 상태바꾸기 함수
    const ChangeState = (_id: string) => {
        redux.check.setCheckForm('id', _id)
        if (_id === '') {
            redux.check.setCheckForm("profileImage", "")
        }
        const header: Header = redux.instance.getInstance('header')
        header.setState({
            id: _id,
        });

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

            redux.instance.getInstance('categorycontainer').init();
        } else if (location.hash.split('/')[0] === '#product') {
            const product: Product = redux.instance.getInstance('productcontainer')
            product.init();
        }


    }

    // 토큰 없으면 헤더 처리, auth창 닫기
    if (!token) {
        ChangeState('');
    }
    // 있으면 헤더 처리
    checkApi()
        .then(data => {
            if (data.data.user.id) {
                ChangeState(data.data.user.id);
            }
            if (data.data.user.profileImage) {
                redux.check.setCheckForm('profileImage', data.data.user.profileImage)
            }
        })

}

export default check