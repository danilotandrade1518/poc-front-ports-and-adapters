<script setup lang="ts">
import type { AddTrainingGateway } from "@/protocols/gateways/training/AddTrainingGateway";
import type { GetTrainingsGateway } from "@/protocols/gateways/training/GetTrainingsGateway";
import type { UpdateTrainingGateway } from "@/protocols/gateways/training/UpdateTrainingGateway";
import type { Training } from "@/protocols/gateways/training/shared/Training";
import { inject, onMounted, ref } from 'vue';

const getTrainingsGateway = inject("getTrainingsGateway") as GetTrainingsGateway;
const addTrainingGateway = inject("addTrainingGateway") as AddTrainingGateway;
const updateTrainingGateway = inject("updateTrainingGateway") as UpdateTrainingGateway;

const trainings = ref<Training[]>([]);

const selectedTraining = ref<Training | null>(null);

const trainingIsScheduled = (training: Training) => training.schedule?.date;

const fetchTrainings = async () => {
  trainings.value = (await getTrainingsGateway.get());
};

onMounted(async () => {
  await fetchTrainings();
});

const newTrainingName = ref('');
const addTraining = async () => {
  const name = newTrainingName.value;
  const id = Math.random().toString(36).slice(2, 7);
  const newTraining: Training = { id, name, schedule: { date: null } };

  trainings.value.push(newTraining);

  await addTrainingGateway.add(newTraining);
  await fetchTrainings();
};

const selectTraining = (training: Training) => {
  selectedTraining.value = {
    id: training.id,
    name: training.name,
    schedule: {
      date: training.schedule.date
    }
  };
};

const scheduleTraining = async () => {
  if (!selectedTraining.value) return;

  const trainingToUpdate: Training | undefined = trainings.value.find(t => t.id === selectedTraining.value?.id);
  if (trainingToUpdate) {
    trainingToUpdate.schedule.date = selectedTraining.value.schedule.date;
    await updateTrainingGateway.update(trainingToUpdate);
  }

  selectedTraining.value = null;
};
</script>

<template>
  <div>
    <h1>Novo treinamento</h1>

    <input type="text" v-model="newTrainingName" placeholder="Nome do treinamento" />
    <button @click="addTraining()">Adicionar</button>
  </div>

  <div>
    <h1>Treinamentos cadastrados</h1>

    <ul>
      <li v-for="training in trainings" :key="training.id" style="margin-bottom: 10px;">
        <span style="margin-right: 5px;">
          {{ training.name }} - {{ trainingIsScheduled(training) ? 'Agendado' : 'Não agendado' }}
        </span>
        <button @click="selectTraining(training)">
          Alterar agendamento
        </button>
      </li>
    </ul>
  </div>

  <div v-if="selectedTraining">
    <h1>Agenda do treinamento - {{ selectedTraining.name }}</h1>
    
    <input type="date" v-model="selectedTraining.schedule.date" placeholder="Data do agendamento" />
    <button @click="scheduleTraining()">Salvar</button>
  </div>
</template>
