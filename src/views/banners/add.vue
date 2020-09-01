<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
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
import { shops } from '../../api/shops'
import { bannerStore } from '../../api/banner'

export default {
  data() {
    return {
      form: {
        status: true,
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
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      this.loading = true
      return true
    },
    onSubmit() {
      this.loading = true
      if (!this.form.imageId) {
        this.$message.error('图片不能为空')
      }
      bannerStore(this.form).then((response) => {
        if (response.code === 0 && response.data) {
          this.form.imageId = null
          this.imageUrl = ''
          this.$message.success('创建成功！')
        } else {
          this.$message.error(response ? response.message : '创建失败，请重试！')
        }
      })
      this.form.status = this.form.status ? 1 : 0
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

