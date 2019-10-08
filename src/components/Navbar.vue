<template>

    <nav>
        <div class="nav-wrapper purple darken-4">
            <div class="container">
                <a href="#" class="brand-logo left"><i class="large material-icons">assignment_ind</i>FaceAuth</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
<!--                    <li><a href="sass.html">Sass</a></li>-->
                    <li><a href="badges.html" class="routerlinks">Registrations</a></li>
                    <li><router-link to="/test" class="routerlinks">Successful reckons</router-link></li>
                    <li><router-link to="/test" class="routerlinks">Failed reckons</router-link></li>
                    <!--<span v-if="isLogged" class="username">{{userEmail}}</span>-->
                    <button v-if="!isLogged" class="waves-effect waves-light btn-small blue darken-2" type="submit" @click="$router.push('login')">Login</button>
                    <button v-if="isLogged" class="waves-effect waves-light btn-small blue darken-2" type="submit" @click="logout">Logout</button>
                </ul>
            </div>
        </div>
    </nav>

    <!--<nav class="navbar navbar-expand-lg navbar-light bg-light navbar-custom">-->
        <!--<a class="navbar-brand" href="#">-->
            <!--<img src="../assets/ev-logo-round.png" class="navbar-logo" height="50" width="70"/>-->
            <!--EV Contacts-->
        <!--</a>-->
        <!--<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">-->
            <!--<span class="navbar-toggler-icon"></span>-->
        <!--</button>-->
        <!--<div class="collapse navbar-collapse" id="navbarSupportedContent">-->
            <!--<ul class="navbar-nav mr-auto">-->
                <!--<li class="nav-item">-->
                    <!--<router-link class="nav-link" to="/">People</router-link>-->
                <!--</li>-->
                <!--<li class="nav-item">-->
                    <!--<router-link class="nav-link" to="/log">Log</router-link>-->
                <!--</li>-->
                <!--<li class="nav-item">-->
                    <!--<router-link class="nav-link" to="/test">Latest Reckons</router-link>-->
                <!--</li>-->
            <!--</ul>-->
            <!--<div class="my-2 my-lg-0">-->
                <!--<span v-if="isLogged" class="username">{{userEmail}}</span>-->
                <!--<button v-if="!isLogged" class="btn btn-success my-2 my-sm-0" type="submit" @click="$router.push('login')">Login/Register</button>-->
                <!--<button v-if="isLogged" class="btn btn-secondary my-2 my-sm-0" type="submit" @click="logout">Logout</button>-->
            <!--</div>-->
        <!--</div>-->
    <!--</nav>-->
</template>

<script>

    import { auth } from '../sensitivedata/firebase';

    export default {
        name: "navbar",
        created() {
            if (auth.currentUser) {
                this.isLogged = true;
                this.userEmail = auth.currentUser.email;
            }
        },
        data() {
            return {
                isLogged: false,
                userEmail: '',

            }
        },
        methods: {
            logout: function () {
                auth.signOut().then(() => {
                    this.$router.go({path: this.$router.path});
                })
            }
        }
    }
</script>

<style scoped>

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

</style>