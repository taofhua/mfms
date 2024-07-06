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
              <el-link v-if="!isLoggedIn" @click="registerDialogVisible = true">免费注册</el-link>
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
                <div style="display: flex; align-items: center;">
          <el-input
            v-model="input"
            style="width: 240px"
            
            placeholder="搜索内容"
            :suffix-icon="SearchIcon"
          />
          <el-button type="primary" @click="handleSearch" style="margin-left: 10px;">搜索</el-button>
        </div>
                <div style="margin-top: 10px;"><el-text>热销：<el-link @click="navTo('/detail?id=1')">转速传感器</el-link></el-text></div>
              </div> 
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
  <el-sub-menu v-for="typeData in typeData" :key="typeData.id" :index="typeData.id.toString()" @click="navTo('/type?id='+typeData.id)">
  <template #title>{{ typeData.name }}</template>
  <el-menu-item v-for="subCategory in typeData.children" :key="subCategory.id" :index="subCategory.id.toString()" @click="navTo('/type?id='+subCategory.id)">
    {{ subCategory.name }}
  </el-menu-item>
</el-sub-menu>
  </el-menu>
  </div>
  </el-header>
  </el-container>        
            <el-container >
              <div style="width: 15%;"></div>
              <el-main>
                <el-carousel>
                  <el-carousel-item v-for="item in carousel_top" :key="item">
                    <img :src="item" alt="" style="width: 900px;height: 400px;">
                  </el-carousel-item>
                </el-carousel>
                <div class="lmf_t"><span>HOT</span>热销系列产品</div>
                  <el-row :gutter="1">
                  <el-col :span="4"  v-for="item in goodsData" :key="item">
                  <img :src="getImageUrl(item.iconUrl)" @click="navTo('/detail?id='+item.id)" alt="" style="width: 100%; height: 175px;border-radius: 10px;border: #cccccc 1px">
                  <div class="rex">{{item.name}}</div>
                  <div>￥{{item.price}}</div>
                  </el-col>
                </el-row>
              </el-main>
              <div style="width: 16%;"></div> 
            </el-container> 
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
import {useRouter } from 'vue-router';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { ElButton, ElInput } from 'element-plus'; // 引入 Element UI 的按钮和输入框组件
export default {
  components: {
    ElButton,
    ElInput
  },
  setup() {
    const router = useRouter();
    const navTo = (url) => {
      router.push(url);
    };
    return {
      navTo,
      SearchIcon: 'el-icon-search', 
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
    };
  },
  data() {
    let typeId=this.$route.query.id
    let goodsId=this.$route.query.id
    return {
      typeId:typeId,
      goodsId:goodsId,
    typeData:[],
    categories: [], // 假设从后端获取的分类数据会存储在这里
    goodsData:[],
    carousel_top:[
      require('@/assets/lunb1.jpg'),
      require('@/assets/lunb2.jpg'),
      require('@/assets/lunb3.jpg'),
    ]
    };
  },
  mounted(){
   this.loadGoods()
   this.loadType()
  },
  methods:{
    getImageUrl(imageUrl) {
      // 根据返回的图片文件名拼接静态资源 URL
      return `http://192.168.153.25:9093/icon_url/${imageUrl}`;
    },
    async loadGoods() {
      try {
        const response = await axios.get(
          "http://192.168.153.25:9093/api/v1/product/hot?num=5"
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
          console.error("获取根节点失败:", error);
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
    handleSelect(index) {
      console.log('选中菜单项:', index);
      // 可以在这里处理选中菜单项的逻辑，如果需要的话
    },
}
}
</script>

<style>
body { 
  position: relative; min-width: 1000px; background: #ffffff; }

.content_box { width: 1100px; margin: 0 auto; overflow: hidden; }

#mallNav {
  width: 100%;
  border-bottom: #41b6e7 3px solid;
}
#mallNav .el-link {
  color: #595959;
  height: 42px;
  line-height: 42px;
  text-align: center;
  padding: 0 32px;
  font-size: 16px;
  display: inline-block;
}
.footer a {
  color: white;
  text-decoration: none;
}
.footer a:hover {
  text-decoration: underline;
}
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
.lmf_t {
    background: #ffffff;
    font-size: 20px;
    padding-left: 10px;
    font-weight: normal;
    margin-top: 10px;
}

.lmf_t span {
    color: #ff4a00;
    font-size: 18px;
    font-weight: bold;
}

.lmf_main {
    border-top: none;
    width: 1000px;
    padding-top: 10px;
    overflow: hidden;
    display: flex;
}
.content_box ul {
  display: flex;
  justify-content: space-between;
}

.item-1 {
  flex: 1;
  margin: 0;
}

.item-1 p {
  text-align: center;
}
.custom-div {
    background-color: #a0cfff;
    color: white;
    font-size: inherit; /* Inherit font size from parent element (h1) */
    display: inline-block; /* Ensures the div only takes as much width as its content */
    padding: 5px; /* Add padding for better visibility */
  }
  .F{
    display: flex;
    align-items: baseline;
    border-bottom: #a0cfff 3px solid;
  }
.rex{
  margin-top: 10px; 
  font-weight: 500;
  font-size: 16px;
  width: 160px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.text_tit{
  font-size: 12px;
}
.text_info{
  font-size: 12px;
}
</style>