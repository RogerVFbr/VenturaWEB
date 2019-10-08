<template>
    <div class="content">

        <div id="filterbar" class="container">

            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12 l6">
                            <i id="useridicon" class="large material-icons prefix grey-text">account_circle</i>
                            <input id="first_name" type="text" class="validate white-text" v-model="userId">
                            <label for="first_name">User Id</label>
                        </div>
                        <div class="input-field col s1 l1 white-text" ref="myInput">
                            <select v-model="year">
                                <option v-for="y in yearOptions" :value="y" class="white-text">{{ y}}</option>
                            </select>
                            <label>Year</label>
                        </div>
                        <div class="input-field col s1 l1" ref="myInput2">
                            <select v-model="month">
                                <option v-for="y in monthOptions" :value="y" class="white-text">{{ y}}</option>
                            </select>
                            <label>Month</label>
                        </div>
                        <div class="input-field col s1 l1" ref="myInput2">
                            <select v-model="day">
                                <option value="all" selected>All</option>
                                <option v-for="y in dayOptions" :value="y" class="white-text">{{ y}}</option>
                            </select>
                            <label>Day</label>
                        </div>
                        <div class="input-field col s1 l1" ref="myInput">
                            <select v-model="hour">
                                <option value="all" disabled selected>All</option>
                                <option v-for="y in hourOptions" :value="y" class="white-text">{{ y}}</option>
                            </select>
                            <label>Hour</label>
                        </div>
                        <div class="input-field col s1 l1" ref="myInput">
                            <select v-model="minute">
                                <option value="all" disabled selected>All</option>
                                <option v-for="y in minuteOptions" :value="y" class="white-text">{{ y}}</option>
                            </select>
                            <label>Minute</label>
                        </div>
                        <div class="input-field col s1 l1" ref="myInput">
                            <a id="reloadbutton" class="btn-floating btn-large waves-effect waves-light purple darken-4 z-depth-3" @click="reloadOnClick"><i class="material-icons">autorenew</i></a>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div id="cardscontainer" class="container">
            <div class="card evcard z-depth-3" v-for="reckon in reckonData">
                <div class="card-image">
                    <img :src="url + reckon.img_info.s3_path_hash" alt="Smiley face" height="150" width="100">
                </div>
                <div class="card-content white-text">
                    <small class="grey-text">ID</small>
                    <p class="card-text">{{ reckon.userId }}</p>
                    <small class="grey-text">Date</small>
                    <p class="card-text">{{ reckon.time.split(' ')[0] }}</p>
                    <small class="grey-text">Time</small>
                    <p class="card-text">{{ reckon.time.split(' ')[1].split('.')[0] }}</p>
                </div>
            </div>
        </div>




        </div>
</template>

<script>

    export default {
        name: "log",

        created() {
            this.loadData();
            this.buildYearOptions();
            this.buildMonthOptions();
            this.buildDayOptions();
            this.buildHourOptions();
            this.buildMinuteSecondOptions();
        },
        mounted() {
            M.FormSelect.init(document.querySelectorAll('select'));
            $("input.select-dropdown").css("color", "white");
        },
        data() {
            return {
                url: 'https://facial-recog-auth-front-images-repo.s3.amazonaws.com/',
                reckonData: [],
                year: '',
                yearOptions: [],
                userId: '',
                month: '',
                monthOptions: [],
                day: '',
                dayOptions: [],
                hour: '',
                hourOptions: [],
                minute: '',
                minuteOptions: [],
                second: '',
                secondOptions: [],
                milli: ''
            }
        },
        methods: {
            loadData: function () {
                var url = "https://ducc36yxee.execute-api.us-east-1.amazonaws.com/proto01-01/admin";
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        data.payload.sort((a, b) => (a.time > b.time) ? 1 : -1 )
                        this.reckonData = data.payload;
                    })
                    .catch(err => {
                        console.error('Failed retrieving data : ' + err);
                    })
            },
            buildYearOptions: function () {
                this.yearOptions = [];
                let currentYear = new Date().getFullYear();
                this.year = currentYear;
                for (let x = currentYear; x>currentYear-10; x--) this.yearOptions.push(x);
            },
            buildMonthOptions: function () {
                this.monthOptions = [];
                let currentMonth = new Date().getMonth() + 1;
                this.month = currentMonth;
                for (let x = 1; x<=12; x++) this.monthOptions.push(x);
            },
            buildDayOptions: function () {
                this.dayOptions = [];
                this.day = 'all';
                for (let x = 1; x<=12; x++) this.dayOptions.push(x);
            },
            buildHourOptions: function () {
                this.hourOptions = [];
                this.hour = 'all';
                for (let x = 0; x<=23; x++) this.hourOptions.push(x);
            },
            buildMinuteSecondOptions: function () {
                this.minuteOptions = [];
                this.secondOptions = [];
                this.minute = 'all';
                this.second = 'all';
                for (let x = 0; x<=59; x++) {
                    this.minuteOptions.push(x);
                    this.secondOptions.push(x);
                }
            },
            reloadOnClick: function () {
                this.reckonData = [];
                console.log('UserId = ' + this.userId);
                console.log('Year = ' + this.year);
                console.log('Month = ' + this.month);
                console.log('Day = ' + this.day);
                console.log('Hour = ' + this.hour);
                console.log('Minute = ' + this.minute);
                console.log('Seconds = ' + this.seconds);
                this.loadData();
            }
        }
    }

</script>


<style scoped>

    .content {
        margin-top: 20px;
        padding-bottom: 50px;
        width: 100%;
    }

    #filterbar {
        background-color: rgba(255, 255, 255, 0.1);
        margin-bottom: 20px;
        border-radius: 0.25rem;

    }

    #cardscontainer{
        padding: 0px;
        text-align: center;
    }

    .evcard {
        width: 10rem;
        display: inline-block;
        margin-right: 5px;
        margin-bottom: 5px;
    }

    #reloadbutton {
        margin-left: 5px;
        margin-top: -10px;
    }

    .dropdown-content>li>a {
        color: white !important;
    }

    .col {
        flex-basis: auto !important;
    }

    .row {
        margin-bottom:  10px;
    }

    .input-field {
        margin-top: 25px !important;
        margin-bottom: 0px !important;
    }

    /* label color */
    .input-field label {
        color: #fff;
        opacity: 0.5;
    }
    /* label focus color */
    .input-field input[type=text]:focus + label {
        color: #fff !important;
        opacity: 1;

    }
    /* label underline focus color */
    .input-field input[type=text]:focus {
        border-bottom: 1px solid white !important;
        box-shadow: 0 1px 0 0 black !important;
    }
    /* valid color */
    .input-field input[type=text].valid {
        border-bottom: 1px solid green;
        box-shadow: 0 1px 0 0 black;
    }
    /* invalid color */
    .input-field input[type=text].invalid {
        border-bottom: 1px solid red;
        box-shadow: 0 1px 0 0 black;
    }
    /* icon prefix focus color */
    .input-field .prefix.active {
        color: white !important;
        opacity: 1;
    }
    .card .card-image .card-title {
        color: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        max-width: 100%;
        padding: 0px 0px 0px 10px;
    }

    .card .content small {
        display: inline-block !important;

    }

    .card {
        background: rgba(250,250,250,0.1);
        margin-top: 0px !important;
    }

</style>
