export interface IRespuestaAPI<T> {
    success: boolean;
    data?: T;
    message: string;
}