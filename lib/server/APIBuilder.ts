import axios, { AxiosResponse } from "axios";

type EndpointFunction = (...args: any[]) => string;

export default class APIBuilder<RequestData = any, ResponseData = any> {
  private method: string = "GET";
  private baseUrl: string;
  private resource: string = "";
  private headers: Record<string, string> = {};
  private data?: RequestData;
  private queryParams: Record<string, string | number> = {};
  private responseType: "arraybuffer" | "blob" | "document" | "json" | "text" | "stream" = "json";
  private endpointFn: EndpointFunction | null = null;

  constructor(baseUrl: string, private token?: string) {
    this.baseUrl = baseUrl;

    if (this.token) {
      this.headers.Authorization = `Bearer ${this.token}`;
    }
  }

  setEndpoint(endpointFn: EndpointFunction, ...args: any[]): this {
    this.endpointFn = endpointFn;
    this.resource = this.endpointFn(...args);
    return this;
  }

  get(): this {
    this.method = "GET";
    return this;
  }

  post(data: RequestData): this {
    this.method = "POST";
    this.data = data;
    return this;
  }

  put(data: RequestData): this {
    this.method = "PUT";
    this.data = data;
    return this;
  }

  delete(): this {
    this.method = "DELETE";
    return this;
  }

  patch(data: RequestData): this {
    this.method = "PATCH";
    this.data = data;
    return this;
  }

  setQueryParameters(params: Record<string, string | number>): this {
    this.queryParams = { ...this.queryParams, ...params };
    return this;
  }

  setToken(token: string): this {
    this.headers.Authorization = `Bearer ${token}`;
    return this;
  }

  setResponseType(type: "arraybuffer" | "blob" | "document" | "json" | "text" | "stream"): this {
    this.responseType = type;
    return this;
  }

  async execute(): Promise<AxiosResponse<ResponseData>> {
    this.validateRequestComponents();

    try {
      return await axios({
        method: this.method,
        url: `${this.baseUrl}${this.resource}`,
        data: this.data,
        headers: this.headers,
        params: this.queryParams,
        responseType: this.responseType,
      });
    } catch (error) {
      throw error;
    }
  }

  private validateRequestComponents(): void {
    if (!this.baseUrl) {
      throw new Error("Base URL is missing.");
    }

    if (this.endpointFn === null) {
      throw new Error("Endpoint function is missing. Use setEndpoint() to set it.");
    }
  }
}
