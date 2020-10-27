<template>

    <div id="consulta-container" class="container">
        <p class="title">
            <strong>Consulta de vagas</strong>
        </p>

        <SearchBar :search-callback="searchCallback"
                   :on-ready="onReady"/>

        <table class="table-striped table-hover table-dark centered">
            <thead>
            <tr>
                <th>Cargo</th>
                <th class="hide-on-small-and-down">Descrição</th>
                <th class="hide-on-small-and-down">Cidade</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="vaga in data" @click="selectVaga(vaga.id)">
                <td>{{vaga.shortDescription}}</td>
                <td class="hide-on-small-and-down">{{limitChars(vaga.longDescription)}}</td>
                <td class="hide-on-small-and-down">{{vaga.city}} - {{vaga.state}}</td>
            </tr>

            </tbody>
        </table>

    </div>

</template>

<script>

    import SearchBar from "./SearchBar";

    export default {
        name: "ConsultaDeVagas",
        components: {
          SearchBar
        },
        props: {
            data: {},
            searchCallback: {},
            onReady: {}
        },
        methods: {
            selectVaga: function(vagaId) {
                this.$router.push({
                    name: 'respondervaga',
                    params: { vagaId }
                })
            },
            limitChars: function(text) {
                let size = 75
                return text.substring(0, Math.min(size, text.length)) + (text.length>size ? '...' : '')
            }
        }
    }
</script>

<style scoped>


    #consulta-container {
        background-color: rgba(255, 255, 255, 0.025);
        border-radius: 0.25rem;
        margin: 0px 0px 0px 0px;
        padding-left: 20px !important;
        padding-right: 20px !important;
        padding-top: 15px;
        padding-bottom: 20px;
    }


    #consulta-container table {
        margin-top: 20px;
        border-radius: 0.25rem;
    }




    #consulta-container p:nth-of-type(1) {
        color: white !important;
        opacity: 0.7;
        font-size: 1.1rem;
        text-align: center;
        vertical-align: middle;
        line-height: 24px;
        /*font-weight: bold;*/
        margin-bottom: 0 !important;
    }

    #consulta-container p:nth-of-type(2) {
        color: white !important;
        opacity: 0.7;
        font-size: 1.0rem;
        text-align: center;
        vertical-align: middle;
        line-height: 24px;
        /*font-weight: bold;*/
        margin-top: 12px;
    }

    #consulta-container p:nth-of-type(3) {
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
        #consulta-container {
            padding-left: 0px !important;
            padding-right: 0px !important;
        }
    }

    @media only screen and (min-width: 576px) {
        #consulta-container {
            padding-left: 20px !important;
            padding-right: 20px !important;
        }
    }



</style>
