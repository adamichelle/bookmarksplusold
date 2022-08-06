import { createAuth0 } from '@auth0/auth0-vue'
import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import store from './store'
import router from './router'
import App from './App.vue'

const app = createApp(App)
const Router = router({ store });

app.use(store).use(Router)
app.use(
  createAuth0({
    domain: process.env.VUE_APP_AUTH0_DOMAIN,
    client_id: process.env.VUE_APP_AUTH0_CLIENT_ID,
    redirect_uri: `${window.location.origin}`,
    responseType: 'id_token token',
  })
);

app.mount('#app')
