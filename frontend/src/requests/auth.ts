import { ILoginForm, IRegisterForm } from "../types/IAuthForm"
import fetchThen from "../util/api"
import cache from "../util/cache"

export const loginApi = (data: ILoginForm) => {
    return fetchThen("/api/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    
}


export const registerApi = (data: IRegisterForm) => {

    return fetchThen("/api/auth/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    
}

export const checkApi = () => {
    // 체크시 토큰을 캐시에서 받아와서 요청
    const token = cache.get('token')
    
    return fetchThen("/api/auth/check", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'token' : `Bearer ${token.value}`
        },
    })
    
}