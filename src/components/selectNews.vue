 <select name="country" @change="sourceChanged">
    <option v-for="(source,index) in sources" :key="index" :value="source.name">{{source.name}}</option>
  </select>

  <div v-if="source" class="selectFooter">
    <p class="vendor-information">
      {{ source.description }}
  </p>
    <p class="controls">
      <a class="button is-primary" target="_blank" :href="source.url">
        Visit Vendor's Website
      </a>
    </p>
  </div>
<script>
  import VueResource from 'vue-resource';
  import Vue from 'vue';
  import App from '../App.vue';
  window.Vue = Vue;
  Vue.use(VueResource);
  export default {
    name: 'selectNews',
    data () {
      return {
        description: '',
        sources: [],
        source: ''
      }
    },
    methods: {
      sourceChanged: function (evt) {
        var that = this;
        Object.values(this.sources).map(function (elem, index) {
          if (elem.name == evt.target.value) {
            that.source = elem;
          }
        });
        this.$emit('newVendor', this.source.id);
      }
    },
    created: function () {
      this.$http.get('https://newsapi.org/v1/sources?language=en')
        .then(function (response) {
          if (response.body.status != 'ok') {
            throw new Error('Could not fetch the list of supported sources');
          }
          return JSON.parse(response.bodyText);
        }).then(function (response) {
        this.sources = response.sources;
      }).catch(function (err) {
        console.log(err.stack);
      });
    }
  }
</script>
