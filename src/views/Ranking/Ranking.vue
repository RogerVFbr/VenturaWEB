<template>
    <view-container :title="'Ranking: ' + vagaData.shortDescription + ' (' + vagaData.type + ')'">

        <div class="main-data-container">
            <div class="row">
                <div class="col-sm-4 col-config">
                    <div class="main-data-field white-text center">
                        <p>Local</p>
                        <p>{{vagaData.city}} - {{vagaData.state}}</p>
                    </div>
                </div>
                <div class="col-sm-4 col-config">
                    <div class="main-data-field white-text center">
                        <p>Data de expiração</p>
                        <p>{{vagaData.expirationDate}}</p>
                    </div>
                </div>
                <div class="col-sm-4 col-config">
                    <div class="main-data-field white-text center">
                        <p>Perfil</p>
                        <p>{{vagaData.perfil}}</p>
                    </div>
                </div>
            </div>
        </div>

        <view-container :title="'Candidatos'"
                        :title-opaque-background="true"
                        :inner="true"
                        class="regular-margin-bottom">

            <view-container :title-opaque-background="true"
                            :inner="true"
                            class="small-margin-top entry-view-container"
                            v-if="!isMobile">

                <div class="row entry-container">
                    <div class="col-sm-1 entry-item">#</div>
                    <div class="col-sm-4 entry-item">Nome</div>
                    <div class="col-sm-4 entry-item">E-mail</div>
                    <div class="col-sm-2 entry-item">Telefone</div>
                    <div class="col-sm-1 entry-item">Perfil</div>
                </div>

            </view-container>

            <view-container :title-opaque-background="true"
                            :inner="true"
                            class="small-margin-top entry-view-container"
                            v-for="(resposta, index) in orderBy(vagaData.respostas, 'perfilResposta', -1)"
                            :class="{'selected-entry-view-container': selectedResposta && selectedResposta === resposta}">

                <div class="row entry-container"
                     @click="selectedResposta = resposta">
                    <div class="col-sm-1 entry-item">{{index+1}}</div>
                    <div class="col-sm-4 entry-item">{{resposta.candidato.name}}</div>
                    <div class="col-sm-4 entry-item">{{resposta.candidato.email}}</div>
                    <div class="col-sm-2 entry-item">{{formatPhoneNumber(resposta.candidato.phoneNumber)}}</div>
                    <div class="col-sm-1 entry-item"
                         :class="resposta.perfilResposta >= vagaData.perfil ? ['green-text', 'font-weight-bold'] : ''">
                        {{resposta.perfilResposta}}
                    </div>
                </div>

            </view-container>

        </view-container>

        <view-container :title="'Resposta'"
                        :title-opaque-background="true"
                        :inner="true"
                        v-if="selectedResposta">

            <view-container :title-opaque-background="true"
                            :inner="true"
                            class="small-margin-top">
                <div class="row entry-container center">
                    <div class="col-sm-12 entry-item">{{selectedResposta.curriculoUrl}}</div>
                </div>
            </view-container>

            <view-container :title-opaque-background="true"
                            :inner="true"
                            class="small-margin-top">
                <div class="row entry-container center">
                    <div class="col-sm-12 entry-item">{{selectedResposta.textContent}}</div>
                </div>
            </view-container>

            <view-container :title-opaque-background="true"
                            :inner="true"
                            class="small-margin-top"
                            v-for="crit in selectedResposta.respostasCriterios">

                <div class="row entry-container">
                    <div class="col-sm-6 entry-item">{{crit.vagaCriterio.name}}</div>
                    <div class="col-sm-2 entry-item">{{levelFormatter(crit.vagaCriterio.pmd)}}</div>
                    <div class="col-sm-2 entry-item">{{levelFormatter(crit.vagaCriterio.weight)}}</div>
                    <div class="col-sm-2 entry-item">{{levelFormatter(crit.level)}}</div>
                </div>

            </view-container>

        </view-container>

    </view-container>

</template>

<script>

    import ViewContainer from "../../components/ViewContainer";
    import {API_CONFIG} from "../../sensitivedata/api-config";
    import Vue2Filters from 'vue2-filters'

    export default {
        name: "Ranking",
        components: {
            ViewContainer
        },
        props: {
            vagaId: {}
        },
        mixins: [Vue2Filters.mixin],
        mounted() {
            this.getContent()
            window.addEventListener('resize', () => {
                this.isMobile = this.getIsMobile()
            })
        },
        data() {
            return {
                contentPath: API_CONFIG["base-path"] + API_CONFIG["ranking"] + '/' + this.vagaId,
                vagaData: {},
                selectedResposta: null,
                isMobile: false
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
                    })
                    .catch(err => {
                        console.error('Failed retrieving data : ' + err);
                    })
            },
            levelFormatter: function(text) {
                return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
                    .replace('_', ' ').replace('e', 'é')
            },
            getIsMobile: function() {
                return window.innerWidth <= 575;
            },
            formatPhoneNumber: function(phoneNumberString){
                const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
                const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
                if (match) return '(' + match[1] + ') ' + match[2] + '-' + match[3]
                return phoneNumberString
            }
        }
    }
</script>

<style scoped>

    .main-data-container {
        padding-left: 5px;
        padding-right: 5px;
    }

    .col-config {
        padding: 0px 10px 0px 10px !important;
    }

    .main-data-field {
        background-color: rgba(255, 255, 255, 0.03);
        border-radius: 0.25rem 0.25rem 0rem 0rem;
        line-height: 16px;
        padding-top: 15px;
        padding-bottom: 1px;

    }

    .main-data-field p:nth-child(1){
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.9em;
    }

    .small-margin-top ~ .small-margin-top {
        margin-top: 10px;
    }

    .regular-margin-bottom {
        margin-bottom: 20px;
    }

    .entry-container {
        color: white;
        margin: 0px;
    }

    .entry-view-container:not(:first-child):hover{
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.05);
    }

    .selected-entry-view-container{
        background-color: rgba(255, 255, 255, 0.05);
    }

    .entry-item {
        margin: 10px 0px -10px 0px;
    }

</style>
