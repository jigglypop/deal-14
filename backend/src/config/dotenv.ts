const load = (key: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`환경변수 ${key}가 설정되지 않았습니다`);
  }

  return value;
}

const dotenv = {
  PORT: load('PORT'),
  MYSQL_DB: load('MYSQL_DB'),
  MYSQL_HOST: load('MYSQL_HOST'),
  MYSQL_PORT: load('MYSQL_PORT'),
  MYSQL_USERNAME: load('MYSQL_USERNAME'),
  MYSQL_PASSWORD: load('MYSQL_PASSWORD'),
};

export default dotenv;
