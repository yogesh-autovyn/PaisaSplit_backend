export class CommonResponse<T = unknown> {
  status: number;
  error: string | null;
  data: T | null;

  constructor(status: number, data: T | null = null, error: string | null = null) {
    this.status = status;
    this.data = data;
    this.error = error;
  }
}
