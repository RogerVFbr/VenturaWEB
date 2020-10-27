<template>

    <div id="search-bar-container">
        <div class="container">
            <div class="row">
                <div class="col-sm-7">
                    <div class="input-field">
                        <i class="large material-icons prefix grey-text">search</i>
                        <input id="content" type="text" v-model="searchParams.content" class="validate white-text">
                        <label for="content">Busca</label>
                    </div>
                </div>

                <div class="col-sm-3">
                    <div class="input-field">
                        <select v-model="searchParams.type">
                            <option value="ALL">Todas</option>
                            <option value="ANY">Qualquer uma</option>
                            <option value="NONE">Nenhuma</option>
                        </select>
                        <label>Tipo de busca</label>
                    </div>
                </div>

                <div class="col-sm-2">
                    <button v-if="onReady" class="waves-effect waves-light btn-small blue darken-2 component-button buscar-button" type="submit" @click="onSearch()">Buscar</button>
                    <button v-if="!onReady" class="waves-effect waves-light btn-small component-button disabled buscar-button" type="submit">Buscando...</button>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "SearchBar",
        props: {
            searchCallback: {},
            onReady: {}
        },
        mounted() {
            M.FormSelect.init(document.querySelectorAll('select'))
            $(".select-wrapper input.select-dropdown").css("color", 'white');
        },
        data() {
            return {
                searchParams: {
                    content: '',
                    type: 'ALL'
                }
            }
        },
        methods: {
            onSearch: function() {
                this.searchCallback({
                    content: this.searchParams.content,
                    type: this.searchParams.type
                })
            }
        }
    }
</script>

<style scoped>

    #search-bar-container {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 0.25rem;
        margin-top: 15px;
    }

    .buscar-button {
        width: 100%;
        margin-top: 18px;
    }

    @media only screen and (max-width: 575px) {
        #search-bar-container {
            padding-top: 8px;
        }

        .buscar-button {
            margin-bottom: 20px;
            height: 40px;
        }
    }

    @media only screen and (min-width: 576px) {
        #search-bar-container {
            padding-top: 16px;
        }

        .buscar-button {
        }
    }

</style>
