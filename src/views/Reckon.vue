<template>

    <div class="content">



        <div id="filterbar" class="container" :class="{ invisible: entryMode.active, visible: !entryMode.active }">
            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12 l6">
                            <i id="useridicon" class="large material-icons prefix grey-text">account_circle</i>
                            <input id="first_name" type="text" class="validate white-text" v-model="apiFilterOptions.userId">
                            <label for="first_name">User Id</label>
                        </div>
                        <div class="input-field col s1 l1 white-text" ref="myInput">
                            <select v-model="apiFilters.year">
                                <option v-for="y in apiFilterOptions.year" :value="y" class="white-text">{{ y}}</option>
                            </select>
                            <label>Year</label>
                        </div>
                        <div class="input-field col s1 l1" ref="myInput2">
                            <select v-model="apiFilters.month" @change="setMonthToAll()">
                                <option value="all" selected>All</option>
                                <option v-for="y in apiFilterOptions.month" :value="y" class="white-text">{{ y}}</option>
                            </select>
                            <label>Month</label>
                        </div>
                        <div class="input-field col s1 l1" ref="myInput2" :class="{ disabledInput: apiFilters.month == 'all' }">
                            <select v-model="apiFilters.day" @change="setDayToAll()">
                                <option value="all" selected>All</option>
                                <option v-for="y in apiFilterOptions.day" :value="y" class="white-text">{{ y}}</option>
                            </select>
                            <label>Day</label>
                        </div>
                        <div class="input-field col s1 l1" ref="myInput" :class="{ disabledInput: apiFilters.day == 'all' }">
                            <select v-model="apiFilters.hour" @change="setHourToAll()">
                                <option value="all" selected>All</option>
                                <option v-for="y in apiFilterOptions.hour" :value="y" class="white-text">{{ y}}</option>
                            </select>
                            <label>Hour</label>
                        </div>
                        <div class="input-field col s1 l1" ref="myInput" :class="{ disabledInput: apiFilters.hour == 'all' }">
                            <select v-model="apiFilters.minute" @change="setMinuteToAll()">
                                <option value="all" selected>All</option>
                                <option v-for="y in apiFilterOptions.minuteSecond" :value="y" class="white-text">{{ y}}</option>
                            </select>
                            <label>Minute</label>
                        </div>
                        <div class="input-field col s1 l1" ref="myInput">
                            <a id="reloadbutton" class="btn-floating btn-large waves-effect waves-light purple darken-4 z-depth-3" @click="reloadOnClick" v-if="!isLoading"><i class="material-icons">autorenew</i></a>
                            <a id="reloadbutton-rotate" class="btn-floating btn-large waves-effect waves-light purple darken-4 z-depth-3" v-else><i class="material-icons">autorenew</i></a>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div id="cardscontainer" class="container" :class="{ invisible: entryMode.active, visible: !entryMode.active }">
            <div class="card evcard z-depth-3" v-for="reckon in reckonData" v-if="reckonData.length" @click="selectEntry(reckon)">
                <div class="card-image">
                    <img :src="bucket_url + reckon.img_info.s3_path_hash" alt="Smiley face" height="150" width="100">
                    <div class="imgcaption">
                        <div class="left">
                            {{ getDateFromDateTime(reckon.time) }}
                        </div>
                        <div class="right">
                            {{ getTimeFromDateTime(reckon.time)}}
                        </div>
                    </div>
                </div>
                <div class="card-content white-text">
                    <small class="grey-text">ID</small>
                    <p class="card-text">{{ reckon.userId }}</p>
                </div>
            </div>
        </div>

        <div id="entrymodecontainer" class="container" :class="{ invisible: !entryMode.active, visible: entryMode.active }" v-if="Object.keys(entryMode.data).length > 0">
            <div class="row">
                <div class="col s4 m4 l4">
                    <img  :src="bucket_url + entryMode.data.img_info.s3_path_hash" alt="Smiley face" width="100%">
                </div>

                <div class="col s2 m2 l2">
                    <small class="grey-text">User Id</small>
                    <p class="card-text white-text">{{ entryMode.data.userId }}</p>
                    <small class="grey-text">Time</small>
                    <p class="card-text white-text">{{ getDateFromDateTime(entryMode.data.time) }} {{ getTimeFromDateTime(entryMode.data.time)}}</p>
                    <small class="grey-text">API Key Profile Name</small>
                    <p class="card-text white-text">{{ entryMode.data.identity.apiKeyProfileName }}</p>
                    <small class="grey-text">Device</small>
                    <p class="card-text white-text">{{ entryMode.data.identity.device }}</p>
                    <small class="grey-text">Source IP</small>
                    <p class="card-text white-text">{{ entryMode.data.identity.sourceIp }}</p>
                    <small class="grey-text">User Agent</small>
                    <p class="card-text white-text">{{ entryMode.data.identity.userAgent }}</p>
                    <small class="grey-text">Reason</small>
                    <p class="card-text white-text">{{ entryMode.data.reason }}</p>

                </div>

                <div class="col s2 m2 l2">
                    <small class="grey-text">Age Range</small>
                    <p class="card-text white-text">{{ entryMode.data.face_details.AgeRange.Low }} - {{ entryMode.data.face_details.AgeRange.High }}</p>
                    <small class="grey-text">Gender</small>
                    <p class="card-text white-text">{{ entryMode.data.face_details.Gender.Value }} ({{ parseFloat(entryMode.data.face_details.Gender.Confidence).toFixed(2) }}%)</p>
                    <small class="grey-text">Emotions</small>
                    <div class="white-text" v-for="emotion in entryMode.data.face_details.Emotions">
                        {{ emotion.Type.toLowerCase().replace(/^\w/, c => c.toUpperCase()) }} ({{ parseFloat(emotion.Confidence).toFixed(2) }}%)
                    </div>
                    <div class="spacing"></div>
                    <small class="grey-text">API Metrics</small>
                    <div class="white-text" v-for="metric in entryMode.data.api_metrics">
                        {{ metric.key }}: {{ metric.value }}
                    </div>
                    <div class="spacing"></div>
                    <small class="grey-text">Image Info</small>
                    <div class="white-text">H: {{ entryMode.data.img_info.img_meta_data.dimensions.height }} px | W: {{ entryMode.data.img_info.img_meta_data.dimensions.width }} px</div>
                    <div class="white-text">Size: {{ entryMode.data.img_info.img_meta_data.size }} | Type: {{ entryMode.data.img_info.img_meta_data.type }}</div>

                </div>

                <div class="col s2 m2 l2">
                    <div class="mapouter">
                        <div class="gmap_canvas">
                            <iframe height="400"
                                    width="210"
                                    id="gmap_canvas"
                                    :src="'https://maps.google.com/maps?q=' + entryMode.data.identity.coordinates.lat + '%2C%20' +  entryMode.data.identity.coordinates.lng + '&t=&z=13&ie=UTF8&iwloc=&output=embed'"
                                    frameborder="0"
                                    scrolling="no"
                                    marginheight="0"
                                    marginwidth="0">
                            </iframe>
                        </div>
                    </div>

                </div>

            </div>

            <div class="row closebuttonrow">
                <div class="col s12 m12 l12">
                    <button class="waves-effect waves-light btn-small blue darken-2 closebutton" type="submit" @click="entryMode.active=false">Close</button>
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
                api_url: 'https://ducc36yxee.execute-api.us-east-1.amazonaws.com/proto01-01/admin',
                bucket_url: 'https://facial-recog-auth-front-images-repo.s3.amazonaws.com/',
                isLoading: false,
                reckonData: [],
                entryMode: {
                    active: false,
                    data: {}
                },
                apiFilters: {
                    userId: '',
                    year: '',
                    month: '',
                    day: '',
                    hour: '',
                    minute: '',
                    second: '',
                    milli: ''
                },
                apiFilterOptions: {
                    year: [],
                    month: [],
                    day: [],
                    hour: [],
                    minuteSecond: [],
                }
            }
        },
        methods: {
            loadData: function () {
                this.isLoading = true;
                const request = {
                    userId: this.apiFilters.userId,
                    year: this.apiFilters.year,
                    month: this.apiFilters.month,
                    day: this.apiFilters.day,
                    hour: this.apiFilters.hour,
                    minute: this.apiFilters.minute,
                    second: this.apiFilters.second
                }

                fetch(this.api_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'ihj6N9ICO31VkEW9w1LKra5NltNSujEUa9S57NIz'
                    },
                    body: JSON.stringify(request)
                })
                    .then(response => response.json())
                    .then(data => {
                        data.payload.sort((a, b) => (a.time > b.time) ? 1 : -1 )
                        this.reckonData = data.payload;
                        this.isLoading = false;
                    })
                    .catch(err => {
                        console.error('Failed retrieving data : ' + err);
                        this.isLoading = false;
                    })
            },
            selectEntry: function (entry) {
                this.entryMode.data = entry;
                this.entryMode.active = true;
                // var instance = M.Modal.getInstance('#modal1');
                // instance.open();
                console.log(this.entryMode.data);
            },
            buildYearOptions: function () {
                this.apiFilterOptions.year = [];
                let currentYear = new Date().getFullYear();
                this.apiFilters.year = currentYear;
                for (let x = currentYear; x>currentYear-10; x--) this.apiFilterOptions.year.push(x);
            },
            buildMonthOptions: function () {
                this.apiFilterOptions.month = [];
                let currentMonth = new Date().getMonth() + 1;
                this.apiFilters.month = currentMonth;
                for (let x = 1; x<=12; x++) this.apiFilterOptions.month.push(x);
            },
            buildDayOptions: function () {
                this.apiFilterOptions.day = [];
                this.apiFilters.day = 'all';
                for (let x = 1; x<=12; x++) this.apiFilterOptions.day.push(x);
            },
            buildHourOptions: function () {
                this.apiFilterOptions.hour = [];
                this.apiFilters.hour = 'all';
                for (let x = 0; x<=23; x++) this.apiFilterOptions.hour.push(x);
            },
            buildMinuteSecondOptions: function () {
                this.apiFilterOptions.minuteSecond = [];
                this.apiFilters.minuteSecond = 'all';
                for (let x = 0; x<=59; x++) {
                    this.apiFilterOptions.minuteSecond.push(x);
                }
            },
            getDateFromDateTime: function (datetime) {
                datetime = datetime.split('-')
                if (datetime.length<3) return 'N.A.'
                datetime = datetime.slice(0, 3)
                return datetime[2] + '/' + datetime[1] + '/' + datetime[0]

            },
            getTimeFromDateTime: function (datetime) {
                datetime = datetime.split('-')
                if (datetime.length<6) return 'N.A.'
                datetime = datetime.slice(3, 7)
                return datetime[0] + ':' + datetime[1] + ':' + datetime[2]
            },
            reloadOnClick: function () {
                this.reckonData = [];
                this.loadData();
            },
            setYearToAll: function () {
                this.apiFilters.year = 'all'
                this.setMonthToAll()
            },
            setMonthToAll: function () {
                if (this.apiFilters.month != 'all') return;
                this.apiFilters.day = 'all';
                this.setDayToAll()
            },
            setDayToAll: function () {
                if (this.apiFilters.day != 'all') return;
                this.apiFilters.hour = 'all'
                this.setHourToAll()
            },
            setHourToAll: function () {
                if (this.apiFilters.hour != 'all') return;
                this.apiFilters.minute = 'all'
                this.setMinuteToAll()
            },
            setMinuteToAll: function () {
                if (this.apiFilters.minute != 'all') return;
                this.apiFilters.second = 'all'
                this.$forceUpdate()
                // this.setSecondToAll()
            }
        },
    }

