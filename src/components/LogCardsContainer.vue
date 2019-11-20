<template>

    <div id="cardscontainer" class="container" :class="{ invisible: !visible, visible: visible }" v-if="dataInner.length">

        <div class="card evcard z-depth-3" v-for="reckon in dataInner.slice(displayLimits.start, displayLimits.limit)">

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
                <p class="card-text truncate">{{ reckon.userId }}</p>
            </div>

        </div>

        <div id="paginationcontainer">
            <div id="paginationbuttonleft" class="waves-effect waves-light" @click="changePage(-1)">
                <i class="tiny material-icons white-text">keyboard_arrow_left</i>
            </div>
            <small class="white-text">Items 1-14</small>
            <div id="paginationbuttonright" class="waves-effect waves-light" @click="changePage(1)">
                <i class="tiny material-icons white-text">keyboard_arrow_right</i>
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
        data() {
            return {
                dataInner: [],
                displayLimits: {
                    limit: 14,
                    start: 0,
                }
            }
        },
        methods: {
            changePage: function (move) {
                console.log('changePage: ' + move);
                if (move>0) {
                    let newStart = this.start + this.limit;
                    if (newStart>= this.dataInner.length-1) {
                        this.displayLimits.start = 0;
                    }
                    else {
                        this.displayLimits.start = newStart;
                    }
                }
                else if (move<0) {
                    let newStart = this.start - this.limit;
                    if (newStart<=0) {
                        this.displayLimits.start = (this.dataInner.length-1)-this.dataInner.length%this.displayLimits.limit;
                    }
                    else {
                        this.displayLimits.start = newStart;
                    }
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
            runCascadeEffectShow: function() {
                this.dataInner = this.data;
                setTimeout(() => {
                    var elems = $('#cardscontainer').children();
                    $(elems).each(function(index) {
                        $(this).delay(50*index).animate({opacity: 1}, 200);
                    });
                }, 100);
            },
            runCascadeEffectHide: function() {
                setTimeout(() => {
                    var elems = $('#cardscontainer').children();
                    $(elems).each(function(index) {
                        $(this).delay(50*index).animate({opacity: 0}, 200);
                    });
                }, 100);

            },
        },

        computed: {
            computedData(){
                return this.displayLimits.limit ? this.dataInner.slice(this.displayLimits.start,this.limit) : this.object
            }
        },
        watch: {
            data: function (val) {
                if (this.data.length !== 0) {
                    this.runCascadeEffectShow();
                }
                else {
                    this.runCascadeEffectHide();
                }
            }
        }
    }
</script>

<style scoped>

    #cardscontainer{
        position: relative;
        text-align: center;
        z-index: 100;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 0.25em 0em 0.25em 0.25em;
        margin-top: 40px;
        padding-top: 13px;
        padding-bottom: 7px;
    }

    #cardscontainer .card-content {
        padding: 5px !important;
    }

    #paginationcontainer{
        position: absolute;
        top: -20px;
        right: 0px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 0.25em 0.25em 0em 0em;
        width: 200px;
        height: 20px;
    }

    #paginationbuttonleft, #paginationbuttonright{
        background-color: rgba(255, 255, 255, 0.05);
        height: 100%;
        width: 40px;
        padding-top: 2px;
    }

    #paginationbuttonleft:hover, #paginationbuttonright:hover{
        background-color: rgba(255, 255, 255, 0.2);
    }

    #paginationbuttonleft{
        border-radius: 0.25em 0em 0em 0em;
        float: left;
    }

    #paginationbuttonright{
        border-radius: 0em 0.25em 0em 0em;
        float: right;
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
        opacity: 0;
    }

    .evcard:hover {
        transform: scale(1.01);
        background: rgba(250,250,250,0.15);
    }

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