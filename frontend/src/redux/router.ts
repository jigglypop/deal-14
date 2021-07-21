import { $ } from "../util/select"

const Router = function() {
    let router: string[] = ["#"]
    return {
        // 라우터
        popRouter() {
            const _href = router.pop()
            return _href
        },
        pushRouter(href: string) {
            if (href === '') {
                router.push('#')
            } else {
                router.push(href)
            }
            return router      
        },
        getRouter() {
            return router
        },
        goRouter() {
            this.popRouter()
            const go = this.popRouter()
            if (go) {
                const historyHash = $("#history-hash").getById()
                historyHash?.setAttribute('href', "/#" + go.replace("#", ""))
                historyHash?.click()
            }
        },
        moveRouter(hash: string) {
            router.push(hash)
            const historyHash = $("#history-hash").getById()
            historyHash?.setAttribute('href', hash)
            historyHash?.click()            
        }
    }
}
export default Router