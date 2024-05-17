import type { Training } from "./shared/Training";

export interface AddTrainingGateway {
    add (training: Training): Promise<void>;
}