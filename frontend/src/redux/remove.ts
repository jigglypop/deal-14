const Remove = function() {
    let id = -1
    return {
        // 삭제 아이디 세팅
        setRemove(_id: number) {
            id = _id
            return id
        },
        getRemove() {
            return id
        },
    }
}
export default Remove