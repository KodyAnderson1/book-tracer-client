"use client";

import axios, { AxiosResponse } from "axios";

/**
 * Type alias for a function that generates endpoint URLs based on arguments.
 */
type EndpointFunction = (...args: any[]) => string;

/**
 * Generic class to build API requests.
 *
 * @typeparam RequestData - The data type for the request payload.
 * @typeparam ResponseData - The data type for the response payload.
 */
export default class APIBuilder<RequestData = any, ResponseData = any> {
  /** HTTP method for the request, default is 'GET'. */
  private method: string = "GET";

  /** Base URL for the API. */
  private baseUrl: string;

  /** API resource path, default is an empty string. */
  private resource: string = "";

  /** Object to store request headers. */
  private headers: Record<string, string> = {};

  /** Request payload data. */
  private data?: RequestData;

  /** Object to store query parameters. */
  private queryParams: Record<string, string | number> = {};

  /** Expected type of the response, default is 'json'. */
  private responseType: "arraybuffer" | "blob" | "document" | "json" | "text" | "stream" = "json";

  /** Function to generate resource path based on arguments. */
  private endpointFn: EndpointFunction | null = null;

  /**
   * Class constructor.
   *
   * @param baseUrl - Base URL for the API.
   * @param token - Optional Bearer token for authentication.
   *
   * @example
   *
   * ```typescript
   * const apiBuilder = new APIBuilder('https://api.example.com', 'your-token-here');
   * ```
   */
  constructor(baseUrl: string, private token?: string) {
    this.baseUrl = baseUrl;

    if (this.token) {
      this.headers.Authorization = `Bearer ${this.token}`;
    }
  }

  /**
   * Sets the endpoint function to generate the resource path.
   *
   * @example
   *
   * ```typescript
   * apiBuilder.setEndpoint((userId) => `/users/${userId}`, 1);
   * ```
   *
   * @param endpointFn - Function to generate resource path.
   * @param args - Arguments to pass to the endpoint function.
   * @returns this - Allows method chaining.
   */
  setEndpoint(endpointFn: EndpointFunction, ...args: any[]): this {
    this.endpointFn = endpointFn;
    this.resource = this.endpointFn(...args);
    return this;
  }

  /**
   * Sets the HTTP method to 'GET'.
   *
   * @example
   *
   * ```typescript
   * apiBuilder.get().execute();
   * ```
   *
   * @returns this - Allows method chaining.
   */
  get(): this {
    this.method = "GET";
    return this;
  }

  /**
   * Sets the HTTP method to 'POST' and sets the request payload.
   *
   * @example
   *
   * ```typescript
   * apiBuilder.post({ key: 'value' }).execute();
   * ```
   *
   * @param data - Request payload.
   * @returns this - Allows method chaining.
   */
  post(data: RequestData): this {
    this.method = "POST";
    this.data = data;
    return this;
  }

  /**
   * Sets the HTTP method to 'PUT' and sets the request payload.
   *
   * @example
   *
   * ```typescript
   * apiBuilder.put({ key: 'new-value' }).execute();
   * ```
   *
   * @param data - Request payload.
   * @returns this - Allows method chaining.
   */
  put(data: RequestData): this {
    this.method = "PUT";
    this.data = data;
    return this;
  }

  /**
   * Sets the HTTP method to 'DELETE'.
   *
   * @example
   *
   * ```typescript
   * apiBuilder.delete().execute();
   * ```
   *
   * @returns this - Allows method chaining.
   */
  delete(): this {
    this.method = "DELETE";
    return this;
  }

  /**
   * Sets the HTTP method to 'PATCH' and sets the request payload.
   *
   * @example
   *
   * ```typescript
   * apiBuilder.patch({ key: 'patched-value' }).execute();
   * ```
   *
   * @param data - Request payload.
   * @returns this - Allows method chaining.
   */
  patch(data: RequestData): this {
    this.method = "PATCH";
    this.data = data;
    return this;
  }

  /**
   * Sets query parameters for the request.
   *
   * @param params - An object containing key-value pairs representing query parameters.
   * @returns this - Allows method chaining.
   *
   * @example
   *
   * ```typescript
   * apiBuilder.setQueryParameters({ page: 1, limit: 10 });
   * ```
   */
  setQueryParameters(params: Record<string, string | number>): this {
    this.queryParams = { ...this.queryParams, ...params };
    return this;
  }

  /**
   * Sets the Bearer token for the request.
   *
   * @example
   *
   * ```typescript
   * apiBuilder.setToken('new-token-here');
   * ```
   *
   * @param token - Bearer token for authentication.
   * @returns this - Allows method chaining.
   */
  setToken(token: string): this {
    this.headers.Authorization = `Bearer ${token}`;
    return this;
  }

  /**
   * Sets the expected response type.
   *
   * @param type - Expected response type.
   * @returns this - Allows method chaining.
   */
  setResponseType(type: "arraybuffer" | "blob" | "document" | "json" | "text" | "stream"): this {
    this.responseType = type;
    return this;
  }

  /**
   * Executes the API request.
   *
   * This method validates the request components, then sends the API request
   * according to the configurations set on this instance. It returns a promise
   * that resolves to an AxiosResponse object containing the response data.
   *
   * @throws {Error} Will throw an error if base URL or endpoint function is missing.
   *
   * @returns {Promise<AxiosResponse<ResponseData>>} - Promise that resolves to an AxiosResponse.
   *
   * @example
   *
   * ```typescript
   * const response = await apiBuilder.execute();
   * ```
   */
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

  /**
   * Validates the request components.
   *
   * @private
   * @throws {Error} Will throw an error if base URL or endpoint function is missing.
   */
  private validateRequestComponents(): void {
    if (!this.baseUrl) {
      throw new Error("Base URL is missing.");
    }

    if (this.endpointFn === null) {
      throw new Error("Endpoint function is missing. Use setEndpoint() to set it.");
    }
  }
}
