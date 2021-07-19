export const API_ENDPOINT =
  "http://localhost:8000";


class HTTPError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export default function fetchThen(URL: string, data: object) {

  return fetch(`${API_ENDPOINT}${URL}`, data)
    .then(res => {
      if (res.status < 300) {
        return res.json();
      }

      throw new HTTPError(res.status, res.statusText);
    });
}

