<template>
  <div class="layouts">
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/home" >conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
              <nuxt-link class="nav-link" to="/home" exact>Home</nuxt-link>
            </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/eitor" exact>
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{
                name: 'profile-username',
                params: {
                  username: user.username
                }
              }" exact>
                <img class="user-pic" :src="user.image">
                {{user.username}}
              </nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login/siginIn" exact>Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login/siginUp" exact>Sign up</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <nuxt />
    <footer>
      <div class="container">
        <nuxt-link class="logo-font" to="/home">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'defaultIndex',
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    console.log("mounted");
  },
  methods: {},
};
</script>
<style lang='scss' scoped>
</style>
