<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎登录:  {{ user.name }}</div>
  </div>
</template>

<script>

import { getCacheToJsonParse } from '@/utils/cache'

export default {
  name: 'Index',
  data() {
    return {
      user: getCacheToJsonParse('userInfo')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 20px;
    line-height: 30px;
  }
}
</style>
