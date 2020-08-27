<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="shops"
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
      <el-table-column label="门店ID" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.shop_id }}
        </template>
      </el-table-column>
      <el-table-column label="门店名称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.shop_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品描述" width="410" align="center">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column label="商品价格" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === '1'" class="tag-group__title" type="success">显示中</el-tag>
          <el-tag v-else class="tag-group__title" type="info">关闭中</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品图片" width="210" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.product_image">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === '1'" type="warning" @click="updateImage(scope.row)" :loading="updateLoading">停用</el-button>
          <el-button v-else type="primary" @click="updateImage(scope.row)" :loading="updateLoading">启用</el-button>
          <el-button type="danger" @click="removeImage(scope.row)" :loading="deleteLoading">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { productImageIndex, productImageRemove, productImageUpdate } from '../../api/shops'

export default {
  data() {
    return {
      shops: [],
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
      productImageIndex(this.form).then(response => {
        if (response && response.code === 0) {
          console.log(response)
          this.shops = response.data.records
        } else {
          this.$message.error('网络异常！')
        }
        this.listLoading = false
      })
    },
    removeImage(row) {
      this.deleteLoading = true
      productImageRemove(row.id).then(response => {
        if (response && response.code === 0) {
          this.$message.success('删除成功！')
          this.shops.splice(row.index, 1)
        } else {
          this.$message.error('网络异常！')
        }
        this.deleteLoading = false
      })
    },
    updateImage(row) {
      this.updateLoading = true
      productImageUpdate(row.id).then(response => {
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
