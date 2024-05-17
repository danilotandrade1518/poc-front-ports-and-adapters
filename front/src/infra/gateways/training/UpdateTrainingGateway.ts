import type { UpdateTrainingGateway } from './../../../protocols/gateways/training/UpdateTrainingGateway';

import type { Training } from '../../../protocols/gateways/training/shared/Training';
import type { HttpClienteAdapter } from '../adapters/http/HttClientAdapter';

export class HttpUpdateTrainingGateway implements UpdateTrainingGateway {
    constructor(
        private readonly baseUrl: string,
        private readonly httpClientAdapter: HttpClienteAdapter<Training>
    ){}

    async update(training: Training): Promise<void> {
        await this.httpClientAdapter.put(`${this.baseUrl}/${training.id}`, training);
    }
}