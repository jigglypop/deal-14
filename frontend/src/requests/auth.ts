import fetchThen from "../util/api"

export const loginApi = () => {

    return fetchThen("/api/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    
}


export const registerApi = () => {

    return fetchThen("/api/auth/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    
}
// export const registerApi = () => {
        
//     const reduxSet = redux.login.setLogin

//     fetchThen("/api/auth/register", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             id: "ydh2244"
//         })
//     }, reduxSet)
// }