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
    filters:{
        timestamp_to_date: function(ts) {
            var new_date = new Date(ts*1000);
            return new_date.toLocaleDateString("pl");
        }
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

        get_prices: function(name, event){
			var caller = event.currentTarget;    //odwolanie do obiektu ktory wywolal fukcje
            if (name in this.histo_prices){      // sprawdzenie czy nie ma juz tych danych
				this.toggle_visibility(caller);  // wywolanie metody ktora ma za zadanie pokazac/ukryc dodatkowa tabelke
			} else {
				var url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + name + '&tsym=USD&limit=7'  // generowanie linka do api
				this.$http.get(url).then(function(response){    // wyslanie zapytania 
					this.histo_prices[name] = response.data.Data;
					this.$forceUpdate();                        // wymuszenie odswiezenia DOM
					this.$nextTick(function(){                  // wyczekanie od nastepnego odswiezenia
						this.toggle_visibility(caller)          // wywolanie metody ktora ma za zadanie pokazac/ukryc dodatkowa tabelke
					});
				}, function(error){
					alert(error.statusText);
				}); 
            }
        },
		
		toggle_visibility: function(obj){
			var tmp = obj.getElementsByClassName("subtable")[0];  // wyszukanie w obiekcie dodatkowej tabelki
			tmp.classList.toggle('trhidden');                     // usuniecie/dodanie klasy do tabelki
		}
    },
    mounted: function () {
        this.get_coins();
    }
});
