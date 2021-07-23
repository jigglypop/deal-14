export interface IProductResponse {
    isError: boolean
    data: object | string
}

const Product = function() {
    let result : IProductResponse = {
        isError: false,
        data: {}
    }
    return {
        // 리스트 가져온 후 promise 가로채기
        setProductList(_result: IProductResponse) {
            result.isError = _result.isError
            result.data = _result.data
            return result
        },
        getProductList() {
            return result
        },
    }
}
export default Product