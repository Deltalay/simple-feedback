import { createApp } from "vue";
import App from "./App.vue";
import Pocketbase from "pocketbase";
import "./assets/main.css";
const pb = new Pocketbase("http://127.0.0.1:8090");
export default pb;
createApp(App).mount("#app");
