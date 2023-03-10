import { createApp } from "vue";
import App from "./App.vue";
import Pocketbase from "pocketbase";
import "./assets/main.css";
import { createPinia } from "pinia";
import router from "./routes/route";

const pb = new Pocketbase("http://127.0.0.1:8090");
export default pb;
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
