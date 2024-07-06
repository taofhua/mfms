<template>
  <div class="common-layout">
    <el-header>
      <div style="
          background-color: #fcf9f9;
          display: flex;
          justify-content: space-between;
          padding: 10px;
        ">
        <div>
          <span>欢迎访问机械配件商城</span>
          <el-link @click="navTo('/index')"> [访问官网] </el-link>
          <el-link v-if="!isLoggedIn" @click="navTo('/login')">登录</el-link>
          <el-link v-else @click="navTo('/profile')">{{ username }}</el-link>
          <el-divider direction="vertical" />
          <el-link v-if="!isLoggedIn" @click="registerDialogVisible = true">免费注册</el-link>
          <el-link v-else @click="logout">退出</el-link>
        </div>
        <div>
          <el-link @click="navTo('/cart')" style="margin-left: 10px">购物车</el-link>
          <el-link @click="navTo('/order')" style="margin-left: 10px">订单</el-link>
          <el-link @click="navTo('/address')" style="margin-left: 10px">地址管理</el-link>
        </div>
      </div>
    </el-header>
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-header style="font-size: 40px; background-color: #008ed1; color: white">我的购物车</el-header>

      <el-container>
        <!-- 右侧内容 -->
        <el-main style="padding: 20px">
          <!-- 顶部菜单 -->
          <el-header style="background-color: #f0f2f5; padding: 20px">
            <el-tabs v-model="activeTab" @tab-click="handleTabClick">
              <el-tab-pane label="我的商品" name="all"></el-tab-pane>
            </el-tabs>
          </el-header>

          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>

            <el-table-column prop="iconUrl" label="商品照片" width="180">
              <template v-slot="{ row }">
                <img :src="row.iconUrl" style="width: 100px; height: auto" alt="商品照片" />
              </template>
            </el-table-column>
            <el-table-column prop="productName" label="商品" width="180"></el-table-column>
            <el-table-column prop="productPrice" label="单价（元）" width="180"></el-table-column>
            <el-table-column prop="quantity" label="数量" width="180"></el-table-column>
            <el-table-column label="操作" width="180">
              <template #default="{ row }">
                <el-button type="primary" @click="handleDelete(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 已选商品 -->
          <div v-if="selectedItems.length > 0" class="selected-items-container">
            <h3>已选择的商品:</h3>
            <div class="selected-items">
              <el-card v-for="item in selectedItems" :key="item.goods_name" class="selected-item" shadow="hover">
                <div class="selected-item-content">
                  <img :src="item.icon_url" alt="商品照片" class="selected-item-image" />
                  <p class="selected-item-name">{{ item.goods_name }}</p>
                </div>
              </el-card>
            </div>
          </div>

          <!-- 总价 -->
          <div v-if="selectedItems.length > 0" class="total-price-container">
            <p>总价: {{ this.totalPrice }}</p>
          </div>

          <!-- 按钮 -->
          <div style="margin-top: 20px; text-align: left">
            <el-button type="primary" plain @click="handleOpenOrder()">发起订单</el-button>
            <el-button type="primary" @click="handleCancel">取消订单</el-button>
          </div>

          <!-- 点击立即支付后的地址选择 -->
          <el-dialog v-model="addressForm" title="选择收货地址" width="500" center>
            <el-table :data="userAddress">
              <el-table-column label="姓名" prop="name"></el-table-column>
              <el-table-column label="电话" prop="phone"></el-table-column>
              <el-table-column label="地址" prop="province"></el-table-column>
              <el-table-column label="地址" prop="city"></el-table-column>
              <el-table-column label="地址">
                <template v-slot="scope">
                  <el-button type="primary" plain @click="handleCheck(scope.row) ">选择</el-button>
                </template></el-table-column>
            </el-table>

            <div class="form-buttons" style="display: flex; justify-content: center">
              <el-button type="primary" @click="handleCreateOrder()">发起订单</el-button>
              <el-button @click="cancelForm">取消</el-button>
            </div>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
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
    return {
      orderdetail: {
        uid: 2,
        addrId: null,
        orderItems: [],
      },
      addressForm: false, // 控制地址选择对话框显示与隐藏
      activeTab: "all", // 当前选中的标签页
      selectedItems: [], // 存储用户已选择的商品
      selectedAddress: [], //存放选择的地址
      userAddress: [],
      //列表数据
      tableData: [],
      totalPrice: 0,
      addressformData: {
        id: "",
        uid: "",
        orderId: "",
        goodsId: "",
        goodsName: "",
        iconUrl: "",
        price: "",
        quantity: "",
        totalPrice: 0,
        created: "",
        updated: "",
      },
    };
  },


  methods: {
    gettotalPrice() {
      let total = 0;
      console.log(this.selectedItems);
      this.selectedItems.forEach((item) => {
        total = total + item.price * item.quantity;
      });
      this.totalPrice += total;
    },
    async getTrolleyItem() {
      try {
        const response = await axios.get(
          `http://192.168.153.25:9093/api/v1/trolley/userTrolley`,
          {
            params: {
              userId: 2,
            },
          }
        );
        this.tableData = response.data;
      } catch (error) {
        console.error("编辑失败:", error);
      }
    },
    async handleCreateOrder() {
      this.selectedItems.forEach((item) => {
        this.orderdetail.orderItems.push(item);
      });

      console.log(this.selectedItems);

      try {
        await axios.post(
          `http://192.168.153.25:9093/api/v1/orders/createOrder`,
          this.orderdetail
        );
      } catch (error) {
        console.error("编辑失败:", error);
      }
    },
    handleCheck(row) {
      this.orderdetail.addrId = row.id;
      if (!this.selectedAddressIds.includes(row.id)) {
        this.selectedAddressIds.push(row.id);
      }
    },
    handleOpenOrder() {
      this.getUserAddress();
      this.addressForm = true;
    },
    async getUserAddress() {
      try {
        const response = await axios.get(
          `http://192.168.153.25:9093/api/v1/address/userId`,
          {
            params: {
              id: 2,
            },
          }
        );
        this.userAddress = response.data;
      } catch (error) {
        console.error("编辑失败:", error);
      }
    },
    handleTabClick(tab) {
      console.log("Tab clicked:", tab.name);
    },

    handleCancel() {
      this.selectedItems = [];
      this.$refs.tableData.clearSelection();
    },

    handleAddressChange() {
      console.log("选择的地址:", this.selectedAddress);
    },

    handleDelete(item) {
      const itemId = item.goods_id; // 假设goods_id是商品的唯一标识
      console.log("Deleting item with ID:", itemId); // 添加调试信息
      axios
        .post("/api/deleteItem", { id: itemId })
        .then((response) => {
          console.log("删除成功:", response.data);
        })
        .catch((error) => {
          console.error("删除失败:", error);
        });
    },

    // 准备提交的订单数据
    addressonSubmit() {
      const orderData = {
        selectedItems: this.selectedItems.map((item) => ({
          goodsId: item.goods_id,
          goodsName: item.name,
          iconUrl: item.iconUrl,
          price: item.price,
          stock: item.stock,
          quantity: 2,
          userId: 2,
        })),
        addr: this.selectedAddress,
      };

      // 显示订单数据的 JSON 字符串
      alert(JSON.stringify(orderData));
      console.log(orderData);
      this.addressForm = false;
    },

    // 隐藏表单
    cancelForm() {
      this.addressForm = false;
    },

    // 更新已选择商品列表
    handleSelectionChange(selection) {

      this.totalPrice = 0;
      this.selectedItems = [];
      

      selection.forEach((item) => {
        let orderitem = { id: item.id, uid: item.userId, goodsId: item.productId, goodsName: item.productName, price: item.productPrice, quantity: item.quantity, iconUrl: item.iconUrl };

        this.totalPrice += item.quantity * item.productPrice;
        console.log(orderitem);
        this.selectedItems.push(orderitem);
        console.log(this.selectedItems);
      });
    },
  },
  mounted() {
    // 发送异步请求获取商品表数据
    this.getTrolleyItem();
  }
};
</script>

<style scoped>
.common-layout {
  width: 100%;
  height: 100vh;
}

.selected-items-container {
  display: flex;
  flex-direction: column;
  /* 垂直排列 */
}

.selected-items {
  display: flex;
  flex-wrap: nowrap;
  /* 不换行，使得已选商品水平显示 */
  overflow-x: auto;
  /* 横向溢出时显示滚动条 */
}

.selected-item {
  flex: 0 0 auto;
  /* 不拉伸，固定宽度 */
  width: 200px;
  /* 商品卡片固定宽度 */
  margin-right: 10px;
  /* 右边距 */
}

.selected-item-content {
  text-align: center;
  /* 居中显示商品信息 */
}

.selected-item-image {
  width: 100px;
  /* 商品图片宽度 */
  height: 100px;
  /* 商品图片高度 */
  object-fit: contain;
  /* 保持图片比例不变 */
}
</style>
