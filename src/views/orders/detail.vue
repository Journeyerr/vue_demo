<template>
  <div class="app-container">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="订单基本信息" name="1">
        <el-card class="box-card">
          <div class="text item">
            门店名称：{{ order.shopName }}
          </div>
          <div class="text item">
            订单编号：{{ order.no }}
          </div>
          <div class="text item">
            订单金额：¥ {{ order.totalFee }}
          </div>
          <div class="text item">
            订单状态：{{ order.statusName }}
          </div>
          <div class="text item">
            订单类型：{{ order.isTakeaway === 1 ? '外送' : '自取'}}
          </div>
          <div class="text item">
            订单备注：{{ order.remarks }}
          </div>
          <div class="text item">
            预约时间：{{ order.pickupTime }}
          </div>
          <div class="text item">
            联系方式：{{ order.phone ? order.phone : '无' }}
          </div>
          <div class="text item">
            下单时间：{{ order.createdAt }}
          </div>
        </el-card>
      </el-collapse-item>
      <el-collapse-item title="订单商品信息" name="2">
        <el-table
          :data="items"
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
          <el-table-column label="名称" width="100" align="center">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="图片" width="180" align="center">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.image"
              />
            </template>
          </el-table-column>
          <el-table-column label="单价" width="80" align="center">
            <template slot-scope="scope">
              ¥ {{ scope.row.price }}
            </template>
          </el-table-column>
          <el-table-column label="下单数量" width="100" align="center">
            <template slot-scope="scope">
              {{ scope.row.quantity }}
            </template>
          </el-table-column>
          <el-table-column label="实际数量" width="100" align="center">
            <template slot-scope="scope">
              {{ scope.row.actualQuantity ? scope.row.actualQuantity : scope.row.quantity }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="优惠金额" width="100" align="center">
            <template slot-scope="scope">
              {{ scope.row.discountPrice }}
            </template>
          </el-table-column>
          <el-table-column label="小记" width="100" align="center">
            <template slot-scope="scope">
              ¥ {{ scope.row.actualQuantity ? scope.row.actualQuantity * scope.row.price : scope.row.quantity * scope.row.price }}
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="订单外送信息" name="3" v-if="address">
        <div class="text item">
          联系用户：{{ address.name }}
        </div>
        <div class="text item">
          联系电话：{{ address.phone }}
        </div>
        <div class="text item">
          送货地址：{{ address.address }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 7px 0;
  }

  .box-card {
    width: 100%;
    padding-bottom: 30px;
  }
</style>

<script>
import { orderDetail } from '../../api/order'

export default {
  data() {
    return {
      order: {},
      items: [],
      address: {
        'name': '',
        'phone': '',
        'address': ''
      },
      detailLoading: false,
      activeNames: ['1', '2', '3']
    }
  },
  mounted() {
    this.fetchData()
  },

  methods: {
    handleChange(val) {
      console.log(val)
    },
    fetchData: function() {
      this.detailLoading = true
      orderDetail(this.$route.query.no)
        .then(data => {
          if (data && data.code === 0) {
            const order = data.data
            this.order = order
            this.items = order.items
            this.address = order.address
            this.listLoading = false
          }
        })
    }
  }
}
</script>
