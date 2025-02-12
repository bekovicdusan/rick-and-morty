import { createApp } from "vue";
import "./style.css";
import router from "./router";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";

library.add(faSearch);

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
