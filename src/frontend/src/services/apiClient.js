import { getCookie } from '@/utils/cookie';

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

  constructor() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (baseUrl === undefined)
      throw new Error('Environment variable VITE_API_BASE_URL missing');
    this.#baseUrl = new URL(baseUrl);
    this.#request = {
      headers: new Headers({
        Authorization: 'Bearer ' + getCookie('token'),
      }),
      mode: 'cors',
    };
  }

  #_getUrl(path, params) {
    const url = new URL(this.#baseUrl);
    url.pathname = path;
    if (params !== undefined)
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.append(key, value),
      );
    return url;
  }

  async Get(path, params) {
    const requestUrl = this.#_getUrl(path, params);
    const response = await fetch(requestUrl, this.#request);
    const returnResp = new ApiResponse(response.status);
    if (response.ok) {
      try {
        returnResp.value = await response.json();
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
    return returnResp;
  }

  async Post(path, data) {
    const req = {
      ...this.#request,
      body: JSON.stringify(data),
      method: 'POST',
    };
    const requestUrl = this.#_getUrl(path);
    const response = await fetch(requestUrl, req);
    const returnResp = new ApiResponse(response.status);
    if (response.ok) {
      try {
        returnResp.value = await response.json();
      } catch (error) {
        console.error('Error logging in:', error);
      }
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
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
    return returnResp;
  }
}
