export interface User {
    id: number;
    email: string;
    password?: string; // Optional car on ne renvoie jamais le password
    firstName: string;
    lastName: string;
    role: UserRole;
    phone?: string;
    avatar?: string;
    createdAt: string;
  }
  
  export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
    expiresIn: number; // Timestamp d'expiration
  }
  
  export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
  }