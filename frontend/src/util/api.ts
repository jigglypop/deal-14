import cache from "./cache";

export const API_ENDPOINT = process.env.API_ENDPOINT;


export default function fetchThen(URL: string, data: object) {

  return fetch(`${API_ENDPOINT}${URL}`, data)
    .then(res => {
      const token = res.headers.get('token')
      if (token) {
        cache.set("token", {
          value: token
        })
      }
      return res.json()
    }
    )
}

