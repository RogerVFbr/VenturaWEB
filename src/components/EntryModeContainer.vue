<template>

    <div id="entrymodecontainer" class="container" :class="{ invisible: !visible, visible: visible }" v-if="Object.keys(data).length > 0">

        <div class="row">

            <div class="col s4 m4 l4">
                <img :src="bucketUrl + data.img_info.s3_path_hash" alt="Smiley face" width="100%">
            </div>

            <div class="col s2 m2 l2">
                <small class="grey-text">User Id</small>
                <p class="card-text white-text">{{ data.userId }}</p>
                <small class="grey-text">Time</small>
                <p class="card-text white-text">{{ getDateFromDateTime(data.time) }} {{ getTimeFromDateTime(data.time)}}</p>
                <small class="grey-text">API Key Profile Name</small>
                <p class="card-text white-text">{{ data.identity.apiKeyProfileName }}</p>
                <small class="grey-text">Device</small>
                <p class="card-text white-text">{{ data.identity.device }}</p>
                <small class="grey-text">Source IP</small>
                <p class="card-text white-text">{{ data.identity.sourceIp }}</p>
                <small class="grey-text">User Agent</small>
                <p class="card-text white-text">{{ data.identity.userAgent }}</p>
                <small class="grey-text">Reason</small>
                <p class="card-text white-text">{{ data.reason }}</p>
            </div>

            <div class="col s2 m2 l2">
                <small class="grey-text">Age Range</small>
                <p class="card-text white-text">{{ data.face_details.AgeRange.Low }} - {{ data.face_details.AgeRange.High }}</p>
                <small class="grey-text">Gender</small>
                <p class="card-text white-text">{{ data.face_details.Gender.Value }} ({{ parseFloat(data.face_details.Gender.Confidence).toFixed(2) }}%)</p>
                <small class="grey-text">Emotions</small>
                <div class="white-text" v-for="emotion in data.face_details.Emotions">
                    {{ emotion.Type.toLowerCase().replace(/^\w/, c => c.toUpperCase()) }} ({{ parseFloat(emotion.Confidence).toFixed(2) }}%)
                </div>
                <div class="spacing"></div>
                <small class="grey-text">API Metrics</small>
                <div class="white-text" v-for="metric in data.api_metrics">
                    {{ metric.key }}: {{ metric.value }}
                </div>
                <div class="spacing"></div>
                <small class="grey-text">Image Info</small>
                <div class="white-text">H: {{ data.img_info.img_meta_data.dimensions.height }} px | W: {{ data.img_info.img_meta_data.dimensions.width }} px</div>
                <div class="white-text">Size: {{ data.img_info.img_meta_data.size }} | Type: {{ data.img_info.img_meta_data.type }}</div>
            </div>

            <div class="col s2 m2 l2">
                <div class="maploading center-align">
                    <div>Loading...<br/><i id="useridicon" class="material-icons prefix grey-text">account_circle</i></div>
                </div>
<!--                <div class="gmap_canvas map-responsive">-->
<!--                    <iframe height="400"-->
<!--                            width="100%"-->
<!--                            id="gmap_canvas"-->
<!--                            :src="'https://maps.google.com/maps?q=' + data.identity.coordinates.lat + '%2C%20' +  data.identity.coordinates.lng + '&t=&z=13&ie=UTF8&iwloc=&output=embed'"-->
<!--                            frameborder="0"-->
<!--                            scrolling="no"-->
<!--                            marginheight="0"-->
<!--                            marginwidth="0"-->
<!--                            @load="onIframeLoad">-->
<!--                    </iframe>-->
<!--                </div>-->
            </div>

        </div>

        <div class="row closebuttonrow">
            <div class="col s12 m12 l12">
                <button class="waves-effect waves-light btn-small blue darken-2 closebutton" type="submit" @click="callback()">Close</button>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "entry-mode-container",
        props: {
            data: {},
            bucketUrl: {},
            callback: {},
            visible: {}
        },
        data () {
            return {
                isIFrameLoaded: false
            }
        },
        methods: {
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
            onIframeLoad: function () {
                this.isIFrameLoaded = true;
            }
        },
        watch: {
            data: function(val) {
                $('#gmap_canvas').attr(
                    'src',
                    'https://maps.google.com/maps?q=' + this.data.identity.coordinates.lat + '%2C%20' +
                    this.data.identity.coordinates.lng + '&t=&z=13&ie=UTF8&iwloc=&output=embed');
            }
        }
    }
</script>

<style scoped>

    #entrymodecontainer {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 20px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 0.25rem;
        padding-top: 12px;
    }

    #entrymodecontainer img {
        border-radius: 0.25rem;
    }

    .maploading {
        /*position: absolute;*/
        float:right;
        /*top: 0px;*/
        /*left: 0px;*/
        height: 400px;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.1);
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

    .spacing {
        height: 15px;
    }

    .gmap_canvas {
        border-radius: 0.25rem;
        left:0;
        top:0;
        height:100%;
        width:100%;
        position:absolute;
        overflow:hidden;
        padding-bottom:56.25%;
        position:relative;
        height:400px;
    }

    .col {
        flex-basis: auto !important;
    }

    .row {
        margin-bottom:  10px;
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

</style>