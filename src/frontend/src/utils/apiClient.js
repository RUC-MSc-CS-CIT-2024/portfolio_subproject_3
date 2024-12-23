import { getCookie } from '@/utils';

export class ApiResponse {
  value;
  statusCode;

  constructor(status) {
    this.statusCode = status;
  }
  get ok() {
    return this.statusCode < 400;
  }
}

export class ApiClient {
  #baseUrl;
  #request;

  constructor(baseUrl, accessKey, options) {
    const url = baseUrl ?? import.meta.env.VITE_API_BASE_URL;
    if (url === undefined)
      throw new Error('Environment variable VITE_API_BASE_URL missing');
    this.#baseUrl = new URL(url);

    this.#request = {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    };

    const token = accessKey ?? getCookie('token');
    if (token !== undefined) {
      this.#request.headers.set('Authorization', `Bearer ${token}`);
    }

    if (options !== undefined) {
      if (options.headers !== undefined) {
        for (const [key, value] of Object.entries(options.headers)) {
          this.#request.headers.set(key, value);
        }
      }
    }
  }

  // params format: [{key: 'key1', value: 'value1'}, {key: 'key2', value: 'value2'}]
  #_getUrl(path, params) {
    const url = new URL(path, this.#baseUrl);
    if (params !== undefined)
      for (const param of params) {
        url.searchParams.append(param.key, param.value);
      }
    return url;
  }

  async Get(path, params) {
    const requestUrl = this.#_getUrl(path, params);
    const response = await fetch(requestUrl, this.#request);
    const returnResp = new ApiResponse(response.status);
    if (response.ok) {
      try {
        returnResp.value = await response.json();
      } catch {} // eslint-disable-line no-empty
    }
    return returnResp;
  }

  async Post(path, data, params) {
    const req = {
      ...this.#request,
      method: 'POST',
    };

    if (data !== undefined) {
      req.body = JSON.stringify(data);
    }

    const requestUrl = this.#_getUrl(path, params);
    const response = await fetch(requestUrl, req);
    const returnResp = new ApiResponse(response.status);
    if (response.ok) {
      try {
        returnResp.value = await response.json();
      } catch {} // eslint-disable-line no-empty
    }
    return returnResp;
  }

  async Patch(path, data) {
    const req = {
      ...this.#request,
      body: JSON.stringify(data),
      method: 'PATCH',
    };
    const requestUrl = this.#_getUrl(path);
    const response = await fetch(requestUrl, req);
    const returnResp = new ApiResponse(response.status);
    if (response.ok) {
      try {
        returnResp.value = await response.json();
      } catch {} // eslint-disable-line no-empty
    }
    return returnResp;
  }

  async Delete(path) {
    const req = {
      ...this.#request,
      method: 'DELETE',
    };
    const requestUrl = this.#_getUrl(path);
    const response = await fetch(requestUrl, req);
    const returnResp = new ApiResponse(response.status);
    if (response.ok) {
      try {
        const text = await response.text();
        if (text) {
          returnResp.value = JSON.parse(text);
        }
      } catch (error) {
        console.error('Error parsing response:', error);
      }
    }
    return returnResp;
  }
}
