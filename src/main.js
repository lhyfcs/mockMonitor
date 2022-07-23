// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import 'signalr'

import { Select, Option, Slider } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './css/main.css'
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Slider.name, Slider);

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
