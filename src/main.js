import Vue from 'vue'
import App from './App.vue'
import router from './router'
import jQuery from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.css'
import './assets/app.scss';
import { rtdbPlugin } from 'vuefire'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfo, faEdit, faTrash, faSpinner, faMapSigns, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue2Filters from "vue2-filters";

window.$ = window.jQuery = jQuery;
Vue.use(rtdbPlugin);
Vue.use(Vue2Filters);
library.add(faInfo, faEdit, faTrash, faSpinner, faMapSigns, faPlus);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.config.productionTip = false

let app;

if (!app) {
    app = new Vue({
        router,
        render: h => h(App),

    }).$mount('#app')
}
