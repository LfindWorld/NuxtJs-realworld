<template>
  <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="commentText" ></textarea>
            </div>
            <div class="card-footer">
              <img :src="user.image" class="comment-author-img" />
              <button @click="handleSubmitComment" type="button" class="btn btn-sm btn-primary">
              Post Comment
              </button>
            </div>
          </form>
          <div v-for="(item, index) in comments" :key="index" class="card">
            <div class="card-block">
              <p class="card-text">{{item.body}}</p>
            </div>
            <div class="card-footer">
              <nuxt-link
              class="comment-author"
              :to="{
                  name: 'profile-username',
                  params: {
                    username: item.author.username
                  }
                }"
              >
                <img :src="item.author.image" class="comment-author-img" />
              </nuxt-link>
              &nbsp;
              <nuxt-link
              class="comment-author"
                :to="{
                    name: 'profile-username',
                    params: {
                      username: item.author.username
                    }
                  }"
                >
                  {{item.author.username}}
                </nuxt-link>
              <span class="date-posted">{{item.createdAt | date('MMM D, YYYY')}}</span>
              <span @click="removeComment(item.id)" v-if="user && user.username === item.author.username" class="mod-options" >
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>

      </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  name: 'ArticleComment',
  props: {
    comments: {
      type: Array
    }
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      commentText: ''
    }
  },
  methods: {
    handleSubmitComment() {
      if (!this.commentText) return;
      this.$emit('submitComment', this.commentText);
      this.commentText = ''
    },
    removeComment(id) {
      this.$emit('removeComment', id)
    }
  }
}
</script>

<style>

</style>