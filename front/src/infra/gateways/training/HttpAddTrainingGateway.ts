import type { Training } from '../../../protocols/gateways/training/shared/Training';
import type { HttpClienteAdapter } from '../adapters/http/HttClientAdapter';
import type { AddTrainingGateway } from './../../../protocols/gateways/training/AddTrainingGateway';

export class HttpAddTrainingGateway implements AddTrainingGateway {
    constructor(
        private readonly baseUrl: string,
        private readonly httpClientAdapter: HttpClienteAdapter<Training>
    ){}

    async add(training: Training): Promise<void> {
        await this.httpClientAdapter.post(this.baseUrl, training);
    }
}