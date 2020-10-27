<template>
    <div id="component-container" class="container">
        <p>
            Não tem conta no site?
        </p>

        <div class="center-align">
            <button class="waves-effect waves-light btn-small green darken-2 component-button" type="submit" @click="$router.push('signup')">Criar nova conta</button>
        </div>

    </div>

</template>

<script>
    export default {
        name: "criar-nova-conta"
    }
</script>

<style scoped>
    #component-container {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 0.25rem;
        margin: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        height: 106px;
        /*padding-bottom: 64px !important;*/
    }

    .view-container-title {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 0.25rem 0.25rem 0rem 0rem;
        align-content: center;
        margin-bottom: 0;
        height: 48px;
    }

    #component-container p {
        color: white !important;
        opacity: 0.7;
        font-size: 1.1rem;
        text-align: center;
        vertical-align: middle;
        line-height: 48px;
        font-weight: bold;
        margin-bottom: 0 !important;
    }

    .component-button {
        /*height: 42px;*/
        margin-top: 4px;
        width: 62% !important;
    }
</style>
