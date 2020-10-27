import Vue from 'vue'
import Router from 'vue-router'
import SignIn from "./views/SignIn/SignIn";
import Home from "./views/Home/Home";
import SignUp from "./views/SignUp/SignUp";
import PublishVaga from "./views/PublishVaga/PublishVaga";
// import UserService from "./services/UserService";
import AddCriterios from "./views/PublishVaga/AddCriterios";
import ResponderVaga from "./views/ResponderVaga/ResponderVaga";
import Ranking from "./views/Ranking/Ranking";

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'signin',
            component: SignIn
        },
        {
            path: '/signin',
            name: 'signin',
            component: SignIn
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUp
        },
        {
            path: '/publishvaga',
            name: 'publishvaga',
            component: PublishVaga
        },
        {
            path: '/addcriterios',
            name: 'addcriterios',
            component: AddCriterios,
            props: true
        },
        {
            path: '/respondervaga',
            name: 'respondervaga',
            component: ResponderVaga,
            props: true
        },
        {
            path: '/ranking',
            name: 'ranking',
            component: Ranking,
            props: true
        },
        // {
        //     path: '/add',
        //     name: 'add',
        //     component: () => import('./views/NewContact.vue'),
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
        // {
        //     path: '/update/:item/:itemkey',
        //     name: 'update',
        //     component: Update,
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
    ]
})

// router.beforeEach((to, from, next) => {
//     const currentUser = auth.currentUser;
//     const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//     if (requiresAuth && !currentUser) {
//         next('contacts');
//     }
//     else if (!requiresAuth && currentUser) {
//         next();
//     }
//     else {
//         next();
//     }
// });

export default router;
