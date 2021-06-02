<template>
  <div v-if="articles.length">
    <div v-for="(item, index) in articles" :key="item.slug" class="article-preview">
        <div class="article-meta">
          <nuxt-link
            :to="{
              name: 'profile-username',
              params: {
                username: item.author.username
              }
            }"
          ><img :src="item.author.image" /></nuxt-link>
          <div class="info">
            <nuxt-link
              :to="{
                name: 'profile-username',
                params: {
                  username: item.author.username
                }
              }"
              class="author"
            >{{item.author.username}}</nuxt-link>
            <span class="date">{{ item.createdAt | date('MMM D, YYYY')}}</span>
          </div>
          <button
            class="btn btn-sm pull-xs-right"
            :class="[item.favorited?'btn-primary':'btn-outline-primary']"
            @click="handlerLike(item, index)"
            :disabled="item.disabled"
          >
            <i class="ion-heart"></i>
            {{item.favoritesCount}}
          </button>
        </div>
        <nuxt-link :to="{
          name: 'article-slug',
          params: {
            slug: item.slug
          }
        }" class="preview-link">
          <h1>{{ item.title }}</h1>
          <p>{{ item.description }}</p>
          <span>Read more...</span>
        </nuxt-link>
      </div>
  </div>
</template>

<script>
import { fetchLike, fetchUnLike } from '@/api/articles'
import { checkLogin } from '@/pages/utils/checklogin'
export default {
  name: 'articleList',
  props: {
    articles: {
      type: Array,
      require: true
    }
  },
  methods: {
    async handlerLike (event, index) {
      if (!checkLogin()) {
        return this.$router.push('/login/siginUp');
      };
      const { favorited, slug } = event;
      const article = this.articles[index];
      article.disabled = true;
      if (favorited) {
        await fetchUnLike(slug);
        article.favoritesCount -= 1
      } else {
        await fetchLike(slug);
        article.favoritesCount += 1
      }
      article.favorited = !favorited;
      article.disabled = false;
    },
  }
}
</script>

<style>

</style>