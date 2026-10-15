import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import { i18n } from "./plugins/i18n";
import { queryPlugin } from "./plugins/query";
import { router } from "./router";
import "./style.css";

createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .use(queryPlugin.plugin, queryPlugin.options)
  .mount("#app");
