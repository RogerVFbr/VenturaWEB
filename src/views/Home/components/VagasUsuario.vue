<template>

    <div id="vagas-usuario-container">
        <p>
            <strong>Vagas {{type === "CANDIDATO" ? 'respondidas' : 'publicadas'}}</strong>
        </p>

        <table class="table-striped table-hover table-dark centered">
            <thead>
            <tr>
                <th>Cargo</th>
                <th class="hide-on-small-and-down">Descrição</th>
                <th class="hide-on-small-and-down">Cidade</th>
                <th class="hide-on-small-and-down">Data fim</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="vaga in data" @click="navigateToRanking(vaga.id)">
                <td>{{vaga.shortDescription}}</td>
                <td class="hide-on-small-and-down">{{limitChars(vaga.longDescription)}}</td>
                <td class="hide-on-small-and-down">{{vaga.city}} - {{vaga.state}}</td>
                <td class="hide-on-small-and-down">{{vaga.expirationDate}}</td>
            </tr>

            </tbody>
        </table>

    </div>

</template>

<script>
    export default {
        name: "VagasUsuario",
        props: {
            data: {},
            type: {}
        },
        methods: {
            limitChars: function(text) {
                let size = 60
                return text.substring(0, Math.min(size, text.length)) + (text.length>size ? '...' : '')
            },
            navigateToRanking: function(vagaId) {
                this.$router.push({
                    name: 'ranking',
                    params: { vagaId }
                })
            }
        }
    }
</script>

<style scoped>

    #vagas-usuario-container {
        background-color: rgba(255, 255, 255, 0.025);
        border-radius: 0.25rem;
        margin: 18px 0px 0px 0px;

        padding-top: 15px;
        padding-bottom: 20px;
    }

    #vagas-usuario-container table {
        margin-top: 15px;
        border-radius: 0.25rem;
    }


    #vagas-usuario-container p:nth-of-type(1) {
        color: white !important;
        opacity: 0.7;
        font-size: 1.1rem;
        text-align: center;
        vertical-align: middle;
        line-height: 24px;
        /*font-weight: bold;*/
        margin-bottom: 0 !important;
    }

    #vagas-usuario-container p:nth-of-type(2) {
        color: white !important;
        opacity: 0.7;
        font-size: 1.0rem;
        text-align: center;
        vertical-align: middle;
        line-height: 24px;
        /*font-weight: bold;*/
        margin-top: 12px;
    }

    #vagas-usuario-container p:nth-of-type(3) {
        color: white !important;
        opacity: 0.7;
        font-size: 1.0rem;
        text-align: center;
        vertical-align: middle;
        line-height: 24px;
        /*font-weight: bold;*/
        margin-top: 12px;
    }

    @media only screen and (max-width: 575px) {
        #vagas-usuario-container {
            padding-left: 0px !important;
            padding-right: 0px !important;
        }
    }

    @media only screen and (min-width: 576px) {
        #vagas-usuario-container {
            padding-left: 20px !important;
            padding-right: 20px !important;
        }
    }


</style>
