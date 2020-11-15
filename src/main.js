import Vue from 'vue'
//import VueResource from 'vue-resource';
import VueResource from 'vue-resource';

Vue.use(VueResource)
//Vue.use(require('vue-resource'));
import App from './App.vue'
import firstPage from './components/firstPage.vue'

Vue.config.productionTip = false
//import VueRouter from 'vue-router';


//Vue.use(VueRouter);
Vue.component('first-Page', firstPage);
//Vue.component('home-Page', homePage);

/*const router = new VueRouter( {
  routes: [
    {path:'/', component:homePage},
    {path:'/firstPage',component:firstPage}
    
    
  ]
});*/
new Vue({
 //router,
  render: h => h(App),
}).$mount('#app')

