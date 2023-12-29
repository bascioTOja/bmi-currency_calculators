import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import $ from "jquery";
window.jQuery = window.$ = $;

createApp(App).mount('#app');
