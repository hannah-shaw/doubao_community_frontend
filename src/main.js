import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/app.css'
import './assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import format from 'date-fns/format'
import '@/permission'
import relativeTime from 'dayjs/plugin/relativeTime';

//处理相对时间
import 'dayjs/locale/zh-cn'
const dayjs = require('dayjs');

import echarts from "echarts"


//省市区级联选择器
import VueAreaLinkage from 'vue-area-linkage';

Vue.use(VueAreaLinkage)

// 相对时间插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // use locale globally
dayjs().locale('zh-cn').format() // use locale in a specific instance

Vue.prototype.dayjs = dayjs;//可以全局使用dayjs

Vue.filter('date', (date) => {
  return format(new Date(date), 'yyyy-MM-dd')
})

Vue.use(Buefy)
Vue.use(ElementUI);


Vue.use(BMap, {
  // ak 是在百度地图开发者平台申请的** 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'm6hbNoEYyz8YrEzAL7oh3RL2RYE6gGKf'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
