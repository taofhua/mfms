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
            <el-link v-if="!isLoggedIn" @click="navTo">免费注册</el-link>
            <el-link v-else @click="logout">退出</el-link>
          </div>
          <div>
            <el-link @click="navTo('/cart')" style="margin-left: 10px;">购物车</el-link>
              <el-link @click="navTo('/order')" style="margin-left: 10px;">订单</el-link>
              <el-link @click="navTo('/address')" style="margin-left: 10px;">地址管理</el-link>
          </div>
        </div>

        <!-- Search bar and logo section -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px;">
          <div style="display: flex; align-items: flex-start;">
            <div style="background-color: #008ed1; color: white; padding: 10px;">机械配件商城</div>
            <div style="display: flex; flex-direction: column; margin-left: 20px;">
              <el-input v-model="input" style="width: 240px;" placeholder="搜索..." />
              <div style="margin-top: 10px;">热销：<el-text>转速传感器</el-text></div>
            </div>
            <el-link href="#"
              style="margin-left: 10px; background-color: #008ed1; color: white; padding: 10px;">搜索</el-link>
          </div>
          <div>
            <el-link href="#">400-XXX-XXX</el-link>
          </div>
        </div>

        <!-- Navigation bar -->
        <div id="mallNav">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-sub-menu v-for="typeData in typeData" :key="typeData.id" :index="typeData.id.toString()">
              <template #title>{{ typeData.name }}</template>
              <el-menu-item v-for="subCategory in typeData.children" :key="subCategory.id"
                :index="subCategory.id.toString()" @click="navTo('/type?id=' + subCategory.id)">
                {{ subCategory.name }}
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
      </el-header>
    </el-container>
    <el-row>
      <el-col :span="3"></el-col>
      <el-col :span="9">
        <el-breadcrumb :separator-icon="ArrowRight" style="margin-bottom: 10px;">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/type'}">{{ NodeDate.name }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ goodsData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <img :src="getImageUrl(goodsData.iconUrl)" alt="" style="width: 400px;height: 400px;">
      </el-col>
      <el-col :span="9">
        <div>
          <h2 style=" margin-top: 2px">{{ goodsData.name }}<el-button>关注</el-button></h2>
          <div style="background-color: #f1f1f1;">
            <p>现价: <span>{{ goodsData.price }}</span></p>
          </div>
          <div style="">
            <el-text size="small">发货地：北京市 </el-text>
            <br>
            <el-text size="small">配送方式：<input type="radio" name="shipping" checked> 到付 <input type="radio"
                name="shipping">
              在线支付</el-text>
            <br>
            <el-text size="small">配送至：</el-text>
          </div>
          <div class="quantity">
            <el-text>数量：</el-text>
            <el-input-number v-model="num" :min="1" :max="99" @change="handleChange" />
          </div>
          <div style="margin-top: 5px;">
            <el-button type="round" @click="rightnow">立刻购买</el-button>
            <el-button round @click="addToCart">加入购物车</el-button>
          </div>
          <div>
            <el-text>服务承诺：</el-text>
            <el-text>送货入户 </el-text>
            <el-text>全国联保 </el-text>
            <el-text>无理由退货 </el-text>
          </div>
        </div>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
    <el-row>
      <el-col :span="3"></el-col>
      <el-col :span="18">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="商品详情" name="first">{{ goodsData.detail }}</el-tab-pane>
          <el-tab-pane label="规格参数" name="second">{{ goodsData.specParam }}</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
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
import { useRouter } from 'vue-router';
import axios from 'axios';
axios.defaults.withCredentials = true;
export default {
  setup() {
    const router = useRouter();
    const navTo = (url) => {
      router.push(url);
    };
    return {
      navTo,
    };
  },
  data() {
    let goodsId = this.$route.query.id
    let typeId = this.$route.query.id
    return {
      userId: '', 
      goodsId: goodsId,
      typeId: typeId,
      typeData: [],
      goodsData: [],
      NodeDate:[],
      cartItems: [],
      num: 1,
      activeName: 'first',
    };
  },
  mounted() {
    this.loadGoods();
    this.loadType();
    console.log(this.typeId);
    console.log(this.goodsData.partsId);
    this.loadUserId(); // 加载用户ID
  },
  methods: {
    getImageUrl(imageUrl) {
      // 根据返回的图片文件名拼接静态资源 URL
      return `http://192.168.153.25:9093/icon_url/${imageUrl}`;
    },
    async loadGoods() {
      try {
        const response = await axios.get(
          `http://192.168.153.25:9093/api/v1/product/getById`, {
          params: {
            id: this.goodsId,
          }
        }
        );
        
        this.goodsData = response.data; // 获取后端返回的用户数据
        this.loadNode();
      } catch (error) {
        console.error("获取商品信息失败:", error);
      }
    },
    async loadNode() {
      try {
        const response = await axios.get(
          `http://192.168.153.25:9093/api/v1/categories/getNodeById?id=${this.goodsData.partsId}`
        );
        console.log(this.goodsData);
        this.NodeDate=response.data;
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
        console.error("获取根节点失败:", error);
      }
    },
    async getManager() {
      try {
        const response = await axios.get("http://192.168.153.25:9093/api/v1/user/manager");
        this.user = response.data;
        console.log(this.user);
      } catch (error) {
        console.error("获取用户信息失败", error);
      }
},
    async loadUserId() {
      // 假设用户信息保存在 localStorage 或 sessionStorage 中
      this.userId = localStorage.getItem('userId');
    },
    async  addToCart() {
      // 将当前商品添加到购物车数组中
      const cartItem = {
        userId: this.userId,
        id: this.goodsData.id,
        productId:this.goodsData.productId,
        price: this.goodsData.price,
        quantity: this.num,
      };
      
      // 可以根据需要在添加完成后进行一些提示或者操作
      try {
        const response = await axios.post(
          'http://192.168.153.25:9093/api/v1/trolley/add', cartItem);
        console.log("已添加到购物车:", response.data);
      } catch (error) {
        console.error("添加到购物车失败:", error);
      }
    },
  },
};
</script>