import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { AxiosHttpClienteAdapter } from './infra/gateways/adapters/http/AxiosHttpClienteAdapter'
import { HttpGetTrainingsGateway } from './infra/gateways/training/GetTrainingsGateway'
import type { Training } from './protocols/gateways/training/shared/Training'
import { HttpAddTrainingGateway } from './infra/gateways/training/HttpAddTrainingGateway'
import { HttpUpdateTrainingGateway } from './infra/gateways/training/UpdateTrainingGateway'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const axiosHttpClienteAdapter = new AxiosHttpClienteAdapter<Training>();

const trainingBaseUrl = 'http://localhost:5000'
const httpGetTrainingsGateway = new HttpGetTrainingsGateway(trainingBaseUrl, axiosHttpClienteAdapter);
const httpAddTrainingsGateway = new HttpAddTrainingGateway(trainingBaseUrl, axiosHttpClienteAdapter);
const httpUpdateTrainingsGateway = new HttpUpdateTrainingGateway(trainingBaseUrl, axiosHttpClienteAdapter);

app.provide("getTrainingsGateway", httpGetTrainingsGateway);
app.provide("addTrainingGateway", httpAddTrainingsGateway);
app.provide("updateTrainingGateway", httpUpdateTrainingsGateway);

app.mount('#app')
