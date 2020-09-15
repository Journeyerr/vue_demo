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
      <el-table-column label="门店名称" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="门店编号" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.no }}
        </template>
      </el-table-column>
      <el-table-column label="门店地址" width="410" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.country }} {{ scope.row.province }} {{ scope.row.city }} {{ scope.row.district }} {{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.contactPhone }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isEnable === 1" class="tag-group__title" type="success">开启中</el-tag>
          <el-tag v-else class="tag-group__title" type="info">关闭中</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="门店标语" width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.tips }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedAt }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isEnable === 1" type="warning" :disabled="true">停用</el-button>
          <el-button v-else type="primary" :disabled="true">启用</el-button>
<!--          <el-button type="danger" @click="removeImage(scope.row)" :loading="deleteLoading">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="padding-top: 20px"
      background
      @current-change="handleCurrentChange"
      :current-page="form.page"
      :page-size="form.pageSize"
      layout="total, prev, pager, next"
      :total="totalPage"
    ></el-pagination>
  </div>
</template>

<script>
import { shopsPage } from '../../api/shops'
import { pageSizeConfig } from '../../utils/content'

export default {
  data() {
    return {
      shops: [],
      listLoading: false,
      deleteLoading: false,
      updateLoading: false,
      form: {
        pageSize: pageSizeConfig,
        page: 1,
        shopId: null
      },
      totalPage: 0
    }
  },
  mounted() {
    this.fetchData(this.form)
  },

  methods: {
    handleCurrentChange: function(val) {
      this.form.page = val
      this.fetchData(this.form)
    },
    fetchData: function(form = {}) {
      this.listLoading = true
      shopsPage(form).then(response => {
        if (response && response.code === 0) {
          this.shops = response.data.records
          this.totalPage = response.data.total
        } else {
          this.$message.error('网络异常！')
        }
        this.listLoading = false
      })
    }
  }
}
</script>
