import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/tailwind.css";
const app = createApp(App);
const pinia = createPinia();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => {
          console.log('Service worker registered.', reg);
        });
    });
  }

app.use(pinia);
app.use(router);
app.mount("#app");
