<template>
    <div id="component-container">
        <div class="view-container-title">
            <p>
                Bem vindo, {{user.name}}!
            </p>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <vagas-usuario :data="content.vagasUsuario" :type="user.userType"/>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <consulta-de-vagas :data="content.vagasBusca"
                                       :search-callback="searchCallback"
                                       :on-ready="onReady"/>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import VagasUsuario from "./VagasUsuario";
    import ConsultaDeVagas from "./ConsultaDeVagas";
    import MessageFloater from "../../../components/MessageFloater";

    export default {
        name: "HomeContent",
        components: {
            VagasUsuario,
            ConsultaDeVagas,
            MessageFloater
        },
        props: {
            user: {},
            content: {},
            searchCallback: {},
            onReady: {}
        },
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

    @media only screen and (max-width: 575px) {
        .container {
            padding-left: 0 !important;
            padding-right: 0 !important;
        }
    }

</style>
