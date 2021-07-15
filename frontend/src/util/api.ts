export const API_ENDPOINT =
  "http://localhost:8000";

type Response = {
    status: number
}

const errorMsg = (res: Response) => {
  if (res.status < 300) return false;
  if (res.status < 400) {
    return `리다이렉트 에러: ${res.status}`;
  }
  if (res.status < 500) {
    return `클라이언트 에러: ${res.status}`;
  }
  if (res.status < 600) {
    return `서버 에러: ${res.status}`;
  }
};

const api = {
  getFetch: async () => {
    try {
      const res = await fetch(`${API_ENDPOINT}`);
      if (res.ok) {
        const data = await res.json();
        return {
          isError: false,
          data: data.data,
        };
      } else {
        const error = errorMsg(res);
        throw error;
      }
    } catch (e) {
      return {
        isError: true,
        data: {
          message: e.message,
          status: e.status,
        },
      };
    }
  },
};
export default api;