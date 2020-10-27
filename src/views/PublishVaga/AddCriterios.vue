<template>

    <div class="view-container">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div id="component-container">
                        <div class="view-container-title">
                            <p>
                                Adicionar critérios
                            </p>
                        </div>

                        <div class="row main-data-container">
                            <div class="col-sm-4">
                                <div class="main-data-field white-text center">
                                    <p>Cargo</p>
                                    <p>{{vagaData.shortDescription}}</p>
                                </div>
                            </div>
                            <div class="col-sm-4 hide-on-small-and-down">
                                <div class="main-data-field white-text center">
                                    <p>Empresa</p>
                                    <p>{{user.name}}</p>
                                </div>
                            </div>
                            <div class="col-sm-4 hide-on-small-and-down">
                                <div class="main-data-field white-text center">
                                    <p>Local</p>
                                    <p>{{vagaData.city}} - {{vagaData.state}}</p>
                                </div>
                            </div>
                        </div>

                        <div class="component-input-container container">
                            <div class="row">
                                <div class="col-sm-2">
                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">work</i>
                                        <input id="name"
                                               type="text"
                                               class="white-text"
                                               v-bind:class="{ 'valid': validation.name === 'valid', 'invalid': validation.name === 'invalid', 'active': formData.name.length > 0 }"
                                               v-model="formData.name"
                                               @focus="operationFailed = false"
                                               @change="validateAll()">
                                        <label for="name">Nome</label>
                                    </div>
                                </div>

                                <div class="col-sm-5">
                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">description</i>
                                        <input id="description"
                                               type="text"
                                               class="white-text"
                                               v-bind:class="{ 'valid': validation.description === 'valid', 'invalid': validation.description === 'invalid' }"
                                               v-model="formData.description"
                                               @focus="operationFailed = false"
                                               @change="validateAll()">
                                        <label for="description">Descrição</label>
                                    </div>
                                </div>

                                <div class="col-sm-2">
                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">sms</i>
                                        <select id="select-pmd" v-model="formData.pmd"
                                                @focus="operationFailed = false">
                                            <option value="MUITO_BAIXO">Muito baixo</option>
                                            <option value="BAIXO">Baixo</option>
                                            <option value="MEDIO">Médio</option>
                                            <option value="ALTO">Alto</option>
                                            <option value="MUITO_ALTO">Muito alto</option>
                                        </select>
                                        <label for="select-pmd">Perfil</label>
                                    </div>
                                </div>

                                <div class="col-sm-2">
                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">line_weight</i>
                                        <select id="select-weight" v-model="formData.weight"
                                                                   @focus="operationFailed = false">
                                            <option value="MUITO_BAIXO">Muito baixo</option>
                                            <option value="BAIXO">Baixo</option>
                                            <option value="MEDIO">Médio</option>
                                            <option value="ALTO">Alto</option>
                                            <option value="MUITO_ALTO">Muito alto</option>
                                        </select>
                                        <label for="select-weight">Peso</label>
                                    </div>
                                </div>

                                <div class="col-sm-1 center">
                                        <button v-if="validationAll" class="btn-floating waves-effect waves-light btn-small green darken-2 component-button" @click="addCriterio()">
                                            <font-awesome-icon icon="plus" class="floating-button-icon white-text"/>
                                        </button>
                                        <button v-if="!validationAll" class="btn-floating waves-effect waves-light btn-small green darken-2 component-button disabled" type="submit">
                                            <font-awesome-icon icon="plus" class="floating-button-icon white-text"/>
                                        </button>
                                </div>
                            </div>
                        </div>

                        <div class="criterios-container white-text">
                            <div class="row criterio-element" v-for="(criterio, i) in criteriosList">
                                <div class="col-sm-2">
                                    <p class="truncate">{{criterio.name}}</p>
                                </div>
                                <div class="col-sm-4">
                                    <p class="truncate">{{criterio.description}}</p>
                                </div>
                                <div class="col-sm-2">
                                    <p class="truncate">{{selectorFormatter(criterio.pmd)}}</p>
                                </div>
                                <div class="col-sm-2">
                                    <p class="truncate">{{selectorFormatter(criterio.weight)}}</p>
                                </div>
                                <div class="col-sm-2 center">
                                    <div class="icon-container">
                                        <i class="small material-icons prefix grey-text interaction-icons pointer" @click="moveUpwards(criterio)" v-bind:class="{ 'opaque': i === 0 }">arrow_upward</i>
                                        <i class="small material-icons prefix grey-text interaction-icons pointer" @click="moveDownwards(criterio)" v-bind:class="{ 'opaque': i === criteriosList.length-1 }">arrow_downward</i>
                                        <i class="small material-icons prefix yellow-text interaction-icons pointer" @click="editCriterio(criterio)">create</i>
                                        <i class="small material-icons prefix red-text interaction-icons pointer" @click="deleteCriterio(criterio)">delete</i>
                                    </div>
                                 </div>

                            </div>

                        </div>

                        <div class="col-sm-12 center button-container">
                            <button v-if="criteriosList.length > 0 && !operationOngoing && !operationFailed" class="waves-effect waves-light btn-small green darken-2 component-button" @click="publishVaga()">Publicar vaga</button>
                            <button v-if="criteriosList.length === 0 && !operationOngoing && !operationFailed" class="waves-effect waves-light btn-small green darken-2 component-button disabled" type="submit">Preencha os dados</button>
                            <button v-if="operationOngoing" class="waves-effect waves-light btn-small green darken-2 component-button disabled" type="submit">Publicando vaga</button>
                            <button v-if="operationFailed" class="waves-effect waves-light btn-small red darken-2 component-button" type="submit">Falha na publicação</button>
                        </div>

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
        name: "AddCriterios",
        props: {
          data: {}
        },
        mounted() {
            this.initializeSelector()
            this.vagaData = this.data
            this.vagaData.expirationDate = this.parseDate(this.vagaData.expirationDate)
        },
        data() {
            return {
                publishPath: API_CONFIG["base-path"] + API_CONFIG["publish-vaga"],
                user: UserService.getUser(),
                operationOngoing: false,
                operationFailed: false,
                formData: {
                    name: '',
                    description: '',
                    pmd: 'MEDIO',
                    weight: 'MEDIO',
                },
                validation: {
                    name: 'pristine',
                    description: 'pristine',
                },
                validationAll: false,
                vagaData: {},
                criteriosList: [
                ]
            }
        },
        methods: {
            validateAll: function() {
                this.validation = {
                    name: this.formData.name.length > 0 ? 'valid': 'invalid',
                    description:  this.formData.description.length > 0 ? 'valid': 'invalid',
                }
                this.validationAll = Object.values(this.validation).every(item => item === 'valid')
            },
            addCriterio: function() {
                this.criteriosList.push({
                    name: this.formData.name,
                    description: this.formData.description,
                    pmd: this.formData.pmd,
                    weight: this.formData.weight,
                })
                this.formData = {
                    name: '',
                    description: '',
                    pmd: 'MEDIO',
                    weight: 'MEDIO',
                }
                this.validateAll()
                this.validation = {
                    name: 'pristine',
                    description: 'pristine',
                }
                this.initializeSelector()
            },
            editCriterio: function(criterio) {
                this.formData = {
                    name: criterio.name,
                    description: criterio.description,
                    pmd: criterio.pmd,
                    weight: criterio.weight,
                }
                this.validateAll()
                this.initializeSelector()
                this.deleteCriterio(criterio)
            },
            deleteCriterio: function(criterio) {
                let index = this.criteriosList.indexOf(criterio)
                if (index > -1) {
                    this.criteriosList.splice(index, 1)
                }
            },
            moveUpwards: function(criterio) {
                let index = this.criteriosList.indexOf(criterio)
                if (index < 1) return
                let a, b
                [a, b] = [this.criteriosList[index], this.criteriosList[index-1]]
                this.$set(this.criteriosList, index, b)
                this.$set(this.criteriosList, index-1, a)
            },
            moveDownwards: function(criterio) {
                let index = this.criteriosList.indexOf(criterio)
                if (index < 0 || index >= this.criteriosList.length-1) return
                let a, b
                [a, b] = [this.criteriosList[index+1], this.criteriosList[index]]
                this.$set(this.criteriosList, index, a)
                this.$set(this.criteriosList, index+1, b)
            },
            initializeSelector: function () {
                $("#select-pmd").val(this.formData.pmd);
                $("#select-weight").val(this.formData.weight);
                M.FormSelect.init(document.querySelectorAll('select'))
                $(".select-wrapper input.select-dropdown").css("color", 'white')
            },
            selectorFormatter: function(text) {
                return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
                    .replace('_', ' ').replace('e', 'é')
            },
            publishVaga: function () {
                this.operationOngoing = true
                fetch(this.publishPath, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ownerId: this.user.id,
                        ... this.vagaData,
                        vagaCriterios: this.criteriosList.map((item, index) => {
                            return {
                                position: index,
                                ... item
                            }
                        })
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
            parseDate: function(data) {
                let dateParts = data.split("/")
                return dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + 'T00:00:00'
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
        padding-bottom: 15px !important;
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

    .main-data-field p:nth-child(1){
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.9em;
    }

    .interaction-icons {
      padding-right: 10px;
    }

    .col-sm-4 {
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
        margin-top: -5px;
        padding: 0px 15px 0px 15px;
        /*position: relative;*/
    }

    .icon-container {
        height: 30px;
        width: 170px;
        /*background-color: blue;*/
    }

    .criterio-element {
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 0.25rem 0.25rem 0rem 0rem;
        margin-top: 0 !important;
        margin-bottom: 10px !important;
        padding: 10px;

    }

    .criterio-element p {
        margin-bottom: 0px;
        padding-top: 4px;
    }

    .btn-floating {
        padding-top: 2px;
        padding-left: 1px;
        height: 45px !important;
        width: 45px !important;
    }

    .opaque {
        opacity: 0.2;
    }

    .pointer {
        cursor: pointer;
    }

    .button-container{
        margin-top: 20px;
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
        .col-sm-12 {
            padding-left: 0px;
            padding-right: 0px;
        }
        .component-input-container {
            padding-right: 30px !important;
            padding-left: 30px !important;
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

</style>
