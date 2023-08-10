// 全局文件入口
// import './assets/main.css'
import "./assets/js/jquery-1.10.2.min.js";
import "./assets/js/bootstrap.min.js";
// import "./assets/js/modernizr.min.js";
import "./assets/js/iCheck/jquery.icheck.js";
import "./assets/js/icheck-init.js";
import "./assets/js/jquery.nicescroll.js";
// import "./assets/js/newImport/moment.min.js";
// import "./assets/js/scripts.js";
// import "./assets/js/axios.min.js";
import "./assets/css/style-responsive.css";
  import "./assets/css/style.css";
  import "./assets/js/iCheck/skins/flat/green.css";



import { createApp } from 'vue'

// 导入根组件
import App from './App.vue'


// 创建实例
const app = createApp(App)

// 使用router，在实例加载后，挂载前
import router from './router'
import request from './utils/request'
app.use(router)

// 挂载
app.mount('#app')

// 创建实例，并挂载到 index.html 中 id为 app 的标签上
// createApp(App).mount('#app')

// 全局挂载
app.config.globalProperties.$axios = request
