// src/utils/api-response.ts DS
export class ApiResponse<T = any> {
  success: boolean;
  data: T | undefined;
  message: string | undefined;
  error: string | undefined;
  statusCode: number;

  private constructor(
    success: boolean,
    statusCode: number,
    data?: T,
    message?: string,
    error?: string
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.error = error;
  }

  static success<T>(
    data: T,
    message = 'Success',
    statusCode = 200
  ): ApiResponse<T> {
    return new ApiResponse(true, statusCode, data, message);
  }

  static error(
    message: string,
    statusCode = 500,
    error?: string
  ): ApiResponse<null> {
    return new ApiResponse<null>(false, statusCode, null, message, error);
  }

  toJSON() {
    return {
      success: this.success,
      statusCode: this.statusCode,
      ...(this.data !== undefined && { data: this.data }),
      ...(this.message && { message: this.message }),
      ...(this.error && { error: this.error }),
    };
  }
}
