const load = (key: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`환경변수 ${key}가 설정되지 않았습니다`);
  }

  return value;
}

const dotenv = {
  PORT: load('PORT'),
};

export default dotenv;
