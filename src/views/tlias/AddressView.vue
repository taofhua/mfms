<template>
  <div class="common-layout">
    <el-header>
            <div style="background-color: #FCF9F9; display: flex; justify-content: space-between; padding: 10px;">
            <div>
              <span>欢迎访问机械配件商城</span>
              <el-link @click="navTo('/index')">
                [访问官网]
            </el-link>
              <el-link v-if="!isLoggedIn" @click="navTo('/login')">登录</el-link>
              <el-link v-else @click="navTo('/profile')">{{ username }}</el-link>
              <el-divider direction="vertical" />
              <el-link v-if="!isLoggedIn" @click="registerDialogVisible = true">免费注册</el-link>
              <el-link v-else @click="logout">退出</el-link>
            </div>
            <div>
              <el-link @click="navTo('/cart')" style="margin-left: 10px;">购物车</el-link>
              <el-link @click="navTo('/order')" style="margin-left: 10px;">订单</el-link>
              <el-link @click="navTo('/address')" style="margin-left: 10px;">地址管理</el-link>
            </div>
          </div>
          </el-header>
    <el-container style="height: 100vh; border: 1px solid #eee">


      <el-container>
        <!-- 右侧内容 -->
        <el-main style="padding: 20px;">
          <!-- 表格标题 -->
          <div style="display: flex; align-items: flex-start;">
            <el-header style="background-color: #008ed1; color: white;">
              <h3>收货地址管理</h3>
            </el-header>
          </div>
          <!-- 空白行 -->
          <el-divider></el-divider>
          <!-- 添加地址信息 -->
          <el-form :model="formData" :rules="formRules" label-width="100px">
            <!-- 地址选择-->
            <el-form-item label="地址选择" prop="address">
              <template #label>
                <span class="required">*</span> 地址选择
              </template>
              <el-cascader v-model="selectedOptions" :options="options" @change="updateChange"
                placeholder="请选择地址"></el-cascader>
            </el-form-item>

            <!-- 收货人姓名 -->
            <el-form-item label="收货人姓名" prop="name">
              <template #label>
                <span class="required">*</span> 收货人姓名
              </template>
              <el-input v-model="formData.name" style="width: 300px;" :maxlength="20"></el-input>
            </el-form-item>

            <!-- 电话号码 -->
            <el-form-item label="电话号码" prop="phone">
              <template #label>
                <span class="required">*</span> 电话号码
              </template>
              <el-input v-model="formData.phone" style="width: 300px;" :maxlength="20"></el-input>
            </el-form-item>

            <!-- 固定电话号码 -->
            <el-form-item label="固定电话" prop="mobile">
              <template #label>
                <span class="required">*</span> 固定电话
              </template>
              <el-input v-model="formData.mobile" style="width: 300px;" :maxlength="20"></el-input>
            </el-form-item>

            <!-- 邮政编码 -->
            <el-form-item label="邮政编码" prop="zip">
              <el-input v-model="formData.zip" style="width: 300px;" :maxlength="6"></el-input>
            </el-form-item>

            <!-- 详细地址 -->
            <el-form-item label="详细地址" prop="addr">
              <template #label>
                <span class="required">*</span> 详细地址
              </template>
              <el-input v-model="formData.addr" style="width: 300px;" :maxlength="300"></el-input>
            </el-form-item>


            <!-- 提交按钮 -->
            <el-form-item>
              <el-button type="primary" @click="handleSubmitAddress">保存</el-button>
            </el-form-item>
          </el-form>
          <!-- 地址信息表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="收货人" width="180" />
            <el-table-column prop="address" label="所在地区" width="180" />
            <el-table-column prop="addr" label="详细地址" width="180" />
            <el-table-column prop="zip" label="邮政编码" width="180" />
            <el-table-column prop="phone" label="手机" width="180" />
            <el-table-column prop="mobile" label="固定电话" width="180" />
            <el-table-column label="操作" width="180">
              <template #default="{ row }">
                <el-button type="primary" plain @click="showEditForm(row)">修改</el-button>
                <el-button type="primary" @click="handleDelete(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>



          <!-- 修改界面 -->
          <el-dialog v-model="dialogVisible" title="修改收货地址" width="500" center>
            <el-form :model="updateformData">
              <el-form-item label="收货人" :label-width="'80px'">
                <el-input v-model="updateformData.name" :maxlength="20" />
              </el-form-item>
              <el-form-item label="地址选择" prop="address">
                <template #label>
                  <span class="required">*</span> 地址选择
                </template>
                <el-cascader v-model="updateOptions" :options="options" @change="updateChange"
                  placeholder="请选择地址"></el-cascader>
              </el-form-item>

              <el-form-item label="详情地址" :label-width="'80px'">
                <el-input v-model="updateformData.addr" :maxlength="300" />
              </el-form-item>
              <el-form-item label="邮政编码" :label-width="'80px'">
                <el-input v-model="updateformData.zip" :maxlength="6" />
              </el-form-item>
              <el-form-item label="手机" :label-width="'80px'">
                <el-input v-model="updateformData.phone" :maxlength="20" />
              </el-form-item>
              <el-form-item label="固定电话" :label-width="'80px'">
                <el-input v-model="updateformData.mobile" :maxlength="20" />
              </el-form-item>
            </el-form>
            <div class="form-buttons" style="display: flex; justify-content: center;">
              <el-button @click="handelSubmit()" type="primary">确定</el-button>
              <el-button @click="cancelForm">取消</el-button>
            </div>
          </el-dialog>

          <!-- 动态分页组件 -->
          <el-pagination background layout="prev, pager, next" :total="tableDataTotal"
            @current-change="handleCurrentChange" />
        </el-main>
      </el-container>
    </el-container>




  </div>
