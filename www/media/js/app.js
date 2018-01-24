// var app = new Vue({
//     el: '#app',
//     data: {
//       CoinList: ['la', 'lal', 'lala'],
//       PriceHistorical: ['aa', 'aaa', 'aaaa']
//     }
//   })


import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

  var app = new Vue({
    el: '#app',

    data: {
        coin_list: []
    },

    created: function () {
        this.fetchData();
    },        

    methods: {
        fetchData: function () {
            this.$http.get('https://www.cryptocompare.com/api/data/coinlist/')
                .then(response => {
                    this.coin_list = response.data
                    // or like this this.coin_list = response.json()
                })
        }
    }
});