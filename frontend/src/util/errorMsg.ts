type Response = {
  status: number
  message: string
}

export const errorMsg = (res: Response): string => {
  if (res.status < 300) {
    return `에러: ${res.message}`;
  }
  else if (res.status < 400) {
    return `리다이렉트 에러: ${res.message}`;
  } else if (res.status < 500) {
    return `오류 : ${res.message}`;
  } else if (res.status < 600) {
    return `서버 에러: ${res.message}`;
  } else {
    return ''
  }
};

