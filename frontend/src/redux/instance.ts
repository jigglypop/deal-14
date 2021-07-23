const Instance = function() {
    let instance: any = {
        header: {},
        slider: {},
        authcontainer: {}
    }
    return {
        // 인스턴스 가져오기
        setInstance(key: string, value: any) {
            instance[key] = value
            return instance[key]
        },
        getInstance(key: string) {
            return instance[key]            
        },
        getInstanceAll() {
            return instance
        }
    }
}
export default Instance