<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="item in cartList" :key="item.iid" :product="item" />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import CartListItem from "views/cart/childComps/CartListItem";

import { mapGetters } from 'vuex'


export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  computed : {
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>
.content {
  height: calc(100vh - 93px - 40px);
}
.cart-list {
  height: 100%;
  overflow: hidden;
}
</style>
