<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
        <div style="margin-bottom: 20px; font-size: 15px; font-weight: bold">
          <el-input v-model="form.no" style="width: 30%;" placeholder="筛选订单号"></el-input>
          <el-select v-model="form.status" style="width: 30%; margin-left: 20px" placeholder="请选择活动区域">
            <el-option
              v-for="statu in statusNames"
              :label="statu.name"
              :value="statu.code"
            />
          </el-select>
          </el-select>
          <el-button type="primary" @click="onSubmit" style="margin-left:30px ">查询</el-button>
          <el-button type="primary" @click="resetSubmit" style="margin-left:30px ">重置</el-button>
        </div>
    </el-form>
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
import { pageSizeConfig, statusNames } from '../../utils/content'

export default {
  data() {
    return {
      orders: [],
      listLoading: false,
      form: {
        pageSize: pageSizeConfig,
        page: 1,
        shopId: null,
        no: '',
        status: ''
      },
      totalPage: 0,
      statusNames: statusNames
    }
  },
  mounted() {
    this.fetchData(this.form)
  },

  methods: {
    onSubmit() {
      this.fetchData(this.form)
    },
    resetSubmit() {
      this.form.no = ''
      this.form.status = ''
      this.fetchData(this.form)
    },
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
