import { createStore } from 'vuex';

export default createStore({
    state: {
        showAuthButton: true,
        isAuthenticated: false,
        user: null
    },
    mutations: {
        updateAuthButtonVisibility(state, { fullPath }) {
            state.showAuthButton = fullPath === '/' || fullPath === '/about'
        },
        updateAuthenticationStatus(state, { isAuthenticated }) {
            state.isAuthenticated = isAuthenticated
        },
        updateUserInformation(state, { user }) {
            state.user = user
        }
    }
})