export interface IRespuestaAPI<T> {
    success: boolean;
    data?: T | number;
    message: string;
}