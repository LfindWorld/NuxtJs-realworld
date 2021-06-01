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
                <a
                  @click.prevent="selsectType('follow')"
                  class="nav-link"
                  :class="[currentType === 'follow' ? 'active' : '']"
                >Your Feed</a>
              </li>
              <li class="nav-item">
                <a
                  @click.prevent="selsectType('global')"
                  class="nav-link"
                  :class="[currentType === 'global' ? 'active' : '']"
                >Global Feed</a>
              </li>
            </ul>
          </div>
          <articleList :articles="articleList"></articleList>
          <div v-if="!articleList.length">Loading article</div>
          <paging
            :pagingParams="pagingParams"
            @change="pagingChange"
            :total="articlesCount"
            ref="paging"
          ></paging>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a
                @click.prevent="handleClickTag(item)"
                v-for="(item, index) in tags"
                :key="index"
                class="tag-pill tag-default">
                {{ item }}
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
import { fetchArticle, fetchFollowArticle, fetchTagsArticle } from '@/api/articles'
import articleList from '@/pages/components/article-list'
import paging from '@/pages/components/paging'
export default {
  components: {
    paging,
    articleList
  },
  data() {
    return {
      currentType: 'global',
    };
  },
  async asyncData() {
    // 分页参数
    const pagingParams = {
      limit: 10,
      offest: 0,
    }
    const [articlesRep, tagsRep] = await Promise.all([
      fetchArticle({
        limit: pagingParams.limit,
        offest: pagingParams.offest,
      }),
      fetchTagsArticle()
    ])
    const { articles: articleList, articlesCount } = articlesRep.data;
    articleList.forEach(item => item.disabled = false);

    const { tags } = tagsRep.data;
    return {
      pagingParams,
      articleList,
      articlesCount: articlesCount,
      tags
    }
  },

  methods: {
    async getArticleList (params, type = 'global') {
      const { data } = type === 'follow' ? await fetchFollowArticle(params) : await fetchArticle(params);
      const { articles, articlesCount } = data;
      articles.forEach(item => item.disabled = false);
      this.articleList = articles;
      this.articlesCount = articlesCount;
    },
    pagingChange(event) {
      this.getArticleList({
        limit: this.pagingParams.limit,
        offset: event.offset,
      })
    },
    selsectType(type) {
      if (this.currentType === type) return;
      this.articleList = [];
      this.articlesCount = 0;
      this.currentType = type;
      this.$refs.paging.currentPage = 1;
      this.getArticleList(this.pagingParams, type)
    },
    handleClickTag (tag) {
      this.getArticleList({
        ...this.pagingParams,
        tag: tag
      })
    }
  }
};
</script>
<style scoped>
  .nav-link {
    cursor: pointer;
  }
</style>
