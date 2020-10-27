<template>

    <div class="view-container">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div id="component-container">
                        <div class="view-container-title">
                            <p>
                                Registrar novo usuário
                            </p>
                        </div>

                        <form class="component-input-container container">
                            <div class="row">
                                <div class="col-sm-6">

                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">account_circle</i>
                                        <input id="nome" type="text" class="white-text" v-bind:class="{ 'valid': validation.name === 'valid', 'invalid': validation.name === 'invalid' }" v-model="formData.name" @focus="operationFailed = false" @change="validateAll()">
                                        <label for="nome">Nome</label>
                                    </div>

                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">email</i>
                                        <input id="email" type="email" class="white-text" v-bind:class="{ 'valid': validation.email === 'valid', 'invalid': validation.email === 'invalid' }" v-model="formData.email" @focus="operationFailed = false" @change="validateAll()">
                                        <label for="email">E-mail</label>
                                    </div>

                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">add_location</i>
                                        <input id="address" type="text" class="white-text" v-bind:class="{ 'valid': validation.address === 'valid', 'invalid': validation.address === 'invalid' }" v-model="formData.address" @focus="operationFailed = false" @change="validateAll()">
                                        <label for="address">Endereço</label>
                                    </div>

                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">contact_phone</i>
                                        <input id="phoneNumber" type="text" class="white-text" v-bind:class="{ 'valid': validation.phoneNumber === 'valid', 'invalid': validation.phoneNumber === 'invalid' }" v-model="formData.phoneNumber" @focus="operationFailed = false" @input="maskPhoneNumber()" @change="validateAll()">
                                        <label for="phoneNumber">Telefone</label>
                                    </div>

                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">supervisor_account</i>
                                        <select v-model="formData.userType" @change="resetEmpresaData()" @focus="operationFailed = false">
                                            <option value="CANDIDATO">Candidato</option>
                                            <option value="EMPRESA">Empresa</option>
                                        </select>
                                        <label>Tipo de conta</label>
                                    </div>

                                </div>
                                <div class="col-sm-6">

                                    <div v-if="formData.userType === 'CANDIDATO'" class="input-field">
                                        <i class="large material-icons prefix grey-text">assignment_ind</i>
                                        <input id="cpf" type="text" class="white-text" v-bind:class="{ 'valid': validation.cpf === 'valid', 'invalid': validation.cpf === 'invalid' }" v-model="formData.cpf" @focus="operationFailed = false" @input="maskCpf()" @change="validateAll()">
                                        <label for="cpf">CPF</label>
                                    </div>

                                    <div v-if="formData.userType === 'EMPRESA'" class="input-field">
                                        <i class="large material-icons prefix grey-text">assignment_ind</i>
                                        <input id="cnpj" type="text" class="white-text" v-bind:class="{ 'valid': validation.cnpj === 'valid', 'invalid': validation.cnpj === 'invalid' }" v-model="formData.cnpj" @focus="operationFailed = false" @input="maskCnpj()" @change="validateAll()">
                                        <label for="cnpj">CNPJ</label>
                                    </div>

                                    <div v-if="formData.userType === 'EMPRESA'" class="input-field">
                                        <i class="large material-icons prefix grey-text">assessment</i>
                                        <input id="razaoSocial" type="text" class="white-text" v-bind:class="{ 'valid': validation.razaoSocial === 'valid', 'invalid': validation.razaoSocial === 'invalid' }" v-model="formData.razaoSocial" @focus="operationFailed = false" @change="validateAll()">
                                        <label for="razaoSocial">Razão social</label>
                                    </div>

                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">security</i>
                                        <input id="password" type="password" class="white-text" v-bind:class="{ 'valid': validation.password === 'valid', 'invalid': validation.password === 'invalid' }" v-model="formData.password" @focus="operationFailed = false" @change="validateAll()">
                                        <label for="password">Senha</label>
                                    </div>

                                    <div class="input-field">
                                        <i class="large material-icons prefix grey-text">security</i>
                                        <input id="passwordConfirm" type="password" class="white-text" v-bind:class="{ 'valid': validation.passwordConfirm === 'valid', 'invalid': validation.passwordConfirm === 'invalid' }" v-model="formData.passwordConfirm" @focus="operationFailed = false" @change="validateAll()">
                                        <label for="passwordConfirm">Confirma senha</label>
                                    </div>

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 center">
                                    <button v-if="!operationOngoing && !operationFailed && validationAll" class="waves-effect waves-light btn-small green darken-2 component-button" type="submit" name="action" @click="registerUser()">Registrar</button>
                                    <button v-if="operationOngoing && validationAll" class="waves-effect waves-light btn-small green darken-2 component-button disabled" type="submit" @click="registerUser()">Registrando...</button>
                                    <button v-if="!validationAll" class="waves-effect waves-light btn-small green darken-2 component-button disabled" type="submit" @click="registerUser()">Preencha todos os dados</button>
                                    <button v-if="!operationOngoing && operationFailed && validationAll" class="waves-effect waves-light btn-small red darken-2 component-button" type="submit" @click="registerUser()">Falha no registro</button>
                                </div>
                            </div>



                        </form>

                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import UserService from "../../services/UserService";
    import User from "../../core/User";
    import {API_CONFIG} from "../../sensitivedata/api-config";

    export default {
        name: "SignUp",
        mounted() {
            M.FormSelect.init(document.querySelectorAll('select'))
            $(".select-wrapper input.select-dropdown").css("color", 'white');
            // $(":input").inputmask();
        },
        data() {
            return {
                registerPath: API_CONFIG["base-path"] + API_CONFIG["sign-up"].register,
                user: UserService.getUser(),
                operationOngoing: false,
                operationFailed: false,
                formData: {
                    name: '',
                    address: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                    passwordConfirm: '',
                    userType: 'CANDIDATO',
                    cpf: '',
                    cnpj: '',
                    razaoSocial: ''
                },
                validation: {
                    name: 'pristine',
                    address: 'pristine',
                    phoneNumber: 'pristine',
                    email: 'pristine',
                    password: 'pristine',
                    passwordConfirm: 'pristine',
                    cpf: 'pristine',
                    cnpj: 'pristine',
                    razaoSocial: 'pristine'
                },
                validationAll: false
            }
        },
        methods: {
            validateAll: function() {
                this.validation = {
                    name: this.formData.name.length > 0 ? 'valid': 'invalid',
                    address: this.formData.address.length > 0 ? 'valid': 'invalid',
                    phoneNumber: this.formData.phoneNumber.replace(/\D/g, '').length === 11 ? 'valid': 'invalid',
                    email: this.formData.email.length > 0 && this.formData.email.includes('@') ? 'valid': 'invalid',
                    password: this.formData.password.length > 0 ? 'valid': 'invalid',
                    passwordConfirm: this.formData.passwordConfirm.length > 0 && this.formData.passwordConfirm === this.formData.password ? 'valid': 'invalid',
                    cpf: this.formData.userType ==='CANDIDATO' ? this.formData.cpf.replace(/\D/g, '').length === 11 ? 'valid' : 'invalid' : 'valid',
                    cnpj: this.formData.userType ==='EMPRESA' ? this.formData.cnpj.replace(/\D/g, '').length === 14 ? 'valid' : 'invalid' : 'valid',
                    razaoSocial: this.formData.userType ==='EMPRESA' ? this.formData.razaoSocial.length > 0 ? 'valid': 'invalid' : 'valid'
                }
                this.validationAll = Object.values(this.validation).every(item => item === 'valid')
            },
            resetEmpresaData: function() {
                this.formData.documentId = ''
                this.formData.razaoSocial = ''
                this.validation.razaoSocial = 'pristine'
                if (this.formData.userType === 'CANDIDATO') {
                    this.formData.cpf = ''
                    this.validation.cpf = 'pristine'
                } else {
                    this.formData.cnpj = ''
                    this.validation.cnpj = 'pristine'
                }
                this.validateAll()
            },
            maskPhoneNumber: function() {
                let phoneFormat = '(__) _____-____'
                let numbers = this.formData.phoneNumber.replace(/\D/g, '').split('')
                numbers.forEach(item => {
                    phoneFormat = phoneFormat.replace('_', item)
                })
                this.formData.phoneNumber = phoneFormat
            },
            maskCpf: function() {
                let cpfFormat = '___.___.___-__'
                let numbersCpf = this.formData.cpf.replace(/\D/g, '').split('')
                numbersCpf.forEach(item => cpfFormat = cpfFormat.replace('_', item))
                this.formData.cpf = cpfFormat
            },
            maskCnpj: function() {
                let cnpjFormat = '__.___.___/____-__'
                let numbersCnpj = this.formData.cnpj.replace(/\D/g, '').split('')
                numbersCnpj.forEach(item => cnpjFormat = cnpjFormat.replace('_', item))
                this.formData.cnpj = cnpjFormat
            },
            registerUser: function () {
                this.operationOngoing = true
                fetch(this.registerPath, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 0,
                        name: this.formData.name,
                        address: this.formData.address,
                        phoneNumber: this.formData.phoneNumber,
                        email: this.formData.email,
                        password: this.formData.password,
                        userType: this.formData.userType,
                        documentId: this.formData.userType === 'CANDIDATO' ? this.formData.cpf : this.formData.cnpj,
                        razaoSocial: this.formData.razaoSocial
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        this.operationOngoing = false
                        UserService.setUser(
                            new User(
                                data.id,
                                data.name,
                                data.userType,
                                data.documentId,
                                data.email
                            )
                        )
                        this.$router.push({path: 'home'});
                    })
                    .catch(err => {
                        this.operationOngoing = false
                        this.operationFailed = true
                        console.error('Failed retrieving data : ' + err);
                    })
            },
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

    .component-input-container {
        padding-right: 20px !important;
        padding-left: 20px !important;
        margin-top: 10px;
    }

    @media only screen and (max-width: 575px) {
        .view-container {
            margin-top: 20px;
            padding-bottom: 50px;
            /*padding-right: 0 !important;*/
            margin-left: 0 !important;
            margin-right: 0 !important;
            width: 100%;
            /*background: purple;*/
            /*background-color: rgba(255, 0, 0, 0.1);*/

        }
        .col-sm-12 {
            padding-left: 0px;
            padding-right: 0px;
        }
    }

    @media only screen and (min-width: 576px) {
        .view-container {
            margin-top: 20px;
            padding-bottom: 50px;

            /*width: 100%;*/
            /*background-color: rgba(255, 0, 0, 0.1);*/
        }
    }
</style>
