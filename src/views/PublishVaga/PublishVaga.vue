<template>


    <div class="view-container">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div id="component-container">
                        <div class="view-container-title">
                            <p>
                                Publicar vaga
                            </p>
                        </div>

                        <form class="component-input-container container">
                            <div class="row">
                                <div class="col-sm-12">

                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">work</i>
                                        <input id="shortDescription"
                                               type="text"
                                               class="white-text"
                                               v-bind:class="{ 'valid': validation.shortDescription === 'valid', 'invalid': validation.shortDescription === 'invalid' }"
                                               v-model="formData.shortDescription"
                                               @focus="operationFailed = false"
                                               @change="validateAll()">
                                        <label for="shortDescription">Cargo</label>
                                    </div>

                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">description</i>
                                        <input id="longDescription"
                                               type="text"
                                               class="white-text"
                                               v-bind:class="{ 'valid': validation.longDescription === 'valid', 'invalid': validation.longDescription === 'invalid' }"
                                               v-model="formData.longDescription"
                                               @focus="operationFailed = false"
                                               @change="validateAll()">
                                        <label for="longDescription">Descrição</label>
                                    </div>

                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">location_city</i>
                                        <input id="city"
                                               type="text"
                                               class="white-text"
                                               v-bind:class="{ 'valid': validation.city === 'valid', 'invalid': validation.city === 'invalid' }"
                                               v-model="formData.city"
                                               @focus="operationFailed = false"
                                               @change="validateAll()">
                                        <label for="city">Cidade</label>
                                    </div>

                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">add_location</i>
                                        <input id="state"
                                               type="text"
                                               class="white-text"
                                               v-bind:class="{ 'valid': validation.state === 'valid', 'invalid': validation.state === 'invalid' }"
                                               v-model="formData.state"
                                               @focus="operationFailed = false"
                                               @change="validateAll()">
                                        <label for="state">Estado</label>
                                    </div>

                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">dvr</i>
                                        <select v-model="formData.type"
                                                @focus="operationFailed = false">
                                            <option value="CLT">CLT</option>
                                            <option value="PJ">PJ</option>
                                        </select>
                                        <label>Forma de contratação</label>
                                    </div>

                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">event_available</i>
                                        <input id="timeSpan"
                                               type="text"
                                               class="white-text"
                                               v-bind:class="{ 'valid': validation.timeSpan === 'valid', 'invalid': validation.timeSpan === 'invalid' }"
                                               v-model="formData.timeSpan"
                                               @focus="operationFailed = false"
                                               @change="validateAll()">
                                        <label for="timeSpan">Período de contratação</label>
                                    </div>

                                    <div class="input-field">
                                        <i class="small material-icons prefix grey-text">event_busy</i>
                                        <input id="expirationDate"
                                               type="text"
                                               class="white-text datepicker"
                                               v-bind:class="{ 'valid': validation.expirationDate === 'valid', 'invalid': validation.expirationDate === 'invalid' }"
                                               v-model.lazy="formData.expirationDate"
                                               @focus="operationFailed = false"
                                               @change="validateAll()">
                                        <label for="expirationDate">Data limite</label>
                                    </div>

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 center">
                                    <button v-if="!operationOngoing && !operationFailed && validationAll" class="waves-effect waves-light btn-small green darken-2 component-button" type="submit" name="action" @click="addCriterios()">Cadastrar critérios</button>
                                    <button v-if="operationOngoing && validationAll" class="waves-effect waves-light btn-small green darken-2 component-button disabled" type="submit" @click="registerUser()">Registrando...</button>
                                    <button v-if="!validationAll" class="waves-effect waves-light btn-small green darken-2 component-button disabled" type="submit" @click="registerUser()">Preencha todos os dados</button>
                                    <button v-if="!operationOngoing && operationFailed && validationAll" class="waves-effect waves-light btn-small red darken-2 component-button" type="submit" @click="registerUser()">Falha no registro</button>
                                </div>
                            </div>

                        </form>

                    </div>

                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import {API_CONFIG} from "../../configs/api-config";
    import UserService from "../../services/UserService";
    // import VagaFormService from "../../services/VagaFormService";

    export default {
        name: "PublishVaga",
        mounted() {
            M.FormSelect.init(document.querySelectorAll('select'))
            M.Datepicker.init(document.querySelectorAll('.datepicker'), {
                    i18n: {
                        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                        weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
                        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                        weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                        today: 'Hoje',
                        clear: 'Limpar',
                        cancel: 'Sair',
                        done: 'Confirmar',
                        labelMonthNext: 'Próximo mês',
                        labelMonthPrev: 'Mês anterior',
                        labelMonthSelect: 'Selecione um mês',
                        labelYearSelect: 'Selecione um ano',
                        selectMonths: true,
                        selectYears: 15,
                    },
                    autoClose: true,
                    format: 'dd/mm/yyyy',
                    container: 'body',
                    minDate: new Date(),
                })

            $(".select-wrapper input.select-dropdown").css("color", 'white')
            $(".modal").css("background-color", 'rgba(255, 255, 255, 0)')
        },
        data() {
            return {
                publishPath: API_CONFIG["base-path"] + API_CONFIG["publish-vaga"],
                user: UserService.getUser(),
                operationOngoing: false,
                operationFailed: false,
                formData: {
                    shortDescription: '',
                    longDescription: '',
                    city: '',
                    state: '',
                    type: 'CLT',
                    timeSpan: '',
                    expirationDate: ''
                },
                validation: {
                    shortDescription: 'pristine',
                    longDescription: 'pristine',
                    city: 'pristine',
                    state: 'pristine',
                    type: 'pristine',
                    timeSpan: 'pristine',
                    expirationDate: 'pristine'
                },
                validationAll: false
            }
        },
        methods: {
            validateAll: function() {
                this.validation = {
                    shortDescription: this.formData.shortDescription.length > 0 ? 'valid': 'invalid',
                    longDescription:  this.formData.longDescription.length > 0 ? 'valid': 'invalid',
                    city: this.formData.city.length > 0 ? 'valid': 'invalid',
                    state: this.formData.state.length > 0 ? 'valid': 'invalid',
                    timeSpan: this.formData.timeSpan.length > 0 ? 'valid': 'invalid',
                    expirationDate: this.formData.expirationDate.length > 0 ? 'valid': 'invalid'
                }
                this.validationAll = Object.values(this.validation).every(item => item === 'valid')
            },
            addCriterios: function() {
                this.$router.push({
                    name: 'addcriterios',
                    params: {
                        data: {
                            ... this.formData
                        }
                    }
                })
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
        padding-bottom: 1px !important;
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
