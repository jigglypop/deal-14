import fetchThen from "../util/api"

export const productListApi = () => {

    return fetchThen("/api/product", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    
}
