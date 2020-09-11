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
          {{ (scope.row.status) }}
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
  </div>
</template>

<script>
import { orderList } from '../../api/order'
import { statusName } from '../../utils/content'

export default {
  data() {
    return {
      orders: [],
      listLoading: false,
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
    fetchData: function() {
      this.listLoading = true
      orderList(this.form)
        .then(data => {
          if (data && data.code === 0) {
            const orders = data.data
            orders.forEach(function(element, index, array) {
              orders[index].status = statusName[element.status]
            })
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
