import App from './App.vue'
import Vue from 'vue';
window.Vue = Vue;
new Vue({
  el: '#app',
  render: h => h(App)
})
