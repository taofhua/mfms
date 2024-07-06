<template>
    <div class="common-layout">
      <el-container>
        <el-header style="height: 200px;">
            <div style="background-color: #FCF9F9; display: flex; justify-content: space-between; padding: 10px;">
            <div>
              <span>欢迎访问机械配件商城</span>
              <el-link @click="navTo('/index')">
                [访问官网]
            </el-link>
              <el-link v-if="!isLoggedIn" @click="navTo('/login')">登录</el-link>
              <el-link v-else @click="navTo('/profile')">{{ username }}</el-link>
              <el-divider direction="vertical" />
              <el-link v-if="!isLoggedIn" @click="navTo('/enroll')">免费注册</el-link>
              <el-link v-else @click="logout">退出</el-link>
            </div>
            <div>
              <el-link href="#">我的商城</el-link>
              <el-link href="#" style="margin-left: 10px;">购物车</el-link>
            </div>
          </div>
          
          <!-- Search bar and logo section -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px;">
            <div style="display: flex; align-items: flex-start;">
              <div style="background-color: #008ed1; color: white; padding: 10px;">机械配件商城</div>
              <div style="display: flex; flex-direction: column; margin-left: 20px;">
                <el-input v-model="input" style="width: 240px;" placeholder="搜索..." />
                <div style="margin-top: 10px;">热销：<el-text >转速传感器</el-text></div>
              </div>
              <el-link href="#" style="margin-left: 10px; background-color: #008ed1; color: white; padding: 10px;">搜索</el-link>
            </div>
            <div>
              <el-link href="#">400-XXX-XXX</el-link>
            </div>
          </div>
  
          <!-- Navigation bar -->
          <div id="mallNav">
            <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
  <el-sub-menu v-for="typeData in typeData" :key="typeData.id" :index="typeData.id.toString()">
  <template #title>{{ typeData.name }}</template>
  <el-menu-item v-for="subCategory in typeData.children" :key="subCategory.id" :index="subCategory.id.toString()" @click="navTo('/type?id='+subCategory.id)">
    {{ subCategory.name }}
  </el-menu-item>
</el-sub-menu>
  </el-menu>
  </div>
  </el-header>
  </el-container>   
     <div style="width: 70%;margin: 10px auto;display: flex;">
        <div style="flex: 1;padding: 0 20px;">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/type?id='+NodeDate.id}">{{NodeDate.name}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{goodsData.name}}</el-breadcrumb-item>
          </el-breadcrumb>
            <div style="font-size: 18px;color: #000;line-height: 80px;border-bottom: #cccccc 1px solid;">{{typeData.name}}</div>
            <div style="margin: 20px 0;">
                <el-row>
                <el-col :span="6" v-for="item in goodsData" :key="item">
                  <img :src="getImageUrl(item.iconUrl)" @click="navTo('/detail?id='+item.id)" alt="" style="width: 100%; height: 175px;border-radius: 10px;border: #cccccc 1px">
                  <div class="rex">{{item.name}}</div>
                  <div>￥{{ item.price }}</div>
                  </el-col>
                </el-row>
            </div>
        </div>
       
     </div>
     <el-container>
        <el-main>
        <el-row>
          <el-col :span="4"></el-col>
          <el-col :span="4"><p class="text_tit">真实货源</p>
            <p class="text_info">一手货源&nbsp;真实存在</p></el-col>
          <el-col :span="4"> <p class="text_tit">品质保障</p>
            <p class="text_info">垂直专业&nbsp;优选厂商</p></el-col>
          <el-col :span="4"><p class="text_tit">服务保障</p>
            <p class="text_info">专业服务团队</p></el-col>
          <el-col :span="4"> <p class="text_tit">交易透明</p>
            <p class="text_info">买卖双方面谈价格</p></el-col>
          <el-col :span="3"></el-col>
        </el-row>
        </el-main>
        </el-container>
        <el-footer style="text-align: center;">
          <div style="background-color: #008ed1; color: white; padding: 20px 0;">
           <div style="display: flex; justify-content: space-around; max-width: 1200px; margin: 0 auto; text-align: left;">
           <div>
            <h3>新手指南</h3>
            <ul>
              <li><a href="#">免费注册</a></li>
              <li><a href="#">个人资料及密码</a></li>
              <li><a href="#">商品关注</a></li>
              <li><a href="#">查询订单</a></li>
              <li><a href="#">购物流程</a></li>
            </ul>
          </div>
          <div>
            <h3>付款/退款</h3>
            <ul>
              <li><a href="#">在线支付</a></li>
              <li><a href="#">银行转账</a></li>
              <li><a href="#">发票办理</a></li>
            </ul>
          </div>
          <div>
            <h3>配送方式</h3>
            <ul>
              <li><a href="#">快递配送</a></li>
              <li><a href="#">零担物流</a></li>
            </ul>
          </div>
          <div>
            <h3>售后服务</h3>
            <ul>
              <li><a href="#">退货流程</a></li>
              <li><a href="#">退货政策</a></li>
            </ul>
          </div>
          <div>
            <h3>帮助中心</h3>
            <ul>
              <li><a href="#">常见热点问题</a></li>
              <li><a href="#">联系我们</a></li>
              <li><a href="#">投诉与建议</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div style="background-color: #f1f1f1; padding: 10px;">
        <p>Copyright © 2018 XXXX数字科技有限公司 版权所有 保留一切权利 鲁ICP备XXXXXXXX号-X</p>
      </div>
    </el-footer>
    </div>
</template>
<script>
import axios from 'axios';
import {useRouter } from 'vue-router';
axios.defaults.withCredentials = true;
export default {
  setup() {
    const router = useRouter();
    const navTo = (url) => {
      router.push(url);
    };
    const gotoDetail = () => {
      router.push('/detail'); // 确保'/detail'是你的实际路由路径
    };
    return {
      gotoDetail,
      navTo
    };
  },
  data() {
    let typeId=this.$route.query.id
    return {
      typeId:typeId,
    typeData:[],
    goodsData:[],
    NodeDate:[],
    };
    
  },
  mounted(){
   this.loadGoods();
   this.loadType(); // 加载分类数据
   this.loadNode();
  },
  methods:{
    getImageUrl(imageUrl) {
      // 根据返回的图片文件名拼接静态资源 URL
      return `http://192.168.153.25:9093/icon_url/${imageUrl}`;
    },
    
    async loadGoods() {
      try {
        const response = await axios.get(
          `http://192.168.153.25:9093/api/v1/product/show`,{
          params: {
            partsId: this.typeId,
            productId: this.typeId
          }
        }
        );
        this.goodsData = response.data; // 获取后端返回的用户数据
        
        } catch (error) {
          console.error("获取根节点失败:", error);
        }
      },
      async loadType() {
      try {
        const response = await axios.get(
          "http://192.168.153.25:9093/api/v1/categories/tree"
        );
        this.typeData = response.data; // 获取后端返回的用户数据
        } catch (error) {
          console.error("获取分类节点失败:", error);
        }
      },
      async loadNode() {
      try {
        const response = await axios.get(
          `http://192.168.153.25:9093/api/v1/categories/getNodeById`,{
          params: {
            id: this.typeId,
          }
        }
        );
        this.NodeDate = response.data; // 获取后端返回的用户数据
        console.log(response.data);
        } catch (error) {
          console.error("获取根节点失败:", error);
        }
      },
      handleSelect(index) {
      console.log('选中菜单项:', index);
      // 可以在这里处理选中菜单项的逻辑，如果需要的话
    },
  },
}
</script>
<style>
#mallNav {
  width: 100%;
  border-bottom: #41b6e7 3px solid;
}
</style>