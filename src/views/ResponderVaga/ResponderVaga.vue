<template>

    <div class="view-container container">
        <div class="row">
            <div class="col-sm-12">
                <div id="component-container">

                    <div class="view-container-title">
                        <p v-if="user.userType === 'CANDIDATO'">
                            Responder vaga
                        </p>

                        <p v-if="user.userType === 'EMPRESA'">
                            Detalhes da vaga
                        </p>
                    </div>

                    <div class="main-data-container">
                        <div class="row">
                            <div class="col-sm-3 col-config">
                                <div class="main-data-field white-text center">
                                    <p>Cargo</p>
                                    <p>{{vagaData.shortDescription}}</p>
                                </div>
                            </div>
                            <div class="col-sm-3 col-config">
                                <div class="main-data-field white-text center">
                                    <p>Empresa</p>
                                    <p>{{vagaData.ownerName}}</p>
                                </div>
                            </div>
                            <div class="col-sm-3 col-config">
                                <div class="main-data-field white-text center">
                                    <p>Local</p>
                                    <p>{{vagaData.city}} - {{vagaData.state}}</p>
                                </div>
                            </div>
                            <div class="col-sm-3 col-config">
                                <div class="main-data-field white-text center">
                                    <p>Data de expiração</p>
                                    <p>{{parseDate(vagaData.expirationDate)}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-config">
                                <div class="main-data-field white-text center main-data-field-long-desc">
                                    <p class="hide">Descrição</p>
                                    <p>{{vagaData.longDescription}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="criterios-container white-text">

                        <div v-if="vagaData.vagaCriterios && vagaData.vagaCriterios.length>0" class="row criterio-element criterio-element-header hide-on-small-and-down">
                            <div class="col-sm-3">
                                <p>Critério</p>
                            </div>
                            <div v-if="user.userType === 'CANDIDATO'" class="col-sm-3">
                                <p>Descrição</p>
                            </div>
                            <div v-if="user.userType === 'EMPRESA'" class="col-sm-5">
                                <p>Descrição</p>
                            </div>
                            <div class="col-sm-2">
                                <p>Perfil</p>
                            </div>
                            <div class="col-sm-2">
                                <p>Peso</p>
                            </div>
                            <div v-if="user.userType === 'CANDIDATO'" class="col-sm-2">
                                <p>Auto avaliação</p>
                            </div>
                        </div>

                        <div v-if="vagaData.vagaCriterios && vagaData.vagaCriterios.length>0" class="row criterio-element" v-for="(criterio, index) in vagaData.vagaCriterios">
                            <div class="col-sm-3">
                                <p class="truncate">
                                    <span class="hide-on-med-and-up">Critério: </span>
                                    {{criterio.name}}
                                </p>
                            </div>
                            <div v-if="user.userType === 'CANDIDATO'" class="col-sm-3">
                                <p class="truncate">
                                    <span class="hide-on-med-and-up">Descrição: </span>
                                    {{criterio.description}}
                                </p>
                            </div>
                            <div v-if="user.userType === 'EMPRESA'" class="col-sm-5">
                                <p class="truncate">
                                    <span class="hide-on-med-and-up">Descrição: </span>
                                    {{criterio.description}}
                                </p>
                            </div>
                            <div class="col-sm-2">
                                <p class="truncate">
                                    <span class="hide-on-med-and-up">Perfil: </span>
                                    {{selectorFormatter(criterio.pmd)}}
                                </p>
                            </div>
                            <div class="col-sm-2">
                                <p class="truncate">
                                    <span class="hide-on-med-and-up">Peso: </span>
                                    {{selectorFormatter(criterio.weight)}}
                                </p>
                                <div  v-if="user.userType === 'CANDIDATO'"class="spacer hide-on-med-and-up"></div>
                            </div>
                            <div v-if="user.userType === 'CANDIDATO'" class="col-sm-2">
                                <div class="input-field">
<!--                                        <i class="large material-icons prefix grey-text">line_weight</i>-->
                                    <select :id="'selector-' + index" v-model.lazy="formData.autoAvaliacao[index]" @focus="operationFailed = false">
                                        <option value="MUITO_BAIXO">Muito baixo</option>
                                        <option value="BAIXO">Baixo</option>
                                        <option value="MEDIO">Médio</option>
                                        <option value="ALTO">Alto</option>
                                        <option value="MUITO_ALTO">Muito alto</option>
                                    </select>
<!--                                        <label :for="'selector-' + index">{{index}}</label>-->
                                </div>
                                <div v-if="user.userType === 'CANDIDATO'" class="spacer hide-on-med-and-up"></div>
                            </div>
                            </div>
                        </div>

                    <form v-if="user.userType === 'CANDIDATO'" class="component-input-container container">
                        <div class="row">

                            <div class="col-sm-6">

                                <div class="input-field">
                                    <i class="large material-icons prefix grey-text">work</i>
                                    <input id="curriculoUrl"
                                           type="text"
                                           class="white-text"
                                           v-bind:class="{ 'valid': validation.curriculoUrl === 'valid', 'invalid': validation.curriculoUrl === 'invalid' }"
                                           v-model="formData.curriculoUrl"
                                           @focus="operationFailed = false"
                                           @change="validateAll()">
                                    <label for="curriculoUrl">URL do seu currículo</label>
                                </div>

                            </div>

                            <div class="col-sm-6">

                                <div class="input-field">
                                    <i class="large material-icons prefix grey-text">work</i>
                                    <input id="textContent"
                                           type="text"
                                           class="white-text"
                                           v-bind:class="{ 'valid': validation.textContent === 'valid', 'invalid': validation.textContent === 'invalid' }"
                                           v-model="formData.textContent"
                                           @focus="operationFailed = false"
                                           @change="validateAll()">
                                    <label for="textContent">Fale-nos sobre você</label>
                                </div>

                            </div>

                        </div>
                    </form>

                    <div v-if="user.userType === 'CANDIDATO'" class="col-sm-12 center button-container">
                        <button v-if="validationAll && !operationOngoing && !operationFailed" class="waves-effect waves-light btn-small green darken-2 component-button" @click="responderVaga()">Submeter resposta</button>
                        <button v-if="!validationAll && !operationOngoing && !operationFailed" class="waves-effect waves-light btn-small green darken-2 component-button disabled" type="submit">Preencha os dados</button>
                        <button v-if="operationOngoing" class="waves-effect waves-light btn-small green darken-2 component-button disabled" type="submit">Submetendo resposta</button>
                        <button v-if="operationFailed" class="waves-effect waves-light btn-small red darken-2 component-button" type="submit">Falha na submissão</button>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {API_CONFIG} from "../../sensitivedata/api-config";
    import UserService from "../../services/UserService";

    export default {
        name: "ResponderVaga",
        props: {
            vagaId: {}
        },
        mounted() {
            this.getContent()
            // this.initializeSelector()
        },
        data() {
          return {
              contentPath: API_CONFIG["base-path"] + API_CONFIG["responder-vaga"] + '/' + this.vagaId,
              responderVagaPath: API_CONFIG["base-path"] + API_CONFIG["responder-vaga"],
              vagaData: {},
              user: UserService.getUser(),
              operationOngoing: false,
              operationFailed: false,
              formData: {
                  curriculoUrl: '',
                  textContent: '',
                  autoAvaliacao: []
              },
              validation: {
                  curriculoUrl: 'pristine',
                  textContent: 'pristine'
              },
              validationAll: false
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
                        this.vagaData = data
                        this.formData.autoAvaliacao = data.vagaCriterios.map(item => "MEDIO")
                        this.initializeSelector()
                    })
                    .catch(err => {
                        console.error('Failed retrieving data : ' + err);
                    })
            },
            parseDate: function(data) {
                if (!data) return ''
                return data[2] + '/' + data[1] + '/' + data[0]
            },
            selectorFormatter: function(text) {
                return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
                    .replace('_', ' ').replace('e', 'é')
            },
            validateAll: function() {
                this.validation = {
                    curriculoUrl: this.formData.curriculoUrl.length > 0 ? 'valid': 'invalid',
                    textContent: this.formData.textContent.length > 0 ? 'valid': 'invalid',
                }
                this.validationAll = Object.values(this.validation).every(item => item === 'valid')
            },
            initializeSelector: function () {
                setTimeout(() => {
                    M.FormSelect.init(document.querySelectorAll('select'))
                    $(".select-wrapper input.select-dropdown").css("color", 'white')
                    $(".select-wrapper input.select-dropdown").css("margin", '-20px 0 -25px 0')
                    $(".select-wrapper input.select-dropdown").css("border-bottom", '1px solid rgba(0,0,0,0)')
                    $(".select-wrapper input.select-dropdown:focus").css("border-bottom", '1px solid rgba(0,0,0,0)')
                    $(".select-wrapper input.select-dropdown").css("background-color", 'rgba(255,255,255,0.05)')
                    $(".select-wrapper input.select-dropdown").css("padding-left", '7px')
                    $(".select-wrapper input.select-dropdown").css("padding-top", '4px')
                    $(".select-wrapper input.select-dropdown").css("border-radius", '0.25rem')
                    $(".select-wrapper input.select-dropdown").css("height", '2em')
                }, 50)
            },
            responderVaga: function () {
                this.operationOngoing = true
                fetch(this.responderVagaPath, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        vagaId: this.vagaData.id,
                        candidatoId: this.user.id,
                        curriculoUrl: this.formData.curriculoUrl,
                        textContent: this.formData.textContent,
                        respostasCriterios: this.getRespostasCriterios()
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        this.operationOngoing = false
                        this.$router.push({path: 'home'});
                    })
                    .catch(err => {
                        this.operationOngoing = false
                        this.operationFailed = true
                        console.error('Failed retrieving data : ' + err);
                    })
            },
            getRespostasCriterios: function() {
                let data = []
                for (let i = 0; i < this.vagaData.vagaCriterios.length; i++) {
                    data.push({
                        criterio_id: this.vagaData.vagaCriterios[i].id,
                        level: this.formData.autoAvaliacao[i]
                    })
                }
                return data
            }
        }
    }