</template>

<script>
import axios from 'axios';
import { regionData } from 'element-china-area-data';
import {useRouter } from 'vue-router';
axios.defaults.withCredentials = true;
export default {
  setup(){
    const router = useRouter();
    const navTo = (url) => {
      router.push(url);
    };
    return {
      navTo
    };
  },
  data() {
    return {
      formRules: {}, // 表单校验规则
      dialogVisible: false,
      showForm: false,
      updataAddress: false,
      tableDataTotal: 0, // 总条目数
      options: regionData, // 地区数据源
      selectedOptions: [], // 存放选择的地址选项，需要初始化
      updateOptions: [], // 存放更改地址选项，需要初始化
      //添加地址界面存放的数据
      formData: {
        id: '',
        userId: 1,
        mobile: '',
        province: '',
        city: '',
        district: '',
        addr: '',
        zip: '',
        name: '',
        phone: ''
      },
      //修改地址界面存放的数据
      updateformData: {
        id: null,
        userId: null,
        name: '',
        phone: '',
        mobile: '',
        province: '',
        city: '',
        district: '',
        addr: '',
        zip: '',
      },
      
      tableData: [ ] 
    };
  },

  mounted() {
    this.getUserAddress();
  },

  methods: {
    async handleSubmitAddress(){
      console.log(this.formData);
      try {
        await axios.post(
          "http://localhost:9093/api/v1/address/add",this.formData
        );
      } catch (error) {
        console.error("获取用户地址失败:", error);
      }
    },

    // 处理标签页点击事件
    handleTabClick(tab) {
      console.log('Tab clicked:', tab.name);
    },

    async getUserAddress() {
      try {
        const response = await axios.get(
          "http://localhost:9093/api/v1/address/userId?id=1"
        );
        this.tableData = response.data; 
      } catch (error) {
        console.error("获取用户地址失败:", error);
      }
    },

    async handelSubmit() {

      try {
        await axios.post(
          "http://localhost:9093/api/v1/address/update", this.updateformData
        );
        this.dialogVisible = false;
        this.getUserAddress();
      } catch (error) {
        console.error("获取根节点失败:", error);
      }
    },
  

    showEditForm(row) {
      // 将当前行的数据赋值给updateformData，用于修改界面的显示
      this.updateformData = { ...row }
      this.dialogVisible = true; // 显示修改界面
    },

    //处理修改数据
    updateonSubmit: function () {
      alert(JSON.stringify(this.updateformData));
    },

    //删除地址
    handleDelete(item) {
      const itemId = item.addr_id; // 假设addr_id是地址的唯一标识
      axios.post('http://localhost:9093/api/v1/address/userId?id=1', { id: itemId })
        .then(response => {
          console.log('删除成功:', response.data);
        })
        .catch(error => {
          console.error('删除失败:', error);
        });
    },

    cancelForm() {
      // 取消表单的逻辑
      this.showForm = false; // 隐藏表单
    },

    // 处理页码变化事件
    handleCurrentChange(val) {
      // 处理页码变化逻辑，例如更新表格数据
      // 根据页码获取相应的数据
      this.fetchTableData(val);
    },

   


    updateChange(value) {
      if (value.length === 3) {
         this.findLabelByValue(value[0],value[1],value[2]);
      } else {
        this.resetFormData( this.updateformData);
      }
    },

    // 根据 value 查找 label
    findLabelByValue(value1,value2,value3) {
      const option = this.options.find(opt => opt.value === value1);
      this.updateformData.province =option ? option.label : '';
      this.formData.province =option ? option.label : '';
      const option1=option.children.find(opt => opt.value === value2);
      this.updateformData.city=option1 ? option1.label : '';
      this.formData.city=option1 ? option1.label : '';
      const option2=option1.children.find(opt => opt.value === value3);
      this.updateformData.district=option2 ? option2.label : '';
      this.formData.district=option2 ? option2.label : '';
   
    },
   



    // 根据选择的地区代码，获取汉字形式的地区名
    getSelectedLabels(value) {
      const labels = [];
      if (Array.isArray(value) && value.length > 0) {
        // 继续处理逻辑
        let options = this.options;
        for (let i = 0; i < value.length; i++) {
          const val = value[i];
          const option = options.find(opt => opt.value === val);
          if (option) {
            labels.push(option.label);
            options = option.children || [];
          } else {
            break;
          }
        }
      }
      return labels;
    }, // 重置表单数据
    resetFormData() {
      this.formData = {
        province: '',
        city: '',
        district: '',
        addr: '',
        zip: '',
        name: '',
        phone: ''
      };
    }
  }
};
</script>

<style scoped>
.common-layout {
  width: 100%;
  /* 确保宽度占满整个浏览器 */
  height: 100vh;
  /* 使用100vh设置高度，让父容器占满整个视窗 */
}
</style>
