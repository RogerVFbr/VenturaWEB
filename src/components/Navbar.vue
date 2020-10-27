<template>

    <nav>
        <div class="nav-wrapper purple darken-4">
            <div class="container">
                <a v-if="isLogged" href="#/home" class="brand-logo left"><i class="large material-icons">work</i>VenturaHR</a>
                <a v-if="!isLogged" href="#/" class="brand-logo left"><i class="large material-icons">work</i>VenturaHR</a>
                <a href="#" v-if="isLogged" data-target="mobile-demo" class="sidenav-trigger right"><i class="material-icons">menu</i></a>
                <ul id="nav-mobile" class="right hide-on-med-and-down" v-if="isLogged">
<!--                    <li><router-link to="/users" class="routerlinks">Editar perfil</router-link></li>-->
                    <!-- Dropdown Trigger -->
<!--                    <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Logs<i class="material-icons right">arrow_drop_down</i></a></li>-->
                    <!-- Dropdown Structure -->
<!--                    <ul id="dropdown1" class="dropdown-content">-->
<!--                        <li><router-link to="/register-log" class="routerlinks">Registrations</router-link></li>-->
<!--                    </ul>-->

                    <button v-if="isLogged" class="waves-effect wavese-light btn-small blue darken-2 logout-button" type="submit" @click="logout()">Logout</button>
                </ul>
            </div>
        </div>

        <ul v-if="isLogged" class="sidenav purple darken-4" id="mobile-demo">
<!--            <li><a class="routerlinks" @click="sideNavbarNavigate('users')">Editar perfil</a></li>-->
<!--            <li><div class="divider"></div></li>-->
<!--            <li><a class="subheader">Logs</a></li>-->
<!--            <li><a class="routerlinks" @click="sideNavbarNavigate('register-log')">Registrations</a></li>-->
            <button class="waves-effect wavese-light btn-small blue darken-2" type="submit" @click="logoutSideNavBar()">Logout</button>
        </ul>

        <floating-action-button :show="userType === 'EMPRESA' && showActionButton && currentRouteName === 'home'"
                                :onclick="onClickActionButton"
                                class="pulse"
        />

    </nav>

</template>

<script>

    import UserService from "../services/UserService";
    import FloatingActionButton from "./FloatingActionButton";

    export default {
        name: "navbar",
        components: {
            FloatingActionButton
        },
        created() {
            let user = UserService.getUser()
            if (user != null) {
                this.isLogged = true;
                this.userType = user.userType
            }
            else {
                this.isLogged = false
                this.userType = ''
            }
        },
        mounted() {
            M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
            this.sideBarInstance = M.Sidenav.init(document.querySelectorAll('.sidenav'));
            M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'))
        },
        data() {
            return {
                isLogged: false,
                userType: '',
                sideBarInstance: '',
                showActionButton: true,
                currentRouteName: this.$route.name
            }
        },
        methods: {
            logout: function () {
                this.isLogged = false;
                this.userType = ''
                UserService.logout()
                this.$router.push({path: '/'});
            },
            logoutSideNavBar: function () {
                setTimeout(() => {
                    this.isLogged = false;
                    this.userType = ''
                }, 250)
                UserService.logout()
                this.sideNavbarNavigate('/');
            },
            sideNavbarNavigate: function (dest) {
                var elem = document.querySelector('.sidenav');
                var instance = M.Sidenav.getInstance(elem);
                instance.close();
                setTimeout(() => {
                    this.$router.push({path: dest});
                }, 200)
            },
            onClickActionButton: function () {
                this.showActionButton = false;
                setTimeout(() => {
                    this.$router.push({path: 'publishvaga'});
                    setTimeout(() => {
                        this.showActionButton = true;
                    }, 200)
                }, 200)
            },
        }
    }
</script>

<style scoped>


    #dropdown1 {
        width: 200px !important;
        color: black;
    }

    #dropdown1 .routerlinks{
        color: black;
    }

    nav ul a{
        text-decoration: none !important;
        opacity: 0.7;
        color: white;
        transition: all 0.2s ease-out;
    }

    nav ul a:hover {
        color: white !important;
        opacity: 1;
    }

    .sidenav li > a {
        text-decoration: none !important;
        opacity: 0.7;
        color: white;
        transition: all 0.2s ease-out;
    }

    .navbar-custom {
        background: rgba(99, 202, 193, 1) !important;
        text-color: white !important;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, .25)
    }

    nav .brand-logo {
        position: relative !important;
    }

    .username {
        margin-right: 10px;
    }

    .routerlinks {
        text-decoration: none !important;
        opacity: 0.7;
        color: white;
        transition: all 0.2s ease-out;
    }

    .routerlinks:hover {
        color: white !important;
        opacity: 1;
    }

    .logout-button {
        margin-left: 15px;
    }

    .brand-logo {
        color: rgba(255, 255, 255, 0.95);
        transition: 0.3s;
    }

    .brand-logo:hover {
        color: rgba(255, 255, 255, 1);
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        text-decoration: none;
    }

    .sidenav-trigger:hover {
        text-decoration: none;
        color: rgba(255, 255, 255, 1);
    }

    @media only screen and (max-width: 600px) {
        .extramargin {
            margin-left: 20px;
            margin-right: 20px;
        }
    }

</style>
