<template>
  <div>
    <nav>
      <ul class="pagination">
        <li
          class="page-item"
          :class="{
            active: item === currentPage
          }"
          v-for="item in pagdingNums"
          :key="item"
        >
          <a @click.prevent="clickpaging(item)" class="page-link">{{item}}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'pagingIndex',
  props: {
    pagingParams: {
      type: Object,
      require: true,
      default: function () {
        return {
          limit: 0,
          offset: 0,
          total: 0
        }
      }
    },
    currentPage: Number

  },
  computed: {
    pagdingNums() {
      return Math.ceil(this.pagingParams.total / this.pagingParams.limit)
    },
  },
  methods: {
    clickpaging(pageIdx) {
      if (this.currentPage === pageIdx) return;
      this.$emit('change', {offset: (pageIdx - 1) * this.pagingParams.limit, pageIdx})
    }
  }
}
</script>

<style>

</style>