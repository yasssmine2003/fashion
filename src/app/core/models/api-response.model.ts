export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: ApiError;
  }
  
  export interface ApiError {
    code: string;
    message: string;
    details?: any;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
  }
  
  export interface PaginationMeta {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }
  
  export interface ValidationError {
    field: string;
    message: string;
  }