import { AxiosResponse } from "axios";

export interface ErrorResponse {
  errorCode: string;
  errorMessage: string;
  errorId: string;
}

export class APIErrorHandler<T extends object = any> {
  private response: AxiosResponse<T | ErrorResponse>;

  constructor(response: AxiosResponse<T | ErrorResponse>) {
    this.response = response;
  }

  /**
   * Handles the API response to check if it contains an error.
   *
   * @returns {ErrorResponse | null} - Returns an ErrorResponse if an error exists, otherwise null.
   */
  handle(): ErrorResponse | null {
    if (this.isErrorResponse(this.response.data)) {
      return this.response.data;
    }
    return null;
  }

  /**
   * Type guard to check if a response is an ErrorResponse.
   *
   * @param data - The response data to check.
   * @returns {boolean} - Returns true if data is an ErrorResponse, otherwise false.
   */
  private isErrorResponse(data: T | ErrorResponse): data is ErrorResponse {
    if (typeof data === "object" && data !== null) {
      return "errorCode" in data && "errorMessage" in data && "errorId" in data;
    }
    return false;
  }
}
