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
      // 2-Customer 1-employee 3-partner
      // eslint-disable-next-line eqeqeq
      } else if (url == '/partnerdetail') {
        this.$router.push({
          path: '/partnerdetail',
          query: {
            number: this.$route.query.number
          }
        })
      // 2-Customer 1-employee 3-partner
      // eslint-disable-next-line eqeqeq
      } else if (url == '/householddetail') {
        this.$router.push({
          path: '/householddetail',
          query: {
            number: this.$route.query.number
          }
        })
      // 2-Customer 1-employee 3-partner
      // eslint-disable-next-line eqeqeq
      } else {
      }
    }
  }
}
</script>
