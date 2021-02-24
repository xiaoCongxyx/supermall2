<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <!--  tabControl的假象控制  -->
    <tab-control v-show="isShowFixed" class="tab-control" ref="tabControl1" :titles="['流行','新款','精选']"
                 @tabClick="tabClick" />
    <!--  滚动区域  -->
    <scroll :probe-type="3" :pull-up-load="true" @pullingUp="loadMore" @scroll="backTop"  ref="scroll" class="content">
      <home-swiper @swiperImgLoad="swiperImgLoad" :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control ref="tabControl2" :titles="['流行','新款','精选']"
                   @tabClick="tabClick" />
      <goods-list :goods="showGoods" />
    </scroll>

    <!--  回到顶部  -->
    <back-top v-show="isShowBackTop" @click.native="backClick"/>

  </div>
</template>

<script>

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/context/tabControl/TabControl";
import GoodsList from "components/context/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import {itemImgListener, backTopMixin} from "common/mixin";


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
      tabControlOffsetTop : 0,
      isShowFixed: false,
      saveY: 0
    }
  },
  mixins: [itemImgListener, backTopMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  components: {
    Scroll,
    GoodsList,
    TabControl,
    FeatureView,
    RecommendView,
    HomeSwiper,
    NavBar
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scrollY()

    // 在离开时取消事件
    this.$bus.$off('itemImgLoad', this.itemImgListener)

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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    // 控制返回顶部图片显示隐藏
    backTop (position) {
      // 判断backTop是否显示
      this.listenerBackTop(position)

      // 判断tabControl是否fixed 固定/吸顶
      this.isShowFixed = Math.abs(position.y) > this.tabControlOffsetTop ? true : false
    },

    // 轮播图加载完成后 计算tabControl的top值
    swiperImgLoad () {
        // 获取tabControl的offsetTop值
        this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)

      this.$refs.scroll.finishPullUp()


      // this.$refs.scroll.scroll.refresh()
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
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 99;
}

</style>
