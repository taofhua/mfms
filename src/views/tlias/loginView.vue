<template>
  <div class="common-layout">
    <div style="align-items: center; justify-content: space-between; padding: 10px;">
      <div style="display: flex; align-items: flex-start;">
        <div style="background-color: #008ed1; color: white; padding: 10px;">机械配件商城</div>
      </div>
    </div>
    <el-divider />
    <el-row>
      <el-col :span="8"></el-col>
      <el-col :span="8" style="margin-left: 20px;">
        <h1>登录界面</h1>
        <div>
          <div>
            <el-text>用户: </el-text>
            <el-input v-model="account" style="width: 240px" placeholder="用户名" />
          </div>
          <div>
            <el-text>密码: </el-text>
            <el-input
              v-model="password"
              style="width: 240px"
              type="password"
              placeholder="Please input password"
              show-password
            />
          </div>
          <div>
            <el-link style="color: #008ed1; margin: 10px;" @click="registerDialogVisible = true">免费注册</el-link>
          </div>
          <div style="text-align: center;">
            <el-button plain @click="login">登录</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <el-dialog title="注册" v-model="registerDialogVisible" width="30%">
      <el-form :model="register">
        <el-form-item label="用户名">
          <el-input v-model="register.account" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="register.password" />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="register.password" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="register.phone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="register.email" />
        </el-form-item>
        <el-form-item label="问题">
          <el-input v-model="register.question" />
        </el-form-item>
        <el-form-item label="答案">
          <el-input v-model="register.asw" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="registerUser()"></el-button>
    </el-dialog>

  </div>
</template>

<script>

import axios from 'axios';
// axios.defaults.withCredentials = true;
export default {
  data(){
    return {
      registerDialogVisible:false,
      account:'',
      password:'',
      register:{
        account: '',
        password: '',
        phone:null,
        email:'',
        question:'',
        asw: '',
      },
    }

  },
  methods:{
    async login() {
    try {
      const response = await axios.get(
        "http://192.168.153.25:9093/api/v1/user/login",{
          params:{
            account:this.account,
            password:this.password
          }
        }
      );
      if (response.data.status === "success") {
        alert("登陆成功");
        this.$router.push('/index');
      } else {
        console.log();
      }
    } catch (error) {
      console.error("登录失败:", error);
      alert("登录失败，请重试");
    }
  },
  async registerUser() {
    try {
      const response = await axios.post(
        "http://192.168.153.25:9093/api/v1/user/register",this.register
      );

      if (response.data.status === "success") {
        console.log("注册成功");
        this.registerDialogVisible = false;
      } else {
        console.log();
      }
    } catch (error) {
      console.error("注册失败:", error);
      alert("注册失败，请重试");
    }
  },
  }
};
</script>
<style>
.common-layout {
  padding: 20px;
}
.input-container {
display: flex;
justify-content: flex-end; /* 将输入框靠右对齐 */
align-items: center;
margin-bottom: 10px;
}
</style>
