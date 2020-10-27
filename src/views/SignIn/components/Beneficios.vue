<template>
    <div id="component-container" class="container">
        <p>
            <strong>Beneficios como membro</strong>
        </p>

        <p>
            {{data}}
        </p>

    </div>

</template>

<script>
    export default {
        name: "beneficios",
        props: {
            data: {}
        },
    }
</script>

<style scoped>
    #component-container {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 0.25rem;
        margin: 0 !important;
        padding-left: 20px !important;
        padding-right: 20px !important;
        padding-top: 15px !important;
        /*height: 158px;*/
        /*overflow: hidden;*/
    }

    #component-container p:nth-of-type(1) {
        color: white !important;
        opacity: 0.7;
        font-size: 1.1rem;
        text-align: center;
        vertical-align: middle;
        line-height: 24px;
        font-weight: bold;
        margin-bottom: 0 !important;
    }

    #component-container p:nth-of-type(2) {
        color: white !important;
        opacity: 0.7;
        font-size: 1.0rem;
        text-align: center;
        vertical-align: middle;
        line-height: 24px;
        /*font-weight: bold;*/
        margin-top: 12px;
    }

    #component-container p:nth-of-type(3) {
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
        .component-container {
            height: 158px;
            overflow: hidden;
        }
    }

    @media only screen and (min-width: 576px) {
        .component-container {

        }
    }


</style>
