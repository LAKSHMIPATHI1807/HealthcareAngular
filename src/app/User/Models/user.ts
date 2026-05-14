export interface RegisterUser {
    username: string;
    password: string;
    role: string;
}

export interface LoginUser {
    username: string;
    password: string;
}

export interface ReadUser {
    id: number;
    username: string;
    role: string;
}

export interface LoginResponse {
  username: string;
  password: string; // actually JWT token
}

export interface TokenPayLoad {
    name: string;
    role: string;
    exp:number;
}