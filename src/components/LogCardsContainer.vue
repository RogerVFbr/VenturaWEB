<template>

    <div id="cardscontainer" class="container" :class="{ invisible: !visible, visible: visible }" v-if="data.length">

        <div class="card evcard z-depth-3" v-for="reckon in data">

            <div class="card-image" @click="callback(reckon)"   >
                <img class="log-image" :src="bucketUrl + reckon.img_info.s3_path_hash" alt="Smiley face" height="150" width="100">
                <div class="imgcaption">
                    <div class="left">
                        {{ getDateFromDateTime(reckon.time) }}
                    </div>
                    <div class="right">
                        {{ getTimeFromDateTime(reckon.time) }}
                    </div>
                </div>
            </div>

            <div class="card-content white-text">
                <p class="card-text">{{ reckon.userId }}</p>
            </div>

        </div>

    </div>

</template>

<script>
    export default {
        name: "log-cards-container",
        props: {
            data: {},
            bucketUrl: {},
            callback: {},
            visible: {}
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
            }
        }
    }
</script>

<style scoped>

    #cardscontainer{
        padding: 0px;
        text-align: center;
        z-index: 100;
    }

    #cardscontainer .card-content {
        padding: 5px !important;
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

    /*.card .card-image .card-title {*/
    /*    color: #fff;*/
    /*    position: absolute;*/
    /*    bottom: 0;*/
    /*    left: 0;*/
    /*    max-width: 100%;*/
    /*    padding: 0px 0px 0px 10px;*/
    /*}*/

    .log-image {
        object-fit: cover;
    }

    .card .content small {
        display: inline-block !important;

    }

    .visible {
        visibility: visible;
        opacity: 1;
        transition: visibility 0s linear 0s, opacity 0.35s linear;
    }

    .invisible {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s linear 0.35s, opacity 0.35s linear;
    }

</style>