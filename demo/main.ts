import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { installHistory } from "../src/index";
createApp(App)
    .use(router)
    .mount("#app");
installHistory(router);
