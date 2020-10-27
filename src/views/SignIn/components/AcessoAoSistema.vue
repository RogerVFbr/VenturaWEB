<template>
    <div id="component-container" class="container">
        <div class="view-container-title">
            <p>
                Acesso ao sistema
            </p>
        </div>

        <div id="component-input-container">

            <div class="input-field">
                <i class="large material-icons prefix grey-text">account_circle</i>
                <input id="email" type="email" class="validate white-text" v-model="email" @focus="onChange">
                <label for="email">E-mail</label>
            </div>

            <div class="input-field">
                <i class="large material-icons prefix grey-text">security</i>
                <input id="password" type="password" class="validate white-text" v-model="password" @focus="onChange">
                <label for="password">Senha</label>
            </div>
            <div class="center-align">
                <button v-if="!isAutorizando && authorization" class="waves-effect waves-light btn-small blue darken-2 component-button" type="submit" @click="getAuthData">Entrar</button>
                <button v-if="isAutorizando && authorization" class="waves-effect waves-light btn-small darken-2 component-button disabled" type="submit" @click="">Autorizando ...</button>
                <button v-if="!authorization" class="waves-effect waves-light btn-small red darken-2 component-button" type="submit" @click="">Não autorizado</button>
            </div>

        </div>

    </div>

</template>

<script>
    export default {
        name: "acesso-ao-sistema",
        props: {
            authorization: {},
            callback: {},
            change: {}
        },
        watch: {
            authorization: function(newVal, oldVal) { // watch it
                this.isAutorizando = false
            }
        },
        data () {
            return {
                isAutorizando: false,
                email: '',
                password: ''
            }
        },
        methods: {
            getAuthData: function() {
                this.isAutorizando = true
                this.callback(this.email, this.password)
            },
            onChange: function() {
                this.change()
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
        height: 260px;
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

    #component-input-container {
        padding-left: 15px;
        padding-right: 20px;
        padding-bottom: 5px;
        align-content: center !important;
    }

    .component-button {
        /*height: 42px;*/
        width: 70% !important;
    }

    button {
        margin-top: 5px;
        margin-bottom: 15px;
    }
</style>
