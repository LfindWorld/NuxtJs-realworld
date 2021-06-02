<template>
  <div class="profile-page">
    <!-- 用户信息 -->
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userInfo.image || staticImg" class="user-img" />
            <h4>{{ userInfo.username }}</h4>
            <p>
              {{ userInfo.bio }}
            </p>
            <nuxt-link v-if="user && user.username === userInfo.username" class="btn btn-sm btn-outline-secondary action-btn" to="/settings">
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            <button v-else @click="handlerFollow" class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              {{userInfo.following ? 'Unfollow' : 'Follow'}} {{userInfo.username}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 用户文章 -->
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <!-- tab -->
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  @click.prevent="changeTabs('myArticle')"
                  :class="{
                    active: currentType === 'myArticle'
                  }"
                  class="nav-link"
                >My Articles</a>
              </li>
              <li class="nav-item">
                <a
                  @click.prevent="changeTabs('favoritedArticles')"
                  :class="{
                    active: currentType === 'favoritedArticles'
                  }"
                  class="nav-link"
                >Favorited Articles</a>
              </li>
            </ul>
          </div>
          <div>
            <!-- 文章 -->
            <articleList :articles="articlesList"></articleList>
          </div>
          <template v-if="isLoading">
            <p>loading articles</p>
          </template>
        </div>
      </div>
      <paging
        :pagingParams="pagingParams"
        @change="pagingChange"
        :total="articlesCount"
        ref="paging"
      ></paging>
    </div>

  </div>

</template>

<script>
import { mapState } from 'vuex'
import { getProfile, followUser, UnfollowUser } from '@/api/profile'
import { fetchArticle } from '@/api/articles'
import { checkLogin } from '@/pages/utils/checklogin'

import paging from '../components/paging'
import articleList from '../components/article-list'
export default {
  name: 'profileIndex',
  components: {
    paging,
    articleList
  },
  computed: {
    ...mapState([ 'staticImg', 'user'])
  },
  data () {
    return {
      currentType: 'myArticle', // myArticle favoritedArticles
      isLoading: false,
    }
  },
  async asyncData( { params } ) {
    const { username } = params;
    let userInfo = null;
    const pagingParams =  { limit: 10, offset: 0 };
    // 获取用户信息
    const { data } = await getProfile(username);
    userInfo = data.profile;
    // 获取用户文章
    const { data: articleInfo } = await fetchArticle({
      author: userInfo.username,
      ...pagingParams,
    });
    const { articlesCount, articles } = articleInfo;
    articles.forEach(item => item.disabled = false);
    const backupsPaging =  JSON.parse(JSON.stringify(pagingParams));
    return {
      userInfo,
      articlesList: articles,
      pagingParams,
      backupsPaging,
      articlesCount
    }
  },
  methods: {
    async handlerFollow () {
      if (!checkLogin()) {
        return this.$router.push('/login/siginUp');
      };
      const { username, following } = this.userInfo;
      const { data } = following ? await UnfollowUser(username) : await followUser(username);
      this.userInfo.following = data.profile.following;
    },
    // 切换tab
    async changeTabs (type) {
      if (type === this.currentType) return;
      // 清空分页组件
      this.articlesCount = 0;
      this.$refs.paging.currentPage = 1;
      this.pagingParams = { ...this.backupsPaging };
      this.currentType = type;

      this.getArticlesData();
    },
    // 请求接口
    async getArticlesData () {
      if (this.isLoading) return;
      this.isLoading = true;
      const params = { ...this.pagingParams };
      if (this.currentType === 'myArticle') {
        params.author = this.userInfo.username
      } else {
        params.favorited = this.userInfo.username
      }
      const { data } = await fetchArticle(params);
      const { articles, articlesCount } = data;
      articles.forEach(item => item.disabled = false);
      this.articlesList = articles;
      this.articlesCount = articlesCount;
      this.isLoading = false;
    },
    // 分页
    pagingChange(event) {
      this.pagingParams.offset = event.offset;
      this.getArticlesData();
    },
  }
}
</script>

<style>

</style>