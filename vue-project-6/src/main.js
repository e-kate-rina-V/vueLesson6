import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/main.css';

// Налаштуйте Pinia як стор.
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');
