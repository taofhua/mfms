<template>
  <div class="layout">
    <div
      style="
        width: 100%;
        height: 5%;
        background-color: #3282b8;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      "
    >
      <el-icon
        style="
          color: white;
          margin-right: 20px;
          padding: 2px;
          margin-left: 10px;
        "
        @click="redirectToSystemShow"
        ><Operation
      /></el-icon>
    </div>

    <div style="width: 100%; height: 95%">
      <div
        style="
          width: 100%;
          height: 8%;
          display: flex;
          justify-content: flex-start;
        "
      >
        <el-text style="color: gray; font-size: large">订单管理</el-text>
      </div>
      <div
        style="
          width: 100%;
          height: 5%;

          display: flex;
          justify-content: space-between;
        "
      >
        <div style="width: 25%; height: 100%">
          <el-form :inline="true" size="small">
            <el-form-item label="订单编号">
              <el-input
                placeholder="请输入编号"
                style="width: 100px"
              ></el-input>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="width: 10%; height: 100%">
          <el-select placeholder="状态" size="small" style="width: 80px">
            <el-option label="未付款" key="" value=""></el-option>
            <el-option label="已付款" key="" value=""></el-option>
            <el-option label="已发货" key="" value=""></el-option>
            <el-option label="交易成功" key="" value=""></el-option>
            <el-option label="交易关闭" key="" value=""></el-option>
            <el-option label="取消" key="" value=""></el-option>
          </el-select>
        </div>
      </div>
      <el-table
        stripe
        border
        height="100%"
        :data="orders"
        style="width: 100%; height: 81%"
      >
        <el-table-column prop="orderNo" label="订单编号" width="150" />
        <el-table-column prop="uid" label="收件人" width="150" />
        <el-table-column prop="status" label="订单状态" width="200">
        </el-table-column>
        <el-table-column prop="amount" label="订单价格" width="150" />
        <el-table-column prop="status" label="状态" width="200">
        </el-table-column>
        <el-table-column prop="created" label="创建时间" width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              type="primary"
              plain
              @click="handleDetail(scope.row.id, scope.row.addrId, scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[8, 16, 24, 32]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <!-- 编辑用户对话框 -->
      <el-dialog v-model="dialogVisible"  style="width: 1000px">
        <el-descriptions title="订单详情" :column="1" border>
          <el-descriptions-item label="订单号">{{
            this.orderDetail.orderNo
          }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{
            this.orderDetail.created
          }}</el-descriptions-item>
          <el-descriptions-item label="收货人">{{
            this.orderAddress.name
          }}</el-descriptions-item>
          
          <el-descriptions-item label="订单状态"
            >{{ this.orderDetail.status }}</el-descriptions-item
          >
          <el-descriptions-item label="支付方式"
            >{{ this.orderDetail.type }}</el-descriptions-item
          >
          <el-descriptions-item label="订单金额"
            >{{ this.orderDetail.amount }}</el-descriptions-item
          >
          <el-descriptions-item label="收获地址"
            >{{ this.orderAddress.province }}{{ this.orderAddress.city
            }}{{ this.orderAddress.district
            }}{{ this.orderAddress.addr }}</el-descriptions-item
          >
        </el-descriptions>
        <el-table :data="orderItem" style="width: 100%">
    <el-table-column prop="goodsName" label="商品名称"></el-table-column>
    <el-table-column prop="iconUrl" label="商品图片" >
      <template v-slot="scope">
        <el-image :src="getImageUrl(scope.row.iconUrl)" fit="cover" style="width: 50px; height: 50px;"></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="price" label="单价" ></el-table-column>
    <el-table-column prop="quantity" label="数量" ></el-table-column>
    <el-table-column prop="totalPrice" label="总价"></el-table-column>
   
  </el-table>
      </el-dialog>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "UserView",
  data() {
    return {
      orders: [], // 用户数据
      orderAddress: [],
      orderItem: [],
      imageUrl: "", //图片资源
      currentPage: 1,
      pageSize: 8, // 每页条数，默认为10
      total: 0, // 总条目数，默认为0，需要从后端获取
      dialogVisible: false, // 控制查询对话框的显示与隐藏
      formLabelWidth: "80px",
      orderDetail: {
        id: null,
        orderNo: null,
        uid: null,
        addrId: null,
        amount: null,
        type: null,
        freight: null,
        status: null,
        paymentTime: "",
        deliveryTime: "",
        finishTime: "",
        closeTime: "",
        created: "",
        updated: ",",
      },
    };
  },
  mounted() {
    this.getOrders(); // 组件挂载时加载数据
  },
  methods: {
    getImageUrl(imageUrl) {
      // 根据返回的图片文件名拼接静态资源 URL
      return `http://192.168.153.25:9093/icon_url/${imageUrl}`;
    },
    handleDetail(id, addrId, row) {
      this.orderDetail = { ...row };
      this.getOrderItems(id);
      this.getOrderAdress(addrId);
      this.dialogVisible = true;
    },
    async getOrderItems(orderId) {
      try {
        const response = await axios.get(
          "http://192.168.153.25:9093/api/v1/orders/orderItem",
          {
            params: {
              id: orderId,
            },
          }
        );
        this.orderItem = response.data;
        console.log(this.orderItem);
      } catch (error) {
        console.error("获取数据失败:", error);
      }
    },
    async getOrderAdress(addrId) {
      try {
        const response = await axios.get(
          "http://192.168.153.25:9093/api/v1/address/id",
          {
            params: {
              id: addrId,
            },
          }
        );
        this.orderAddress = response.data;
        console.log(this.orderAddress);
      } catch (error) {
        console.error("获取数据失败:", error);
      }
    },
    async getOrders() {
      try {
        const response = await axios.get(
          "http://192.168.153.25:9093/api/v1/orders",
          {
            params: {
              startPage: this.currentPage, // 向后端传递当前页码
              pageSize: this.pageSize, // 向后端传递每页显示条目数
            },
          }
        );
        this.orders = response.data.orders; // 获取后端返回的用户数据
        this.total = response.data.total; // 获取后端返回的总条目数
      } catch (error) {
        console.error("获取数据失败:", error);
      }
    },
    handleSizeChange(val) {
      // 分页条目数变化时的处理函数
      this.pageSize = val; // 更新每页条目数
      this.currentPage = 1; // 重置当前页码为第一页
      this.getOrders(); // 重新获取数据
    },
    handleCurrentChange(val) {
      // 当前页码变化时的处理函数
      this.currentPage = val; // 更新当前页码
      console.log(this.currentPage); //
      this.getOrders();
    },
    redirectToSystemShow() {
      // 使用路由导航跳转到 SystemShowView 页面
      this.$router.push({ name: 'main' });
    },
  },
};
</script>
  
  <style >
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}

.layout {
  width: 100%;
  height: 100vh;
  background-color: #eeeeee;
}
.pagination-container {
  height: 6%;
  display: flex;
  justify-content: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed gray;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: black;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
  