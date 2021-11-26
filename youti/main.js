import Vue from 'vue'
import App from './App'

import tools from "./common/js/util";
import apis from './common/api/apis.js';

// import uView from "uview-ui";
import uView from '@/uni_modules/uview-ui'
Vue.use(uView);

Vue.prototype.$tools = tools;
Vue.prototype.$apis = apis;

import AppFooter from './components/AppFooter'
Vue.component("AppFooter", AppFooter)



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
