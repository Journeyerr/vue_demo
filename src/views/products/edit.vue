<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="商品名称">
        <el-input v-model="form.name" style="width: 150px" />
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="form.remark" />
      </el-form-item>
      <el-form-item label="所属门店">
        <el-select v-model="form.shopId" placeholder="请选择要上传的门店">
          <el-option
            v-for="shop in shops"
            :label="shop.name"
            :value="shop.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch v-model="form.status" />
      </el-form-item>
      <el-form-item label="显示价格">
        <el-input v-model="form.price" style="width: 65px" /> 元
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:9999/admin/upload/image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { productStore, shops } from '../../api/shops'

export default {
  data() {
    return {
      form: {
        name: '',
        remark: '',
        status: true,
        price: null,
        shopId: null,
        imageId: null
      },
      pageForm: {
        page: 1
      },
      shops: [],
      imageUrl: '',
      loading: false
    }
  },
  mounted() {
    this.getShops()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.imageId = res.data.id
      this.loading = false
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      this.loading = true
      return true
    },
    onSubmit() {
      if (this.form.name.length < 1) {
        this.$message.error('商品名称不能为空！')
        return false
      }
      this.loading = true
      this.form.status = this.form.status ? 1 : 0
      productStore(this.form).then((response) => {
        if (response.code === 0 && response.data) {
          this.form.imageId = null
          this.form.price = null
          this.form.remark = ''
          this.imageUrl = ''
          this.$message.success('创建成功！')
        } else {
          this.$message.error(response ? response.message : '创建失败，请重试！')
        }
      })
      this.loading = false
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    getShops() {
      shops().then(response => {
        if (response.data) {
          this.shops = response.data
        } else {
          this.$message.error('门店加载失败')
        }
      })
    }

  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

