<template>
  <div>
    <div class="article-meta">
      <nuxt-link
        :to="{
            name: 'profile-username',
            params: {
              username: authInfo.username
            }
          }"
        >
          <img :src="authInfo.author.image" />
        </nuxt-link>
      <div class="info">
        <nuxt-link
          :to="{
            name: 'profile-username',
            params: {
              username: authInfo.author.username
            }
          }"
          class="author"
        >{{authInfo.author.username}}
        </nuxt-link>
        <span class="date">{{authInfo.createdAt | date('MMM D, YYYY')}}</span>
      </div>
      <button v-if="!isMe" @click="handlerFollow" class="btn btn-sm btn-outline-secondary">
        <i class="ion-plus-round"></i>
        &nbsp;
        {{authInfo.author.following ? 'Unfollow' : 'Follow'}} {{authInfo.author.username}}
      </button>
      &nbsp;&nbsp;
      <button v-if="!isMe" @click="handlerLike" class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp;
        {{authInfo.favorited ? 'Unfavorite Article' : 'Favorite Article'}} <span class="counter">({{authInfo.favoritesCount}})</span>
      </button>
    </div>
  </div>
</template>

<script>
import { checkLogin } from '@/pages/utils/checklogin'
import { followUser, UnfollowUser } from '@/api/profile'
import { fetchLike, fetchUnLike } from '@/api/articles'

export default {
  name: 'articleMeta',
  props: {
    authInfo: {
      type: Object
    }
  },
  data () {
    return {
      isMe: false
    }
  },
  mounted () {
    this.isMe = this.authInfo.author.username === this.$store.state.user.username
  },
  methods: {
    async handlerFollow () {
      if (!checkLogin()) {
        return this.$router.push('/login/siginUp');
      };
      const { author } = this.authInfo;
      const { data } = author.following ? await UnfollowUser(author.username) : await followUser(author.username);
      this.authInfo.author.following = data.profile.following;
    },
    async handlerLike () {
      if (!checkLogin()) {
        return this.$router.push('/login/siginUp');
      };
      const favorited = this.authInfo.favorited;
      if (favorited) {
        await fetchUnLike(this.authInfo.slug);
        this.authInfo.favoritesCount -= 1
      } else {
        await fetchLike(this.authInfo.slug);
        this.authInfo.favoritesCount += 1
      }
      this.authInfo.favorited = !favorited;
    },
  }
}
</script>

<style>

</style>