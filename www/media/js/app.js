
new Vue ({
    el: '#app',
    data: {
        coin_list: []
    },
    methods:{
        get_coins: function(){
            this.$http.get('https://min-api.cryptocompare.com/data/all/coinlist').then(function(response){
                this.coin_list = response.data;
            }, function(error){
                console.log(error.statusText);
            });
        }
    },
    mounted: function () {
        this.get_coins();
    }
});