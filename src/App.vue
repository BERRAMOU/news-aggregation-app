<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<h1>{{ msg }}</h1>-->
    <!--<h2>Essential Links</h2>-->
    <!--<ul>-->
      <!--<li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>-->
      <!--<li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>-->
      <!--<li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>-->
      <!--<li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>-->
    <!--</ul>-->
    <!--<h2>Ecosystem</h2>-->
    <!--<ul>-->
      <!--<li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>-->
      <!--<li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>-->
      <!--<li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>-->
      <!--<li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>-->
    <!--</ul>-->
    <div class="container" id="main_container">
      <select-news v-on:newVendor="newVendor"/>
      <news :articles="articles"/>
    </div>
  </div>
</template>

<script>
  import Selectnews from './components/selectNews';
  import News from './components/news';
  import VueResource from 'vue-resource';
  import Vue from 'vue';
  import App from './App.vue';
  window.Vue = Vue;
  Vue.use(VueResource);

  export default {
    name: 'app',
    components: {
      'select-news': Selectnews,
      'news': News
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        source: '',
        articles: []
      }
    },
    methods: {
      newVendor: function (value) {
          console.log(value);
        this.source = value;
        this.$http.get('https://newsapi.org/v2/top-headlines?sources=' + this.source + '&apiKey=21825c6b5ae5440ea77947d4ca2d5828'
            .then(function (response) {
                console.log(response);
              return JSON.parse(response.bodyText);
            })
            .then(function (response) {
              this.articles = response.articles;
            })
            .catch(function (err) {
              console.log(err);
            })
        );
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
