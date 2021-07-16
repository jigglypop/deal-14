type Response = {
    status: number
}

export const errorMsg = (res: Response): string => {
  if (res.status < 300) {
    return `에러: ${res.status}`;
  };
  if (res.status < 400) {
    return `리다이렉트 에러: ${res.status}`;
  }
  if (res.status < 500) {
    return `클라이언트 에러: ${res.status}`;
  }
  if (res.status < 600) {
    return `서버 에러: ${res.status}`;
  } else {
    return ''
  }
};

