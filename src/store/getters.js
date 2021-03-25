import { useLink } from "vue-router"

const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    openid: state => state.user.openid,
    link_id: state => state.user.link_id,
    user_id: state => state.user.user_id
}
export default getters