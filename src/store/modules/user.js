// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        //token: getToken(),
        token: '',
        openid: '',
        avatar: '',
        link_id: undefined,
        user_id: undefined,
        title: '',
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_OPENID: (state, openid) => {
        state.openid = openid
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_LINK: (state, link_id) => {
        state.link_id = link_id
    },
    SET_USERID: (state, user_id) => {
        state.user_id = user_id
    },
    SET_TITLE: (state, title) => {
        state.title = title
    }
}

const actions = {
    setInfo({ commit }, userInfo) {
        return new Promise(resolve => {
            commit('SET_OPENID', userInfo.openid) //可以修改为openid
            commit('SET_AVATAR', userInfo.avatar)
            resolve()
        })
    },
    setLinkId({ commit }, link_id) {
        return new Promise(resolve => {
            commit('SET_LINK', link_id)
            resolve()
        })
    },
    setUserId({ commit }, user_id) {
        return new Promise(resolve => {
            commit('SET_USERID', user_id)
            resolve()
        })
    },
    setTitle({ commit }, title) {
        return new Promise(resolve => {
            commit('SET_TITLE', title)
            resolve()
        })
    },
    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}