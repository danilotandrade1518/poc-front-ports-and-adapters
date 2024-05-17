export interface HttpClienteAdapter<T> {
    post(url: string, body: T): Promise<void>
    get(url: string): Promise<T[]>
    put(url: string, body: T): Promise<void>
    delete(url: string): Promise<T>
}