<template>
  <div>
    <div v-for="(item, index) in articles" :key="item.slug" class="article-preview">
        <div class="article-meta">
          <a href=""><img :src="item.author.image" /></a>
          <div class="info">
            <a href="" class="author">{{item.author.username}}</a>
            <span class="date">January 20th</span>
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
        <a href="" class="preview-link">
          <h1>{{ item.title }}</h1>
          <p>{{ item.description }}</p>
          <span>Read more...</span>
        </a>
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