<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
            <div class="container-fluid px-sm-3 px-md-5">
                <router-link class="navbar-brand"
                :to="{ name: 'Landing' }"
                aria-current="page">
                    <img src="../assets/logo.png" alt="Bookmarks Plus" class="bp-logo">
                </router-link>
                <div class="order-lg-3 d-flex align-items-center">
                    <button class="navbar-toggler" type="button"
                        data-bs-toggle="collapse" data-bs-target="#toggleableNavItems"
                        aria-controls="toggleableNavItems" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="toggleableNavItems">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'About' }" exact>About</router-link>
                        </li>
                        <li class="nav-item">
                            <a target="__blank" class="nav-link" href="https://github.com/adamichelle/bookmarksplus">GitHub</a>
                        </li>
                    </ul>
                    <div class="ms-2">          
                        <button
                            v-if="showAuthButton && !isAuthenticated"
                            class="btn btn-bp-auth"
                            @click="login">
                            Get Started
                        </button>
                        <button 
                            v-if="isAuthenticated"
                            class="btn btn-bp-auth"
                            @click="logout">Log out</button>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
    computed: {
        ...mapState([
            'isAuthenticated',
            'showAuthButton'
        ])
    },
    methods: {
        ...mapMutations([
            'updateAuthenticationStatus',
        ]),
        async login() {
            try {
                await this.$auth0.loginWithPopup()
                this.updateAuthenticationStatus({ isAuthenticated: this.$auth0.isAuthenticated.value })
                await this.$router.push({ name: 'Home' })
            } catch(error) {
                console.log(error.message)
            }
        },
        logout() {
            this.$auth0.logout({ returnTo: window.location.origin })
        }
    }
};
</script>

<style scoped>
.bp-logo {
  height: auto;
  width: auto;
  max-height: 60px;
}

.btn-bp-auth {
    border: 1px solid #6B0F18;
    border-radius: 0.8rem;
    background: #6B0F18;
    color: #FFFFFF;
}

.btn-bp-auth:hover,
.btn-bp-auth:focus {
    background: #EB9486;
    border: initial;
    color: #FFFFFF;
}

.nav-link {
    color: #000500 !important;
    margin-right: 0.5rem;
}

.nav-link:hover {
    border-bottom: 1px solid #EB9486;
}
</style>