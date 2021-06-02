<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

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

          <form @submit.prevent="handlerSubmit">
            <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" placeholder="URL of profile picture" v-model="userInfo.image">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="userInfo.username" required>
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="userInfo.bio"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="userInfo.email" required>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="userInfo.password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>
          <button @click="handlerLogout" class="btn btn-outline-danger">
            Or click here to logout.
          </button>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import { fetchUpdateUser } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'authenticated',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      userInfo: {},
      error: null,
    }
  },
  mounted () {
    this.userInfo = {
      ...this.user,
      password: ''
    }
  },
  methods: {
    async handlerSubmit () {
      try {
        const { email, username, password, image, bio } = this.userInfo;
        const params = {
          email,
          username,
        }
        if (bio) {
          params.bio = bio
        }
        if (password) {
          params.password = password
        }
        if (image) {
          params.image = image
        }
        const { data } = await fetchUpdateUser(params);
        const { user } = data;
        // 使用cookie 持久化登录状态
        this.$store.commit('setUser', user);
        Cookie.set('user', user);
        this.$router.push({
          name: 'profile-username',
          params: {
            username: user.username
          }
        })
      } catch (err) {
        this.error = err.response.data.errors;
      }
    },
    handlerLogout () {
      this.$store.commit('setUser', null);
      Cookie.remove('user');
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>