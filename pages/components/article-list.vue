<template>
  <div v-if="articles.length">
    <div v-for="(item, index) in articles" :key="item.slug" class="article-preview">
        <div class="article-meta">
          <nuxt-link
            :to="{
              path: 'profile',
              query: {
                username: item.author.username
              }
            }"
          ><img :src="item.author.image" /></nuxt-link>
          <div class="info">
            <nuxt-link
              :to="{
                path: 'profile',
                query: {
                  username: item.author.username
                }
              }"
              class="author"
            >{{item.author.username}}</nuxt-link>
            <span class="date">{{ item.createdAt | date('MMM DD, YYYY')}}</span>
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
          name: 'article',
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
export default {
  name: 'articleList',
  props: {
    articles: {
      type: Array,
      require: true
    }
  }
}
</script>

<style>

</style>