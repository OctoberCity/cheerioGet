<template>
    <div class="title-warp">
        <div class="goback" @clcik="goback"><</div><div>{{title}}</div>
    </div>
</template>
<script>
export default{
  data () {
    return {
      title: '管理求职意向'
    }
  },
  methods: {
    goback () {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped></style>
