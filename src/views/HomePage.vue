<template>
    Users page
    {{ user }}
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            user: this.$auth0.user
        }
    }
}
</script>