import { redux } from ".."
import { ProductTypes } from '../types/product'
import fetchThen from "../util/api"
import cache from "../util/cache"

export const productListApi = () => {
    // 체크시 토큰을 캐시에서 받아와서 요청
    const token = cache.get('token')
    const townId = redux.town.getCurrentTown()?.id;

    return fetchThen(`/api/product/${townId ? `?townId=${townId}` : ''}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.value}`
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
            'Authorization': `Bearer ${token.value}`
        },
    })
}

export const likeproductListApi = () => {

    // 체크시 토큰을 캐시에서 받아와서 요청
    const token = cache.get('token')

    return fetchThen("/api/product/liked", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        },
    })
}

export const unlikeApi = (productId: number) => {

    // 체크시 토큰을 캐시에서 받아와서 요청
    const token = cache.get('token')

    return fetchThen(`/api/product/unlike/${productId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        },
    })
}
export const likeApi = (productId: number) => {

    // 체크시 토큰을 캐시에서 받아와서 요청
    const token = cache.get('token')

    return fetchThen(`/api/product/like/${productId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        },
    })
}
export const productApi = (productId: string) => {
    const token = cache.get('token')

    return fetchThen(`/api/product/${productId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token && `Bearer ${token.value}`,
        },
    })
}

export const removeApi = (productId: number) => {

    const token = cache.get('token')

    return fetchThen(`/api/product/${productId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
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

    WriteForm.price = Number(WriteForm.price)
    delete WriteForm['townName']

    return fetchThen("/api/product", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify(WriteForm)
    })
}

export const updateApi = () => {
    const UpdateForm = redux.update.getUpdateForm()
    // 체크시 토큰을 캐시에서 받아와서 요청
    const token = cache.get('token')

    const productId = UpdateForm.productId
    delete UpdateForm.productId

    UpdateForm.price = Number(UpdateForm.price)

    console.log(UpdateForm)

    return fetchThen(`/api/product/${productId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify(UpdateForm)
    })
}


export const updateSpecificApi = (product: ProductTypes) => {
    const token = cache.get('token')

    return fetchThen(`/api/product/${product.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify({
            title: product.title,
            content: product.content,
            category: product.category,
            isSoldOut: product.isSoldOut,
            price: product.price,
        }),
    });
}