export interface UploadObject {
    file: string;
    src: string;
}

const Upload = function () {
    let fileObject : any = {}
    return {
        // 파일 Object 세팅, 제거, 게터
        setFileObject(key: string, value: UploadObject) {
            fileObject[key] = value
            return fileObject
        },
        removeFileObject(key: string) {
            delete fileObject[key]
            return fileObject
        },
        getFileObject() {
            return fileObject
        }
    }
}
export default Upload