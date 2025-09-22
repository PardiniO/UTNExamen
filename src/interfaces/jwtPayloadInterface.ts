export interface IJwtPayload {
    id: number;
    email: string;
    rol: 'user' | 'admin' | 'superAdmin';
}

export interface IAuthenticatedReq extends IJwtPayload {
    user?: IJwtPayload;
}