<template>

    <div class="view-container">
        <div class="container">
            <div class="row">
                <div class="col-sm-8">
                    <ultimas-vagas-publicadas :data="vagas" class="hide-on-med-and-down"/>
                </div>
                <div class="col-sm-4">
                    <div class="row">
                        <acesso-ao-sistema :authorization="authorizationResult"
                                           :callback="getAuth"
                                           :change="onAcessoChange"/>
                    </div>
                    <div class="row">
                        <criar-nova-conta />
                    </div>
                    <div class="row">
                        <beneficios :data="memberBenefits"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import AcessoAoSistema from "./components/AcessoAoSistema";
    import UltimasVagasPublicadas from "./components/UltimasVagasPublicadas";
    import CriarNovaConta from "./components/CriarNovaConta";
    import Beneficios from "./components/Beneficios";

    import { API_CONFIG } from "../../sensitivedata/api-config";
    import UserService from "../../services/UserService";
    import User from "../../core/User";

    export default {
        name: "signin",
        components: {
            AcessoAoSistema,
            UltimasVagasPublicadas,
            CriarNovaConta,
            Beneficios
        },
        mounted() {
            this.getContent()
        },
        data() {
            return {
                contentPath: API_CONFIG["base-path"] + API_CONFIG["sign-in"].content,
                authPath: API_CONFIG["base-path"] + API_CONFIG["sign-in"].auth,
                memberBenefits: "",
                vagas: [],
                authorizationResult: true
            }
        },
        methods: {
            getContent: function () {
                fetch(this.contentPath, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        this.memberBenefits = data.memberBenefits
                        this.vagas = data.vagas
                    })
                    .catch(err => {
                        console.error('Failed retrieving data : ' + err);
                    })
            },
            getAuth: function (email, password) {
                fetch(this.authPath, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        UserService.setUser(
                            new User(
                                data.id,
                                data.name,
                                data.userType,
                                data.documentId,
                                data.email
                            )
                        )
                        this.$router.push({path: 'home'});
                    })
                    .catch(err => {
                        this.authorizationResult = false
                        console.error('Failed retrieving data : ' + err);
                    })
            },
            onAcessoChange: function() {
                this.authorizationResult = true;
            }
        }
    }

</script>


<style scoped>

    @media only screen and (max-width: 575px) {
        .view-container {
            margin-top: 20px;
            padding-bottom: 50px;
            margin-left: auto;
            margin-right: auto;
            /*width: 100%;*/
        }
    }

    @media only screen and (min-width: 576px) {
        .view-container {
            margin-top: 20px;
            /*padding-bottom: 50px;*/
            /*width: 100%;*/
        }
    }

</style>
