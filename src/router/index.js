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
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router