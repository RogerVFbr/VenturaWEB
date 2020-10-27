<template>

    <div id="mensagens-container">
        <p>
            <strong>Mensagens do sistema</strong>
        </p>
    </div>

</template>

<script>
    export default {
        name: "MensagensDoSistema"
    }
</script>

<style scoped>

    #mensagens-container {
        background-color: rgba(255, 255, 255, 0.025);
        border-radius: 0.25rem;
        margin: 18px 0px 0px 0px;
        padding-left: 0 !important;
        padding-right: 0 !important;
        padding-top: 15px;
        height: 260px;
        /*padding-bottom: 64px !important;*/
    }


    #mensagens-container p:nth-of-type(1) {
        color: white !important;
        opacity: 0.7;
        font-size: 1.1rem;
        text-align: center;
        vertical-align: middle;
        line-height: 24px;
        /*font-weight: bold;*/
        margin-bottom: 0 !important;
    }

    #mensagens-container p:nth-of-type(2) {
        color: white !important;
        opacity: 0.7;
        font-size: 1.0rem;
        text-align: center;
        vertical-align: middle;
        line-height: 24px;
        /*font-weight: bold;*/
        margin-top: 12px;
    }

    #mensagens-container p:nth-of-type(3) {
        color: white !important;
        opacity: 0.7;
        font-size: 1.0rem;
        text-align: center;
        vertical-align: middle;
        line-height: 24px;
        /*font-weight: bold;*/
        margin-top: 12px;
    }

</style>
