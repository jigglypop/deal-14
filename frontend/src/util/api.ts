export const API_ENDPOINT =
  "http://localhost:8000";


export default function fetchThen ( URL: string, data: object ) {
  
  return fetch(`${API_ENDPOINT}${URL}`, data)
    .then(res=> res.json())
}

