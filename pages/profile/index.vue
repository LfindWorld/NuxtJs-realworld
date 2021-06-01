<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userInfo.image || staticImg" class="user-img" />
            <h4>{{ userInfo.username }}</h4>
            <p>
              {{ userInfo.bio }}
            </p>
            <nuxt-link v-if="isMe" class="btn btn-sm btn-outline-secondary action-btn" to="/settings">
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            <button v-else @click="handlerFollow(userInfo.username)" class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow Eric Simons
            </button>

          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a @click.prevent="changeTabs('myArticle')" :class="{
                  active: currentType === 'myArticle'
                }" class="nav-link ">My Articles</a>
              </li>
              <li class="nav-item">
                <a @click.prevent="changeTabs('favoritedArticles')" :class="{
                  active: currentType === 'favoritedArticles'
                }" class="nav-link ">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <div>
            <articleList :articles="articlesList"></articleList>
          </div>
          <template v-if="isLoading">
            <p>loading articles</p>
          </template>
        </div>
      </div>
      <paging
        :pagingParams="pagingParams"
        @change="getArticlesData"
        :currentPage="currentPage"
      ></paging>
    </div>

  </div>

</template>

<script>
import { mapState } from 'vuex'
import { getProfile, followUser } from '@/api/profile'
import { fetchArticle, like, UnLike } from '@/api/articles'
import paging from '../components/paging'
import articleList from '../components/article-list'
export default {
  name: 'profileIndex',
  middleware: 'authenticated',
  components: {
    paging,
    articleList
  },
  computed: {
    ...mapState([ 'staticImg'])
  },
  data () {
    return {
      currentType: 'myArticle', // myArticle favoritedArticles
      isLoading: false,
      currentPage: 1
    }
  },
  async asyncData( { query, store } ) {
    const state = store.state;
    let isMe = false;
    let userInfo = null;
    const pagingParams =  {
        limit: 10,
        offset: 0,
        total: 0
      };
    const selectName = query.username;
    if (!selectName) return;
    if (selectName === state.user.username) {
      isMe = true;
      userInfo = state.user
    } else {
      const { data } = await getProfile(selectName);
      userInfo = data.profile;
    }
    const { data: articleInfo } = await fetchArticle({
      author: userInfo.username,
      limit: pagingParams.limit,
      offset: pagingParams.offset,
    });
    pagingParams.total = articleInfo.articlesCount;
    const articlesList = articleInfo.articles || [];
    articlesList.forEach(item => item.disabled = false)
    return {
      isMe,
      userInfo,
      articlesList,
      pagingParams
    }
  },
  methods: {
    handlerFollow (username) {
      console.log(username);
      // await followUser(username)
    },
    async changeTabs (type) {
      if (type === this.currentType) return;
      this.currentType = type;
      this.pagingParams = {
        limit: 10,
        offset: 0,
        total: 0
      };
      this.getArticlesData();
    },
    async getArticlesData (event = {}) {
      if (this.isLoading) return;
      this.isLoading = true;
      this.currentPage = event.pageIdx || 1;
      this.pagingParams.offset = event.offset || 0;
      const params = {
        limit: this.pagingParams.limit,
        offset: this.pagingParams.offset
      }
      if (this.currentType === 'myArticle') {
        params.author = this.userInfo.username
      } else {
        params.favorited = this.userInfo.username
      }

      const { data } = await fetchArticle(params);
      data.articles.forEach(item => item.disabled = false);
      this.articlesList = data.articles
      this.pagingParams.total = data.articlesCount;
      this.isLoading = false;
    },
    async handlerLike (event, index) {
      const { favorited, slug } = event;
      const article = this.articlesList[index];
      article.disabled = true;
      if (favorited) {
        await UnLike(slug);
        article.favoritesCount -= 1
      } else {
        await like(slug);
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