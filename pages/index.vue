<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>
          <articleList :articles="articleList"></articleList>
          <paging
            :pagingParams="pagingParams"
            @change="getArticleList"
            :currentPage="1"
          ></paging>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
import { fetchArticle } from '@/api/articles'
import articleList from '@/pages/components/article-list'
import paging from '@/pages/components/paging'
export default {
  components: {
    paging,
    articleList
  },
  async asyncData() {
    // 分页参数
    const pagingParams = {
      limit: 10,
      offest: 0,
      total: 0
    }
    const { data } = await fetchArticle({
      limit: pagingParams.limit,
      offest: pagingParams.offest,
    });
    const articleList = data.articles || [];
    pagingParams.total = data.articlesCount;
    articleList.forEach(item => item.disabled = false)
    return {
      pagingParams,
      articleList
    }
  },
  data() {
    return {};
  },
  methods: {
    async getArticleList (params) {
      const { data } = await fetchArticle(params);
      const { articles, articlesCount } = data;
      articles.forEach(item => item.disabled = false);
      this.articleList = articles;
      this.pagingParams.total = articlesCount;
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
