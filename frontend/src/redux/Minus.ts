const Minus = function() {
    let minus = 0
    return {
        setMinus() {
            minus -= 2
            return minus
        },
        getMinus() {
            return minus
        }
    }
}
export default Minus