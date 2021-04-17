var celcia = 273.15;
var faren = 0.123;

const Autocomplete = {
    name: "autocomplete",
    template: "#autocomplete",
    props: {
        items: {
            type: Array,
            required: false,
            default: () => []
        },
        isAsync: {
            type: Boolean,
            required: false,
            default: false
        },
        ariaLabelledBy: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            isOpen: false,
            results: [],
            search: 'Париж',
            isLoading: false,
            arrowCounter: 0,
            activedescendant: "",
            show: 1,
            activeTab: 1,
            info_cel: '',
            discipt:'',
            wind:'',
            dav:'',
            vlaz:'',
            rain:'',
            info_fal:'',
            nightcity_label:'Париж',
            in_active:'0',
            wind_far:'',
            discr:'',

        };
    },

    methods: {

        setActiveTab(id){
            this.activeTab = id;
        },
        onChange() {

            this.$emit("input", this.search);

            if (this.isAsync) {
                this.isLoading = true;
            } else {

                this.filterResults();
                this.isOpen = true;
            }
        },

        filterResults() {

            this.results = this.items.filter(item => {
                return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
            });
        },
        setResult(result) {
            this.search = result;
            this.isOpen = false;
        },
        onArrowDown(evt) {
            if (this.isOpen) {
                if (this.arrowCounter < this.results.length) {
                    this.arrowCounter = this.arrowCounter + 1;
                    this.setActiveDescendent();
                }
            }
        },
        onArrowUp() {
            if (this.isOpen) {
                if (this.arrowCounter > 0) {
                    this.arrowCounter = this.arrowCounter - 1;
                    this.setActiveDescendent();
                }
            }
        },
        onEnter() {
            this.search = this.results[this.arrowCounter];
            this.isOpen = false;
            this.arrowCounter = -1;
            this.gogo();

        },
        gogo: function start_api () {

            var vm = this
            axios.get('http://api.openweathermap.org/data/2.5/weather?q='+this.search+'&lang=ru&appid=433830549faa6233c98f49a853f17d27')
                .then(response => {
                    this.info_cel = Math.round(response.data.main.temp - celcia);
                    this.info_fal = Math.round(response.data.main.temp * faren);
                    this.discipt = response.data;
                    this.wind = response.data.wind.speed;
                    this.wind_far = Math.round(response.data.wind.speed * 2.237);
                    this.dav = Math.round(response.data.main.pressure/1.333);
                    this.vlaz = response.data.main.humidity;
                    this.rain = response.data.clouds.all;
                    this.in_active = 0;
                    this.nightcity_label = this.search;
                })
                .catch(function (error) {
                    vm.nightcity_label = 'Ошибка!'+error;
                })
        },
        setActiveDescendent() {
            this.activedescendant = this.getId(this.arrowCounter);
        },

        isSelected(index) {
            return index === this.arrowCounter;
        },
        getId(index) {
            return `result-option-${index}`;
        },
        place: function (){
            this.search = ymaps.geolocation.city;
            this.nightcity_label = ymaps.geolocation.city;
            this.gogo();
        }

    },
    watch: {

        items: function(val, oldValue) {
            // actually compare them
            if (val.length !== oldValue.length) {
                this.results = val;
                this.isLoading = false;
            }

        }
    },
    beforeMount(){
        this.gogo();
    },

};

new Vue({
    el: "#app",
    name: "app",
    components: {
        autocomplete: Autocomplete
    },
    data() {

        return {
            itemlist: ['Кемерово', 'Сочи', 'Пермь', 'Краснодар', 'Москва', 'Пекин', 'Вашингтон', 'Мехико', 'Владивосток',
                'Баку', 'Париж', 'Мадрид', 'Лондон', 'Токио'],

        };
    },
    methods: {

        // greet: function start_api () {
        //
        //     var vm = this
        //     axios.get('http://api.openweathermap.org/data/2.5/weather?q='+this.search+'&lang=ru&appid=433830549faa6233c98f49a853f17d27')
        //         .then(response => {
        //             this.info_cel = Math.round(response.data.main.temp - celcia);
        //             this.info_fal = Math.round(response.data.main.temp * faren);
        //             this.discipt = response.data;
        //             this.wind = response.data.wind.speed;
        //             this.dav = Math.round(response.data.main.pressure/1.333);
        //             this.vlaz = response.data.main.humidity;
        //             this.rain = response.data.clouds.all;
        //             this.in_active = 0;
        //             this.nightcity_label = this.search;
        //
        //         })
        //         .catch(function (error) {
        //             vm.nightcity_label = 'Ошибка!'+error;
        //         })
        // },

    },

});
