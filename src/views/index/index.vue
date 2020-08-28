<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎登录:   <span class="dashboard-text-admin">{{ user.name }}</span> </div>
    <br />
    <div class="dashboard-text">门店总数:  <span class="dashboard-text-count">{{ shopCount }}</span>   家</div>
    <div class="dashboard-text">商品图片:  <span class="dashboard-text-count">{{ productImageCount }}</span>   条</div>
  </div>
</template>

<script>

import { getCacheToJsonParse } from '@/utils/cache'
import { userInfoKey } from '@/utils/content'
import { adminIndex } from '@/api/admin-user'

export default {
  name: 'Index',
  data() {
    return {
      user: getCacheToJsonParse(userInfoKey),
      shopCount: null,
      productImageCount: null
    }
  },
  mounted() {
    this.indexInfo()
  },
  methods: {
    indexInfo() {
      adminIndex().then((response) => {
        if (response.data) {
          this.shopCount = response.data.shopCount
          this.productImageCount = response.data.productImageCount
        }
      })
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

    &-count {
      font-size: 23px;
      color: lightseagreen;
    }

    &-admin {
      font-size: 23px;
      color: cornflowerblue;
      font-weight: bold;
    }
  }
}

</style>
