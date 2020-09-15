<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="orders"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="门店名称" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.shopName }}
        </template>
      </el-table-column>
      <el-table-column label="订单编号" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.no }}
        </template>
      </el-table-column>
      <el-table-column label="订单金额" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.totalFee }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="120" align="center">
        <template slot-scope="scope">
          {{ (scope.row.statusName) }}
        </template>
      </el-table-column>
      <el-table-column label="订单类型" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.isTakeaway === 1 ? '外送' : '自取'}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="订单备注" width="250" align="center">
        <template slot-scope="scope">
          {{ scope.row.remarks }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="预约时间" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.pickupTime }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone ? scope.row.phone : '无' }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="下单时间" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="详情" width="88"  fixed="right">
        <template slot-scope="scope">
          <el-button @click="orderDetail(scope.row)" icon="el-icon-search" circle></el-button>
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
import { orderList } from '../../api/order'
import { pageSizeConfig } from '../../utils/content'

export default {
  data() {
    return {
      orders: [],
      listLoading: false,
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
      orderList(form).then(data => {
        if (data && data.code === 0) {
          const orders = data.data.records
          this.totalPage = data.data.total
          this.orders = orders
          this.listLoading = false
        }
      })
    },
    orderDetail: function(row) {
      this.$router.push({ path: './detail', query: { no: row.no }})
    }
  }
}
</script>
