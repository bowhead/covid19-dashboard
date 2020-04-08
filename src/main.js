import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ArgonDashboard from './plugins/argon-dashboard'
import i18n from './i18n/i18n'
import store from './store/store'
import DateRangePicker from "@gravitano/vue-date-range-picker";

Vue.config.productionTip = false

Vue.use(DateRangePicker)

Vue.use(ArgonDashboard)

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')