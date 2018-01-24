var app = new Vue({
    el: '#app',
    data: {
      CoinList: ['la', 'lal', 'lala'],
      PriceHistorical: ['aa', 'aaa', 'aaaa']
    }
  })


  var app = new Vue({
    el: '#weather',

    data: {
        getTemp: []
    },

    created: function () {
        this.fetchData();
    },        

    methods: {
        fetchData: function () {
            this.$http.get('')
                      .then(response => {
                         this.getTemp = response.data
                         // or like this this.getTemp = response.json()
                      })
        }
    }

})
;