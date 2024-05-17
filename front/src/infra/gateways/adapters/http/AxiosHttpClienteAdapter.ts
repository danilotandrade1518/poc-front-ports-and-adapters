import axios from "axios";
import type { HttpClienteAdapter } from "./HttClientAdapter";

export class AxiosHttpClienteAdapter<T> implements HttpClienteAdapter<T> {
    async post(url: string, body: T): Promise<void> {
        await axios.post(url, body);
    }

    async get(url: string): Promise<T[]> {
        return (await axios.get(url)).data;
    }

    async put(url: string, body: T): Promise<void> {
        await axios.put(url, body);
    }

    async delete(url: string): Promise<T> {
        return await axios.delete(url);
    }
}