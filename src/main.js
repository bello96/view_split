import Vue from 'vue'
import App from './App.vue'
import ViewSplit from 'view-split';

Vue.config.productionTip = false
Vue.use(ViewSplit)

new Vue({
  render: h => h(App),
}).$mount('#app')
