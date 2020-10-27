<template>
    <div id="component-container" class="container">
        <div class="view-container-title">
            <p>
                Últimas vagas publicadas
            </p>
        </div>

        <div id="component-table-container">

            <table class="table-striped table-hover table-dark centered">
                <thead>
                <tr>
                    <th>Cargo</th>
                    <th>Descrição</th>
                    <th>Cidade</th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="vaga in data">
                    <td>{{vaga.shortDescription}}</td>
                    <td>{{limitChars(vaga.longDescription)}}</td>
                    <td>{{vaga.city}} - {{vaga.state}}</td>
                </tr>

                </tbody>
            </table>


        </div>

    </div>

</template>

<script>
    export default {
        name: "ultimas-vagas-publicadas",
        props: {
            data: {}
        },
        methods: {
            limitChars: function(text) {
                let size = 35
                return text.substring(0, Math.min(size, text.length)) + (text.length>size ? '...' : '')
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
        height: 564px;
        /*padding-bottom: 64px !important;*/
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

    #component-table-container {
        color: white;
        opacity: 0.7;
        padding: 20px;
        /*overflow: hidden;*/
    }

    #component-table-container table {
        border-radius: 0.25rem;
    }
</style>
