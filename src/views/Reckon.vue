<template>
    <div class="about container log-container">
        <div class="evcards-container showCards">
            <div class="card evcard"  v-for="reckon in reckonData">
                <div class="card-body">
                    <img :src="'https://facial-recog-auth-front-images-repo.s3.amazonaws.com/' + reckon.img_info.s3_path_hash" alt="Smiley face" height="100" width="100">
                    <small class="form-text text-muted">UserId</small>
                    <p class="card-text">{{ reckon.userId }}</p>
                    <small class="form-text text-muted">Location</small>
                    <p class="card-text">{{ reckon.identity.coordinates.lat }} / {{ reckon.identity.coordinates.lng }}</p>
                    <small class="form-text text-muted">IP</small>
                    <p class="card-text">{{ reckon.identity.sourceIp }}</p>
                    <small class="form-text text-muted">Time</small>
                    <p class="card-text">{{ reckon.time }}</p>
                    <small class="form-text text-muted">Reason</small>
                    <p class="card-text">{{ reckon.reason }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    // import { Logger } from '../logger/Logger'

    export default {
        name: "log",

        created() {
            var url = "https://ducc36yxee.execute-api.us-east-1.amazonaws.com/proto01-01/admin";
            fetch(url)
                .then(response => response.json() )
                .then(data => {
                    data.payload.sort((a, b) => (a.time > b.time) ? 1 : -1 )
                    this.reckonData = data.payload;
                })
                .catch(err => {
                    console.error('Failed retrieving data : ' + err);
                })
        },
        data() {
            return {
                reckonData: [],
            }
        },
        methods: {
            clear: function () {
                // this.log.clearLog();
                // this.logData = this.log.getLog();
            }
        }
    }

</script>


<style scoped>

    .log-container {
        margin-top: 50px;
        padding-bottom: 50px;
    }

    .contacts-div-layout {
        border: 1px solid rgba(0,0,0,.3);
        border-radius: 5px;
        background: rgba(250,250,250,0.8);
        box-shadow: 5px 5px 30px rgba(0, 0, 0, .4)
    }

    #clearLogBtn {
        margin-top: 20px;
    }

    .evcards-container {
        display:block;
    }

    .evcard {
        width: 15rem;
        display: inline-block;
        margin: 5px;
        border: 1px solid rgba(0,0,0,.3);
        border-radius: 5px;
        background: rgba(250,250,250,0.8);
        box-shadow: 5px 5px 20px rgba(0, 0, 0, .2);
    }

    /*@media only screen and (max-width: 768px) {*/
    /*    .hideTable {*/
    /*        display: none;*/
    /*    }*/

    /*    .showCards {*/
    /*        display: block !important;*/
    /*    }*/
    /*}*/

</style>
