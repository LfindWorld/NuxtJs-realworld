<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up'}}</h1>
          <p v-if="!isLogin" class="text-xs-center">
            <nuxt-link to="/login/siginIn">Have an account?</nuxt-link>
          </p>

          <ul v-if="error" class="error-messages">
             <template
              v-for="(messages, field) in error"
            >
              <li
                v-for="(message, index) in messages"
                :key="index"
              >{{ field }} {{ message }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input v-if="!isLogin" v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" minlength="6" required>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'loginIndex',
  middleware: 'notAuthenticated',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      error: null,
      isLogin: this.$route.params.type === 'siginIn'
    }
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = this.isLogin ? await login({
          user: this.user
        }) : await register({
          user: this.user
        })
        const { user } = data;
        // 使用cookie 持久化登录状态
        this.$store.commit('setUser', user)
        Cookie.set('user', user)
        this.$router.push('/')
      } catch (err) {
        console.log(err.response.data.errors);
        this.error = err.response.data.errors;
      }
    }
  }
}
</script>

<style>

</style>