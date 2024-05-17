import type { GetTrainingsGateway } from './../../../protocols/gateways/training/GetTrainingsGateway';

import type { Training } from '../../../protocols/gateways/training/shared/Training';
import type { HttpClienteAdapter } from '../adapters/http/HttClientAdapter';

export class HttpGetTrainingsGateway implements GetTrainingsGateway {
    constructor(
        private readonly baseUrl: string,
        private readonly httpClientAdapter: HttpClienteAdapter<Training>
    ){}

    async get(): Promise<Training[]> {
        return await this.httpClientAdapter.get(this.baseUrl);
    }
}