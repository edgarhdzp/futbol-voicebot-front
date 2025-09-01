// main.ts
import { createApp } from "vue"
import { createPinia } from "pinia"
import i18n from './plugins/i18n'
import App from "./App.vue"

import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

import router from "./router"

const vuetify = createVuetify({ components, directives })
const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(i18n)
app.use(router)

app.mount("#app")