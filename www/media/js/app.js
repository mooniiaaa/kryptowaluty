var appk = new Vue ({
    // element - odwolanie do id'ka w htmlu - kod sie wykona w obrebie ID app
    el: '#app',
    data: {
        coin_list: [],           // tutaj tablica z lista kryptowalut
        paginate: ['coin_list'], // paginacja dla listy powyzej
        histo_prices: {}         // ceny historyczne
    },
    // filtry 
    filters:{
        timestamp_to_date: function(ts){
            var new_date = new Date(ts*1000);         // tutaj nastepuje zamiana wartosci liczbowej na date
            return new_date.toLocaleDateString("pl"); // zwracanie obiektu Date, konwersja na string
        }
    },
    // funkcje
    methods:{
        get_coins: function(){ 
            // metoda pobierajaca wstepne dane (liste kryptowalut)
            this.$http.get('https://min-api.cryptocompare.com/data/all/coinlist').then(function(response){ // zapytanie do API 
                var tmp = [];
                var resp = response.data.Data;
                for(var elem in resp){      // konwersja obiektu na liste obiektow
                    tmp.push(resp[elem]);
                };
                this.coin_list = tmp;       // przypisanie listy tymczasowej tmp do utworzonej tablicy coin_list (w "data")
            }, function(error){
                alert(error.statusText);    // error jezeli API zwroci blad
            });
        },

        get_prices: function(name, event){
            // metoda pobierajaca historyczne ceny
			var caller = event.currentTarget;    // odwolanie do obiektu ktory wywolal fukcje
            if (name in this.histo_prices){      // sprawdzenie czy dane byly juz pobrane
				this.toggle_visibility(caller);  // wywolanie metody ktora ma za zadanie pokazac/ukryc dodatkowa tabelke
			} else { // jesli nie ma danych
				var url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + name + '&tsym=USD&limit=7'  // generowanie linka do API
				this.$http.get(url).then(function(response){  // wyslanie zapytania do API
					this.histo_prices[name] = response.data.Data;
					this.$forceUpdate();                      // wymuszenie odswiezenia DOM
					this.$nextTick(function(){                // wyczekanie od nastepnego odswiezenia
						this.toggle_visibility(caller)        // wywolanie metody ktora ma za zadanie pokazac/ukryc dodatkowa tabelke
					});
				}, function(error){
					alert(error.statusText);
				}); 
            }
        },
		
		toggle_visibility: function(obj){
			var tmp = obj.getElementsByClassName("subtable")[0];  // wyszukanie w obiekcie "pod-tabelki"
			tmp.classList.toggle('trhidden');                     // usuniecie/dodanie klasy do tabelki
		}
    },
    mounted: function(){     // wywołanie funkcji get_coins przy "zamontowaniu" (wczytaniu) ID app
        this.get_coins();
    }
});
