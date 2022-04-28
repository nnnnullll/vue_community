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
    this.back(this.$route.query.url, this.$route.query.from)
  },
  methods: {
    back: function (url, from) {
      // eslint-disable-next-line eqeqeq
      if (url == '/casedetail') {
        this.$router.push({
          path: '/casedetail',
          query: {
            casenumber: this.$route.query.casenumber
          }
        })
      // eslint-disable-next-line eqeqeq
      } else if (url == '/partnerdetail' && from != 'internal') {
        this.$router.push({
          path: '/partnerdetail',
          query: {
            number: this.$route.query.number
          }
        })
      // eslint-disable-next-line eqeqeq
      } else if (url == '/partnerdetail' && from == 'internal') {
        this.$router.push({
          path: '/partnerdetail',
          query: {
            number: this.$route.query.number,
            from: 'internal'
          }
        })
      // eslint-disable-next-line eqeqeq
      } else if (url == '/partnertable') {
        this.$router.push({
          path: '/partnertable'
        })
      // eslint-disable-next-line eqeqeq
      } else if (url == '/partnertableall') {
        this.$router.push({
          path: '/partnertableall'
        })
      // eslint-disable-next-line eqeqeq
      } else if (url == '/householddetail' && from != 'internal') {
        this.$router.push({
          path: '/householddetail'
        })
      // eslint-disable-next-line eqeqeq
      } else if (url == '/communitydetail' && from == 'internal') {
        this.$router.push({
          path: '/communitydetail',
          query: {
            number: this.$route.query.number,
            from: 'internal'
          }
        })
      // eslint-disable-next-line eqeqeq
      } else if (url == '/communitytable') {
        this.$router.push({
          path: '/communitytable'
        })
      // eslint-disable-next-line eqeqeq
      } else if (url == '/communitytableall') {
        this.$router.push({
          path: '/communitytableall'
        })
      // eslint-disable-next-line eqeqeq
      } else if (url == '/employeetable') {
        this.$router.push({
          path: '/employeetable'
        })
      // eslint-disable-next-line eqeqeq
      } else if (url == '/employeedetailmine' && from != 'internal') {
        this.$router.push({
          path: '/employeedetailmine',
          query: {
            number: this.$route.query.number
          }
        })
      // eslint-disable-next-line eqeqeq
      } else if (url == '/employeedetail' && from == 'internal') {
        this.$router.push({
          path: '/employeedetail',
          query: {
            number: this.$route.query.number,
            from: 'internal'
          }
        })
      // eslint-disable-next-line eqeqeq
      } else if (url == '/companydetail') {
        this.$router.push({
          path: '/companydetail'
        })
      // eslint-disable-next-line eqeqeq
      } else if (url == '/changepassword') {
        this.$router.push({
          path: '/changepassword'
        })
      // eslint-disable-next-line eqeqeq
      } else {
      }
    }
  }
}
</script>
