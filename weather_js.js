var celcia = 273.15;
var faren = 459.67;
new Vue({

    el: '#app',
    data() {

        return {
            selected: 'Paris',
            options: [
                { text: 'Лондон', value: 'London' },
                { text: 'Москва', value: 'Moscow' },
                { text: 'Краснодар', value: 'Krasnodar' },
                { text: 'Пермь', value: 'Perm' },
                { text: 'Новосибирск', value: 'Novosibirsk' },
                { text: 'Париж', value: 'Paris' },
                { text: 'Омск', value: 'Omsk' }
            ],
            info_cel: '',
            discipt:'',
            wind:'',
            dav:'',
            vlaz:'',
            rain:'',
            info_fal:'',
            show: 1,
            activeTab: 1
        };
    },
    created: function () {
        this.getAnswer()
    },
    watch: {
        // эта функция запускается при любом изменении вопроса
        selected: function () {
            this.getAnswer();
        },
    },
    methods: {
        setActiveTab(id){
            this.activeTab = id;
        },
        getAnswer: function () {
            var vm = this
            axios.get('http://api.openweathermap.org/data/2.5/weather?q='+this.selected+'&lang=ru&appid=433830549faa6233c98f49a853f17d27')
                .then(response => {
                    this.info_cel = Math.round(response.data.main.temp - celcia);
                    this.info_fal = Math.round(response.data.main.temp - faren);
                    this.discipt = response.data;
                    this.wind = response.data.wind.speed;
                    this.dav = Math.round(response.data.main.pressure/1.333);
                    this.vlaz = response.data.main.humidity;
                    this.rain = response.data.clouds.all;

                })
                .catch(function (error) {
                    vm.info = 'Ошибка! Не могу связаться с API. ' + error
                })
        }
    }

});