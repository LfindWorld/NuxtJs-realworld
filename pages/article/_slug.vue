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
          <p>{{ article.body}}</p>

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

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              <button class="btn btn-sm btn-primary">
              Post Comment
              </button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script>
import { fetchArticleInfo } from '@/api/articles'
import articleMeta from './components/article-meta'
export default {
  name: 'articleIndex',
  middleware: 'authenticated',
  components: {
    articleMeta
  },
  async asyncData({ params }) {
    const { slug } = params;
    const { data } = await fetchArticleInfo(slug);
    const { article } = data;
    return {
      article
    }
  }
}
</script>

<style>

</style>