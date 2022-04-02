<template>
    <div  style="width: 100%; height:100%;" v-loading=true element-loading-text="拼命加载中"></div>
</template>

<script>
// const axios = require('axios')
export default {
  data () {
    return {
    }
  },
  mounted: function () {
    this.back(this.$route.query.url)
  },
  methods: {
    back: function (url) {
      // eslint-disable-next-line eqeqeq
      if (url == '/casedetail') {
        this.$router.push({
          path: '/casedetail',
          query: {
            casenumber: this.$route.query.casenumber
          }
        })
      }
    }
  }
}
</script>
