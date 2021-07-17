export interface ILoginResponse {
    isError: boolean
    data: object | string
}

const Flag = function() {
    let flag = {
        isLogin: true
    }
    return {
        // 플래그 토글하기
        setFlagToggle(key: keyof typeof flag) {
            if (key in flag) {
                flag[key] = !flag[key]
            }
            return flag
        },
        // 플래그 가져오기
        getFlagById(key: keyof typeof flag) {
            return flag[key]
        }
    }
}
export default Flag 