import fetchThen from "../util/api"
import cache from "../util/cache"

export const productListApi = () => {

    return fetchThen("/api/product", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    }) 
}


export const myproductListApi = () => {

    // 체크시 토큰을 캐시에서 받아와서 요청
    const token = cache.get('token')
    
    return fetchThen("/api/product/my", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token.value}`
        },
    })
}


export const productApi = (productId: string) => {

    return fetchThen(`/api/product/${productId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    }) 
}



export const uploadApi = (form: any) => {

    return fetchThen("/api/upload", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
    })
    
}