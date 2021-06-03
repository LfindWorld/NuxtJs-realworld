<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>
        <articleMeta :authInfo="article"></articleMeta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>{{ article.description }}</p>
          <p v-html="article.body"></p>

          <ul class="tag-list">
            <li v-for="item in article.tagList" :key="item" class="tag-default tag-pill tag-outline">
              {{item}}
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="article-actions">
        <articleMeta :authInfo="article"></articleMeta>
      </div>
      <!-- 评论组件 -->
      <articleComment
        :comments="commentList"
        @submitComment="addComment"
        @removeComment="handlerRemoveComment"
      ></articleComment>
    </div>

  </div>

</template>

<script>

import { fetchArticleInfo, fetchArticleComment, fetchArticlePublishComment, fetchArticleRemoveComment } from '@/api/articles'
import articleMeta from './components/article-meta'
import articleComment from './components/article-comment'
export default {
  name: 'articleIndex',
  middleware: 'authenticated',
  components: {
    articleMeta,
    articleComment
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
  },
  data() {
    return {
      commentList: []
    }
  },
  async asyncData({ params }) {
    const { slug } = params;
    const { data } = await fetchArticleInfo(slug);
    const { article } = data;
    return {
      article,
      slug
    }
  },
  mounted() {
    this.getComment();
  },
  methods: {
    async getComment() {
      const { data } = await fetchArticleComment(this.slug);
      this.commentList = data.comments;
    },
    async addComment(text) {
      await fetchArticlePublishComment(
        this.slug,
        {
          comment: {
            body: text
          }
        }
      );
      this.getComment();
    },
    async handlerRemoveComment(id) {
      await fetchArticleRemoveComment(this.slug, id);
      this.getComment();
    }
  }
}
</script>

<style>

</style>