import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user'

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user
    },
    getters
})
export default store