</script>

<style scoped>

    #component-container {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 0.25rem;
        margin: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        /*height: 260px;*/
        padding-bottom: 20px !important;
    }

    .view-container-title {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 0.25rem 0.25rem 0rem 0rem;
        align-content: center;
        margin-bottom: 0;
        height: 48px;
    }

    .view-container-title p {
        color: white;
        opacity: 0.7;
        font-size: 1.1rem;
        text-align: center;
        vertical-align: middle;
        line-height: 48px;
        font-weight: bold;
        margin-bottom: 0 !important;
    }

    .component-input-container {
        margin-top: 10px;
    }

    .component-input-container button {
        margin-top: 18px;
    }

    .main-data-field {
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 0.25rem 0.25rem 0rem 0rem;
        line-height: 16px;
        padding-top: 15px;
        padding-bottom: 1px;

    }

    .main-data-field-long-desc {
        padding-left: 15px;
        padding-right: 15px;
        line-height: 1.7em;
    }

    .main-data-field:nth-child(4) {
        padding-left: 40px !important;

    }

    .main-data-field p:nth-child(1){
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.9em;
    }

    .col-config {
        padding: 0px 10px 0px 10px !important;
    }

    .main-data-container {
        margin-top: 25px;
        margin-bottom: 30px;
        padding-left: 25px;
        padding-right: 25px;
    }

    .criterios-container{
        /*background-color: red;*/
        margin-left: 20px;
        margin-right: 20px;
        margin-top: -10px;
        padding: 0px 15px 0px 15px;
        /*position: relative;*/
    }

    .criterio-element-header {
        background-color: rgba(200, 200, 255, 0.05) !important;
        /*height: 80px;*/
    }

    .criterio-element {
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 0.25rem 0.25rem 0rem 0rem;
        margin-top: 0 !important;
        margin-bottom: 10px !important;
        padding: 10px;

    }

    .criterio-element p {
        /*margin-top: 15px !important;*/

    }

    .criterio-element p {
        margin-bottom: 0px;
        padding-top: 4px;
    }

    .component-input-container {
        margin-top: 20px;
    }

    selector {
        margin: 0 !important;
    }

    .spacer {
        height: 15px;
    }

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
        .col-config {
            padding-left: 0px;
            padding-right: 0px;
        }
        .component-input-container {
            padding-right: 30px !important;
            padding-left: 30px !important;
        }
        .criterios-container {
            padding-left: 0px !important;
            padding-right: 0px !important;
        }
        .criterio-element {
            padding-left: 0px !important;
            padding-right: 0px !important;
            margin-right: -20px !important;
            margin-left: -20px !important;
        }


    }

    @media only screen and (min-width: 576px) {
        .view-container {
            margin-top: 20px;
            padding-bottom: 50px;
        }
        .component-input-container {
            padding-right: 20px !important;
            padding-left: 20px !important;
        }
    }

    @media only screen and (max-width: 575px) {
        #component-container {
            padding-left: 0px !important;
            padding-right: 0px !important;
        }
        .view-container {
            margin-top: 20px;
            padding-bottom: 50px;
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
            width: 100%;
        }
        .main-data-container {
            /*margin-top: 25px;*/
            /*margin-bottom: 30px;*/
            padding-left: 5px !important;
            padding-right: 5px !important;
        }
        /*.col-sm-12 {*/
        /*    padding-left: 0px;*/
        /*    padding-right: 0px;*/
        /*}*/
    }

    /*@media only screen and (min-width: 576px) {*/
    /*    #vagas-usuario-container {*/
    /*        padding-left: 20px !important;*/
    /*        padding-right: 20px !important;*/
    /*    }*/
    /*}*/

</style>
