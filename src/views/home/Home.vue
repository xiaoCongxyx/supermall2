<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <!--  滚动区域  -->
    <scroll :probe-type="3" :pull-up-load="true" @pullingUp="loadMore" @scroll="backTop"  ref="scroll" class="content">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']"
                   @tabClick="tabClick" />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick()" v-show="isShowBackTop" />


  </div>
</template>

<script>

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/context/tabControl/TabControl";
import GoodsList from "components/context/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/context/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";



export default {
  name: "Home",
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        "pop": {page: 0, list: []},
        "new": {page: 0, list: []},
        "sell": {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  components: {
    BackTop,
    Scroll,
    GoodsList,
    TabControl,
    FeatureView,
    RecommendView,
    HomeSwiper,
    NavBar
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata()

    // 请求商品数据
    this.getHomeGoods("pop");

    this.getHomeGoods("new");

    this.getHomeGoods("sell");
  },
  methods: {

    /**
     *  事件相关方法
     *
     */

    // tab控制切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
    },

    // 返回顶部
    backClick () {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

    // 控制返回顶部图片显示隐藏
    backTop (position) {
      // console.log(position);
      this.isShowBackTop = Math.abs(position.y) > 1000 ? true : false
    },

    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)

      this.$refs.scroll.finishPullUp()

      // this.$refs.scroll.scroll.re
    },



    /**
     *  网络请求相关方法
     */

    // 请求轮播图多个数据方法
    getHomeMultidata() {
      getHomeMultidata()
        .then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
    },

    // 请求商品数据的方法
    getHomeGoods(type) {
      let page = this.goods[type].page + 1
      getHomeGoods(type,page)
        .then(res => {
          // 把请求来的商品数据保存起来
          this.goods[type].list.push(...res.data.list)
          // 更新页码
          this.goods[type].page += 1
        })
    }
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  text-align: center;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 99;
}

.content {
  /*overflow: hidden;*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
