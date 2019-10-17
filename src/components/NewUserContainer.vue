<template>

    <div id="newusercontainer" class="container" :class="{ invisible: !visible, visible: visible }">

        <div class="row">

            <div class="col s2 m2 l4 xl4"></div>

            <div id="newusercontent" class="col s8 m8 l4 xl4">

                <div class="row titlerow">
                    <div class="col s12 m12 l12">
                        <h3 class="white-text">Register new user</h3>
                    </div>
                </div>

                <div class="row formrow">

                    <div class="input-field col s12 m12 l12 xl12" :class="{ invisible: errorContent.show, visible: !errorContent.show }">
                        <input id="first_name" type="text" class="validate white-text" v-model="formData.userId" v-on:change="validateForm()">
                        <label for="first_name">New User Id</label>
                    </div>

                    <div class="input-field col s12 m12 l12 xl12" :class="{ invisible: errorContent.show, visible: !errorContent.show }">
                        <input id="reason" type="text" class="validate white-text" v-model="formData.reason" v-on:change="validateForm()">
                        <label for="reason">Reason</label>
                    </div>

                    <div class="file-field input-field col s12 m12 l12 xl12" :class="{ invisible: errorContent.show, visible: !errorContent.show }">
                        <div class="waves-effect waves-light btn-small grey darken-2 filebutton">
                            <span>File</span>
                            <input id="file" type="file" v-on:change="validateForm()">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text">
                        </div>
                    </div>

                    <div class="errorcontainer" :class="{ invisible: !errorContent.show, visible: errorContent.show }">
                        <div class="errorcontainercontent">
                            <h4 class="white-text">Error</h4>
                            <p class="white-text">{{errorContent.message}}</p>
                        </div>

                    </div>

                </div>



                <div class="row buttonrow">
                    <div class="col s12 m12 l12">
                        <button class="waves-effect waves-light btn-small teal darken-4 registerbutton" type="submit" @click="register()"
                                :class="{ buttondisabled: !formData.validated || isSaving }">
                            Register
                            <i class="material-icons right">send</i>
                        </button>
                        <button class="waves-effect waves-light btn-small red darken-4 closebutton" type="submit" @click="close()">
                            Cancel
                            <i class="material-icons right">cancel</i>
                        </button>
                    </div>
                </div>

            </div>

            <div class="col s2 m2 l4 xl4"></div>
        </div>

    </div>

</template>

<script>

    import { REGISTER_ENDPOINT_URL } from "../sensitivedata/aws";
    import { API_KEY } from "../sensitivedata/aws";

    export default {
        name: "new-user-container",
        props: {
            onSave: {},
            onClose: {},
            visible: {}
        },
        data () {
            return {
                isSaving: false,
                errorContent: {
                    show: false,
                    message: 'Unable to decode.'
                },
                formData: {
                    userId: '',
                    reason: '',
                    image: '',
                    validated: false
                },
                registrationObject: {
                    id: '',
                    image: '',
                    device: 'Web admin client',
                    reason: '',
                    coordinates: {
                        lat: '',
                        lng:''
                    },
                }
            }
        },
        methods: {
            close: function () {
                this.onClose();
            },
            register: function () {
                this.isSaving = true;
                var file = document.querySelector('#file').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    try {
                        this.formData.image = reader.result.split(";")[1].replace('base64,', '');
                        // var a = undefined;
                        // a.test = 0;
                        this.getGeolocation();
                    }
                    catch(err) {
                        this.showError(String(err))
                        return
                    }
                };
                reader.onerror = function (error) {
                    this.showError(String(error))
                };
            },
            getGeolocation: function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.updateGeolocationOnRegistrationObject);
                } else {
                    this.showError("Unable to get browser's coordinates.");
                }
            },
            updateGeolocationOnRegistrationObject: function (position) {
                this.registrationObject.coordinates.lat = String(position.coords.latitude)
                this.registrationObject.coordinates.lng = String(position.coords.longitude)
                console.log(this.registrationObject.coordinates.lat);
                console.log(this.registrationObject.coordinates.lng);
                this.buildRegistrationObject();
            },
            buildRegistrationObject: function () {
                this.registrationObject.reason = this.formData.reason;
                this.registrationObject.id = this.formData.userId;
                this.registrationObject.image = this.formData.image;

                fetch(REGISTER_ENDPOINT_URL, {
                    method: 'POST',
                    // mode: "no-cors",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': API_KEY
                    },
                    body: JSON.stringify(this.registrationObject)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        this.onSave();
                        this.isSaving = false;
                    })
                    .catch(err => {
                        console.log(err);
                        this.showError('Fetch error : ' + String(err));
                    })
            },

            validateForm: function () {
                if (this.formData.userId == '') {
                    this.formData.validated = false;
                    return;
                }
                if (this.formData.reason == '') {
                    this.formData.validated = false;
                    return;
                }
                if (!document.querySelector('#file').files[0]) {
                    this.formData.validated = false;
                    return;
                }
                this.formData.validated = true;
            },
            showError: function (msg) {
                this.errorContent.show = true;
                this.errorContent.message = msg;
                setTimeout(() => {
                    this.errorContent.show = false;
                    this.isSaving = false;
                }, 3000)
            }
        }
    }
</script>

<style scoped>

    #newusercontainer {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 20px;
        /*background-color: rgba(255, 255, 255, 0.1);*/
        /*border-radius: 0.25rem;*/
        /*padding-top: 12px;*/
    }

    #newusercontent {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 0.25rem;
    }

    .titlerow {
        background-color: rgba(255, 255, 255, 0.1);
        padding: 15px 10px 10px 10px;
    }

    .buttonrow {
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        height: 42px;
    }

    .buttondisabled {
        opacity: 0.2;
        pointer-events: none
    }

    .errorcontainer {
        position: absolute;
        top: 72px;
        bottom: 60px;
        left: 7px;
        right: 7px;
        background-color: rgba(220,20,60, 0.5);
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .errorcontainercontent {
        text-align: center;
    }

    .filebutton {
        /*height: 30px !important;*/
        margin-top: 0.8rem;
        height: 2.2rem !important;
        line-height: 2rem !important;
    }

    .closebutton {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .registerbutton {
        position: absolute;
        top: 10px;
        left: 10px;
        transition: all 0.3s;
    }

    .col {
        flex-basis: auto !important;
    }

    .row {
        margin-bottom:  10px;
    }

    .input-field {
        /*margin-top: 25px !important;*/
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