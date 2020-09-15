<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="display: inline-block;"></el-avatar>
        <span class="dashboard-text-admin" style="padding: 0 0 50px 20px; display:inline-block; font-size: 40px">{{ user.name }}</span>
    </div>
    <br />
    <template>
      <el-table
        :data="tableData"
        stripe
        style="width: 360px">
        <el-table-column
          prop="name"
          label="类别"
          width="180">
        </el-table-column>
        <el-table-column
          prop="count"
          label="数量"
          width="180">
        </el-table-column>
      </el-table>
    </template>
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
      productImageCount: null,
      tableData: []
    }
  },
  mounted() {
    this.indexInfo()
  },
  methods: {
    indexInfo() {
      adminIndex().then((response) => {
        if (response.data) {
          console.log(response.data.data)
          this.tableData = response.data.infos
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
