const Plus = function() {
    let plus = 0
    return {
        setPlus() {
            plus -= 2
            return plus
        },
        getPlus() {
            return plus
        }
    }
}
export default Plus