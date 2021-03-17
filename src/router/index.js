import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Register from '../views/Register'

const routes = [{
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router