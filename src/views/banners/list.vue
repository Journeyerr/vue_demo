<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="banners"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="110" fixed>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="门店名称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.shop_name }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === '1'" class="tag-group__title" type="success">显示中</el-tag>
          <el-tag v-else class="tag-group__title" type="info">关闭中</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Banner图片" width="210" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.banner_image"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === '1'" type="warning" :loading="updateLoading" @click="updateImage(scope.row)">停用</el-button>
          <el-button v-else type="primary" :loading="updateLoading" @click="updateImage(scope.row)">启用</el-button>
          <el-button type="danger" :loading="deleteLoading" @click="removeImage(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { bannerIndex, bannerRemove, bannerUpdate } from '../../api/banner'

export default {
  data() {
    return {
      banners: [],
      listLoading: false,
      deleteLoading: false,
      updateLoading: false,
      form: {
        page: 1,
        pageSize: 15,
        shopId: null
      }
    }
  },
  mounted() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      this.listLoading = true
      bannerIndex(this.form).then(response => {
        if (response && response.code === 0) {
          console.log(response)
          this.banners = response.data.records
        } else {
          this.$message.error('网络异常！')
        }
        this.listLoading = false
      })
    },
    removeImage(row) {
      this.deleteLoading = true
      bannerRemove(row.id).then(response => {
        this.deleteLoading = false
        if (response && response.code === 0) {
          this.$message.success('删除成功！')
          this.banners.splice(row.index, 1)
        } else {
          this.$message.error('网络异常！')
        }
      })
    },
    updateImage(row) {
      this.updateLoading = true
      bannerUpdate(row.id).then(response => {
        if (response && response.code === 0) {
          this.$message.success('操作成功！')
          row.status = row.status === '1' ? '0' : '1'
        } else {
          this.$message.error('网络异常！')
        }
        this.updateLoading = false
      })
    }
  }
}
</script>
