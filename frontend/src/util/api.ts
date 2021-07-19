import cache from "./cache";

export const API_ENDPOINT =
  "http://localhost:8000";


<<<<<<< HEAD
=======
class HTTPError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

>>>>>>> b7a5c9684d1e1869b2690d9340bd2488ffc985bc
export default function fetchThen(URL: string, data: object) {

  return fetch(`${API_ENDPOINT}${URL}`, data)
    .then(res => {
<<<<<<< HEAD
        const token = res.headers.get('token')
        if (token) {
          cache.set("token", {
            value: token
          })
        }
        return res.json()
      }
    )
=======
      if (res.status < 300) {
        return res.json();
      }

      throw new HTTPError(res.status, res.statusText);
    });
>>>>>>> b7a5c9684d1e1869b2690d9340bd2488ffc985bc
}

