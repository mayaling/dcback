//import Vue from 'vue';
import App from './App';
import router from './router';
import G2 from '@antv/g2'
//import axios from 'axios';
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
//import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import dayjs from 'dayjs';
import { postData, geteData, patchData, putData, delData } from './http';

// Vue.prototype.HOME = '/api'
Vue.use(ELEMENT, { size: 'medium' });
Vue.prototype.$axios = axios;

Vue.prototype.$dayjs = dayjs;
Vue.prototype.$post = postData;
Vue.prototype.$get = geteData;
Vue.prototype.$patch = patchData;
Vue.prototype.$put = putData;
Vue.prototype.$del = delData;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    var role = localStorage.getItem('userInfo');
    if (!role && to.path !== '/login') {
        if (to.meta.outPage) {
            next();
        } else {
            next('/login');
        }
    } else if (role && to.meta.admin && JSON.parse(role).role == 'student') {
        next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');