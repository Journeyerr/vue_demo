<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="display: inline-block;"></el-avatar>
        <span class="dashboard-text-admin" style="padding: 0 0 50px 20px; display:inline-block; font-size: 40px">{{ user.name }}</span>
    </div>
    <br />
    <template class="edit">
      <span style="color: #555">修改密码：</span>
      <el-input class="edit_password" v-model="currentUser.name" disabled></el-input>
      <el-input class="edit_password" placeholder="请输入旧密码" v-model="currentUser.passwordOld" show-password></el-input>
      <el-input class="edit_password" placeholder="请输入新密码" v-model="currentUser.passwordNew" show-password></el-input>
      <el-input class="edit_password" placeholder="请确认新密码" v-model="currentUser.passwordConfirm" show-password></el-input>
      <el-button type="primary" @click="editPassword" :loading="editLoading">确认更新</el-button>
    </template>
  </div>
</template>

<script>

import { getCacheToJsonParse } from '@/utils/cache'
import { userInfoKey } from '@/utils/content'
import { adminInfo, adminEditPassword } from '../../api/admin-user'

export default {
  name: 'Index',
  data() {
    return {
      user: getCacheToJsonParse(userInfoKey),
      currentUser: {
        id: '',
        name: '',
        passwordOld: '',
        passwordNew: '',
        passwordConfirm: ''
      },
      editLoading: false
    }
  },
  mounted() {
    this.adminInfo()
  },
  methods: {
    adminInfo: function() {
      adminInfo().then((response) => {
        if (response && response.code === 0) {
          this.currentUser = response.data
        }
      })
      console.log(this.currentUser)
    },
    editPassword: function() {
      if (!this.currentUser.passwordOld) {
        this.$message({
          type: 'error',
          message: `请输入旧密码`
        })
        return
      }
      if (!this.currentUser.passwordNew) {
        this.$message({
          type: 'error',
          message: `请输入新密码`
        })
        return
      }
      if (this.currentUser.passwordNew !== this.currentUser.passwordConfirm) {
        this.$message({
          type: 'error',
          message: `两次密码不一致`
        })
        return
      }
      this.editLoading = true
      adminEditPassword(this.currentUser).then((response) => {
        if (response && response.code === 0) {
          this.$message({
            type: 'success',
            message: `更新成功`
          })
          this.currentUser.passwordOld = ''
          this.currentUser.passwordNew = ''
          this.currentUser.passwordConfirm = ''
        } else {
          this.$message({
            type: 'error',
            message: `更新失败`
          })
        }
      })
      this.editLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit {
    display: block;
    margin-left: 10%;
  }
  .edit_password{
    display: block;
    margin: 20px 0;
    width: 300px;
  }

.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 20px;
    line-height: 30px;

    &-count {
      font-size: 23px;
      color: lightseagreen;
    }

    &-admin {
      font-size: 23px;
      color: cornflowerblue;
      font-weight: bold;
    }
  }
}

</style>
