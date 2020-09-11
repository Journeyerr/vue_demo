<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="products"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="60" fixed>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="门店名称" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.shop_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="描述" width="380" align="center">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column label="数量/单位" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.quantity }}/{{ scope.row.unit }}
        </template>
      </el-table-column>
      <el-table-column label="价格" width="100" align="center">
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
      <el-table-column label="排序" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.sort }}
        </template>
      </el-table-column>
      <el-table-column label="图片" width="110" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.product_image"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="280" fixed="right">
        <template slot-scope="scope">
          <el-button type="info" @click="editProduct(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status === '1'" type="warning" :loading="updateLoading" @click="updateProduct(scope.row)">停用</el-button>
          <el-button v-else type="primary" :loading="updateLoading" @click="updateProduct(scope.row)">启用</el-button>
          <el-button type="danger" :loading="deleteLoading" @click="removeProduct(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="20">
    </el-pagination>
  </div>
</template>

<script>
import { productIndex, productRemove, productUpdate } from '../../api/product'

export default {
  data() {
    return {
      products: [],
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
      productIndex(this.form).then(response => {
        if (response && response.code === 0) {
          console.log(response)
          this.products = response.data.records
        } else {
          this.$message.error('网络异常！')
        }
        this.listLoading = false
      })
    },
    removeProduct(row) {
      this.deleteLoading = true
      productRemove(row.id).then(response => {
        this.deleteLoading = false
        if (response && response.code === 0) {
          this.$message.success('删除成功！')
          this.products.splice(row.index, 1)
        } else {
          this.$message.error('网络异常！')
        }
      })
    },
    updateProduct(row) {
      this.updateLoading = true
      productUpdate(row.id).then(response => {
        if (response && response.code === 0) {
          this.$message.success('操作成功！')
          row.status = row.status === '1' ? '0' : '1'
        } else {
          this.$message.error('网络异常！')
        }
        this.updateLoading = false
      })
    },
    editProduct(row) {
      this.$router.push({ path: './edit', query: { id: row.id }})
    }
  }
}
</script>
