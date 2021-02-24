<template>
  <div class="bottom-menu">
    <check-button :isChecked="checkedAll" class="select-all" @click.native="changeCheckedAll" />

    <span>全选</span>

    <span class="total-price">合计: ￥{{ totalPrice }}</span>
    <span class="buy-product" @click="caclClick">去计算({{ totalGoods }})</span>
  </div>
</template>

<script>
import CheckButton from "components/context/checkButton/CheckButton";

import {mapGetters} from 'vuex'


export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed : {
    ...mapGetters(['cartList']),
    // 计算被选中商品的价格
    totalPrice () {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((pre, checkedItem) => {
        return pre + checkedItem.price * checkedItem.count
      }, 0).toFixed(2)
    },

    // 计算被选中商品的数量
    totalGoods () {
      return this.cartList.filter(item => {
        return item.checked
      }).length
    },

    // 全选业务的实现
    checkedAll () {
      return  !(this.cartList.length === 0) && !(this.cartList.find(item => !item.checked))
    },


  },
  methods : {
    // 点击全选按钮
    changeCheckedAll () {
      if(this.checkedAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },

    // 结算业务
    caclClick () {
      if(!this.checkedAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }

  }
}
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
