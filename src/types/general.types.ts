export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
export interface Base {
  id: number;
  createdAt?: string;
  updatedAt: string;
}

export interface BaseCreator extends Base {
  createdBy?: string;
  updatedBy?: string;
}
