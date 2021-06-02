<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul v-if="error" class="error-messages">
             <template
              v-for="(messages, field) in error"
            >
              <li
                v-for="(message, index) in messages"
                :key="index"
              >{{ field }} {{ message }}</li>
            </template>
          </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="publishInfo.title" >
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="What's this article about?" v-model="publishInfo.description" >
              </fieldset>
              <fieldset class="form-group">
                  <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="publishInfo.body" ></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input @keyup.enter="submitTag" type="text" class="form-control" placeholder="Enter tags" v-model="tag">
              </fieldset>
              <div class="tag-list">
                <span
                  v-for="(item, index) in publishInfo.tagList"
                  :key="index"
                  class="tag-default tag-pill"
                >
                  <i @click="removeTag(index)" class="ion-close-round"></i>
                  {{item}}
                </span>
              </div>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="handlerSubmit">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { fetchPublishArticle } from '@/api/articles'
export default {
  middleware: 'authenticated',
  data () {
    return {
      publishInfo: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
      tag: '',
      error: null
    }
  },
  methods: {
    async handlerSubmit() {
      const params = { ...this.publishInfo };
      try {
        const { data } = await fetchPublishArticle(params);
        this.$router.push({
          name: 'article-slug',
          params: {
            slug: data.article.slug
          }
        })
      } catch (err) {
        this.error = err.response.data.errors;
      }
    },
    submitTag(e) {
      this.publishInfo.tagList.push(this.tag);
      this.tag = '';
    },
    removeTag(index) {
      this.publishInfo.tagList.splice(index, 1)
    }
  }
}
</script>

<style>

</style>