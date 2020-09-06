<template>
    <b-navbar class="is-white" :fixed-top="true" :shadow="true">
        <!-- basic navbar with links -->
        <template slot="brand">
            <b-navbar-item>
                <img src="../assets/tiny.svg" alt="Tini-Tiny">
            </b-navbar-item>
        </template>
        <template  slot="start">
            <b-navbar-item href="https://www.tiny.cloud/">
                TinyMCE
            </b-navbar-item>
            <b-navbar-item href="https://www.tiny.cloud/blog/">
                Blogs
            </b-navbar-item>
            <b-navbar-item href="https://www.tiny.cloud/docs/">
                Documentaion
            </b-navbar-item>
            <b-navbar-item  href="https://about.tiny.cloud/">
                Learn More
            </b-navbar-item>
        
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons pr-5" @click="SignIn">
                    <a class="button is-dark">
                        <strong>Sign in</strong>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        SignIn(){
            window.open("https://www.tiny.cloud/auth/login/", "_blank");
        }
    }
}
</script>

<style scoped>

</style>