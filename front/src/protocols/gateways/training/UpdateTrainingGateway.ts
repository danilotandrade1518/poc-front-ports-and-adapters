import type { Training } from "./shared/Training";

export interface UpdateTrainingGateway {
    update (training: Training): Promise<void>;
}