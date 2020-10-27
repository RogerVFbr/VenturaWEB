<template>

    <div class="view-container">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <message-floater v-if="messages !== ''" :message="messages"/>
                    <home-content :user="user"
                                  :content="content"
                                  :search-callback="onSearch"
                                  :on-ready="searchReady"/>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import UserService from "../../services/UserService";
    import HomeContent from "./components/HomeContent";
    import MessageFloater from "../../components/MessageFloater";
    import { API_CONFIG } from "../../sensitivedata/api-config";

    export default {
        name: "Home",
        components: {
            HomeContent,
            MessageFloater
        },
        mounted() {
            this.getContent()
        },
        data() {
            return {
                user: UserService.getUser(),
                contentPath: UserService.getUser().userType === 'CANDIDATO'
                    ? API_CONFIG["base-path"] + API_CONFIG["home"]["candidato-content"] + '/' + UserService.getUser().id
                    : API_CONFIG["base-path"] + API_CONFIG["home"]["empresa-content"] + '/' + UserService.getUser().id,
                searchPath: UserService.getUser().userType === 'CANDIDATO'
                    ? API_CONFIG["base-path"] + API_CONFIG["home"]["candidato-search"] + '/' + UserService.getUser().id
                    : API_CONFIG["base-path"] + API_CONFIG["home"]["empresa-search"] + '/' + UserService.getUser().id,
                searchReady: true,
                messages: '',
                content: {}
            }
        },
        methods: {
            getContent: function () {
                this.searchReady = false
                fetch(this.contentPath, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        this.messages = data.messages
                        this.content = data
                        this.searchReady = true
                    })
                    .catch(err => {
                        console.error('Failed retrieving data : ' + err);
                        this.searchReady = true
                    })
            },
            onSearch: function(params) {
                console.log(params)
                this.searchReady = false
                fetch(this.searchPath, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(params)
                })
                    .then(response => response.json())
                    .then(data => {
                        this.content = data
                        this.searchReady = true
                    })
                    .catch(err => {
                        console.error('Failed retrieving data : ' + err);
                        this.searchReady = true
                    })
            }
        }
    }
</script>

<style scoped>




    @media only screen and (max-width: 575px) {
        .view-container {
            margin-top: 20px;
            padding-bottom: 50px;
            /*padding-right: 0 !important;*/
            margin-left: 0 !important;
            margin-right: 0 !important;
            width: 100%;
            /*background: purple;*/
            /*background-color: rgba(255, 0, 0, 0.1);*/

        }
        .col-sm-12 {
            padding-left: 0px;
            padding-right: 0px;
        }
    }

    @media only screen and (min-width: 576px) {
        .view-container {
            margin-top: 20px;
            padding-bottom: 50px;
            /*width: 100%;*/
            /*background-color: rgba(255, 0, 0, 0.1);*/
        }
    }

</style>
