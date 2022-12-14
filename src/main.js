import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import _ from "lodash";

// import SerialPort from 'serialport';
let app = createApp(App);
app.config.globalProperties._ = _;

app.use(store).use(router).mount("#app");
