<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <!-- 内容 -->
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <!-- typs -->
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  v-if="user"
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
              <li v-if="currentType === 'tag'" class="nav-item">
                <a
                  class="nav-link"
                  :class="[currentType === 'tag' ? 'active' : '']"
                > # {{ tagName }}</a>
              </li>
            </ul>
          </div>
          <!-- 文章列表 -->
          <articleList :articles="articleList"></articleList>
          <div v-if="!articleList.length" class="loading">Loading article</div>
          <!-- 分页 -->
          <paging
            :pagingParams="pagingParams"
            @change="pagingChange"
            :total="articlesCount"
            ref="paging"
          ></paging>
        </div>
        <!-- 标签 -->
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <a
                @click.prevent="handleClickTag(item)"
                v-for="(item, index) in tags"
                :key="index"
                class="tag-pill tag-default"
                :class="{
                  active: item === tagName
                }"
              >
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
  data () {
    return {
      tagName: '', // 保存标签
      apiLock: false,
    }
  },
  async asyncData({ store }) {
    const { user } = store.state;
    // 已登录定位到关注流
    const currentType = user ? 'follow' : 'global';
    // 分页参数
    const pagingParams = { limit: 10, offset: 0 };
    const getBaseInfo = currentType === 'follow' ? fetchFollowArticle : fetchArticle;
    const [articlesRep, tagsRep] = await Promise.all([
      getBaseInfo(pagingParams),
      fetchTagsArticle()
    ])
    const { articles: articleList, articlesCount } = articlesRep.data;
    const { tags } = tagsRep.data;
    // 处理文章
    articleList.forEach(item => item.disabled = false);
    return {
      pagingParams,
      articleList,
      articlesCount: articlesCount,
      tags,
      currentType,
      user
    }
  },
  methods: {
    async getArticleList () {
      if (this.apiLock) return;
      this.apiLock = true;
      const params = { ...this.pagingParams };
      if (this.tagName) {
        params.tag = this.tagName
      }
      const { data } = this.currentType === 'follow' ? await fetchFollowArticle(params) : await fetchArticle(params);
      const { articles, articlesCount } = data;
      articles.forEach(item => item.disabled = false);
      this.articleList = articles;
      this.articlesCount = articlesCount;
      this.apiLock = false;
    },
    // 点击分页
    pagingChange(event) {
      this.pagingParams.offset = event.offset;
      this.getArticleList();
    },
    // 切换tap
    selsectType(type) {
      if (this.currentType === type) return;
      this.pagingParams.offset = 0;
      this.currentType = type;
      this.tagName = '';
      this.articleList = [];
      this.articlesCount = 0;
      this.$refs.paging.currentPage = 1;
      this.getArticleList()
    },
    // 选择tag
    handleClickTag (tag) {
      this.currentType = 'tag';
      this.tagName = tag;
      this.pagingParams.offset = 0;
      this.getArticleList();
    }
  }
};
</script>
<style scoped>
  .nav-link, .tag-pill {
    cursor: pointer;
  }
  .loading {
    padding-top: 20px;
    text-align: center;
  }
  .tag-pill.active {
    background-color: #687077;
  }
</style>
