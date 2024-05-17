import type { Training } from "./shared/Training";

export interface GetTrainingsGateway {
    get (): Promise<Training[]>;
}