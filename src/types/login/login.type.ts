export interface Login {
    username: string;
    password: string;
}

export interface LoginResponse {
    data:{
        accessToken: string;
        refreshToken: string;
    },
    status: number;
}

export interface NewAccessTokenResponse extends Response{
    data: {
        accessToken:string
    }
}