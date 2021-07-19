const getTimes = () => {
    return {
        getNumber(createdAt: string) {
            const date: Date = new Date(createdAt)
            const now: Date = new Date()
            return now.getTime() - date.getTime()
        },
        getHour(createdAt: string) {
            const value = Math.floor((this.getNumber(createdAt))/ (1000 * 60 * 60))
            return value
        },
        getMinute(createdAt: string) {
            const value = Math.floor((this.getNumber(createdAt))/ (1000 * 60))
            return value
        },
        getSecond(createdAt: string) {
            const value = Math.floor((this.getNumber(createdAt))/ (1000))
            return value
        },
        getTime(createdAt: string) {
            let value = this.getSecond(createdAt)
            if (value >= 60) {
                value = Math.floor(value / 60)
                if (value >= 60) {
                    value = Math.floor(value / 60)
                    if (value >= 24) {
                        value = Math.floor(value / 24)
                        return value.toString() + "일 전"    
                    } else {
                        return value.toString() + "시간 전"    
                    }
                } else {
                    return value.toString() + "분 전"
                }
            } else {
                return value.toString() + "초 전"
            }
        }
    }
}

export default getTimes