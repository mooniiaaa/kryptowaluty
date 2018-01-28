//inicjalizacja obiektu - doczytac !!!
var appk = new Vue ({
    //element - odwolanie do id'ka w htmlu (drzewie dom)
    el: '#app',
    //dane  doczytać !!!
    data: {
        coin_list: [],
        paginate: ['coin_list'],
        histo_prices: {}
    },
    methods:{
        get_coins: function(){
            this.$http.get('https://min-api.cryptocompare.com/data/all/coinlist').then(function(response){
                var tmp = [];
                var resp = response.data.Data;
                for(var elem in resp){
                    tmp.push(resp[elem]);
                };
                this.coin_list = tmp;
            }, function(error){
                console.log(error.statusText);
            });
        },

        get_prices: function(name){
            if (name in this.histo_prices){
                return;
            }
            var url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + name + '&tsym=USD&limit=7'
            this.$http.get(url).then(function(response){
                this.histo_prices[name] = response.data.Data;
                this.$forceUpdate();
            }, function(error){
                console.log(error.statusText);
            });
        }
        
    },
    mounted: function () {
        this.get_coins();
    }
});

//funkcja onclick
var showtr = function(obj){
    
    appk.get_prices(obj.id);
    var hist = obj.getElementsByClassName("trhidden")[0];
    hist.classList.toggle('trvisible');
};