</script>


<style scoped>

    .content {
        margin-top: 20px;
        padding-bottom: 50px;
        width: 100%;
    }

    #entrymodecontainer {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 20px;
        background-color: rgba(255, 255, 255, 0.1);
        /*height: 300px;*/
        border-radius: 0.25rem;
        padding-top: 12px;
    }

    #entrymodecontainer img {
        border-radius: 0.25rem;
    }

    .closebuttonrow {
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        height: 42px;
    }

    .closebutton {
        position: absolute;
        top: 10px;
        right: 0px;
        margin-right: 10px;
    }

    .imgcaption {
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 20px;
        background-color: rgba(0,0,0,0.6);
        color: white;
        font-size: 0.7rem;
        text-align: center;
        padding: 3px;
    }

    #cardscontainer .card-content {
        /*height: 30px;*/
        padding: 5px !important;
    }

    .visible {
        visibility: visible;
        opacity: 1;
    }

    .invisible {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s linear 0.2s, opacity 0.2s linear;
    }

    .spacing {
        height: 15px;
    }

    .mapouter {
        position:relative;
        text-align:right;
        height:400px;
        width:210px;
        border-radius: 0.25rem;
    }

    .gmap_canvas {
        overflow:hidden;
        background:none!important;
        height:400px;
        width:210px;
        border-radius: 0.25rem;
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
        background: rgba(250,250,250,0.1);
        margin-top: 0px !important;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .evcard:hover {
        transform: scale(1.01);
        background: rgba(250,250,250,0.15);
    }

    #reloadbutton {
        margin-left: 5px;
        margin-top: -10px;
    }

    #reloadbutton-rotate {
        margin-left: 5px;
        margin-top: -10px;
        -webkit-animation:spin 4s linear infinite;
        -moz-animation:spin 4s linear infinite;
        animation:spin 1s linear infinite;
    }

    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }


    .dropdown-content>li>a {
        color: white !important;
    }

    .col {
        flex-basis: auto !important;
    }

    .row {
        margin-bottom:  10px;
    }

    .disabledInput {
        opacity: 0.5;
        pointer-events:none;
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

    /*.card {*/
    /*    background: rgba(250,250,250,0.1);*/
    /*    margin-top: 0px !important;*/
    /*}*/

</style>
