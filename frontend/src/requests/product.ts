import { redux } from ".."
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



export const uploadApi = () => {

    const fileObject = redux.upload.getFileObject()

    const formData = new FormData()

    for (let key of Object.keys(fileObject)) {
        const file = fileObject[key]['file']
        formData.append('recfiles', file)
    }
    
    return fetchThen("/api/upload", {
        method: "POST",
        body: formData
    })
    
}

export const writeApi = () => {
    const WriteForm = redux.write.getWriteForm()
    // 체크시 토큰을 캐시에서 받아와서 요청
    const token = cache.get('token')
    
    return fetchThen("/api/product", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token.value}`
        },
        body: JSON.stringify(WriteForm)
    })
}
