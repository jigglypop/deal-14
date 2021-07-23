type HeaderTypes = { [key: string]: string };

type OptionTypes = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: HeaderTypes;
}

type BaseResponse = {
  status: number;
  headers: string;
  response: string;
}

const xhr = (url: string, options: OptionTypes): Promise<BaseResponse> => {
  return new Promise((resolve, reject) => {
    const { method, body, headers } = options;

    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    if (headers !== undefined) {
      for (const key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }

    xhr.onload = () => {
      const { response, status } = xhr;
      const headers = xhr.getAllResponseHeaders();

      if (status < 300) {
        resolve({
          status,
          response,
          headers,
        });
      } else {
        reject({
          status,
          response,
          headers,
        });
      }
    }

    xhr.send(body);
  })
}

export default xhr;