<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!--  商品列表  -->
    <cart-list></cart-list>

    <!--  底部汇总  -->
    <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import CartList from "views/cart/childComps/CartList";
  import CartBottomBar from "views/cart/childComps/CartBottomBar";

  import { mapGetters } from 'vuex'


  export default {
    name: "Cart",
    components: {
      CartBottomBar,
      CartList,
      NavBar
    },
    computed: {
      // ...mapGetters(['getLength'])
      // 可以讲getters中解构出来的方法重命名
      ...mapGetters({
        length : 'getLength'
      })
    }
  }
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}

</style>
