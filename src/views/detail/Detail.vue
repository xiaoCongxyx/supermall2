<template>
  <div id="detail">

    <!--  详情页顶部导航区  -->
    <detail-nav-bar class="detail-nav" @itemTabClick="itemTabClick" ref="nav" />

    <!--  内容滚动区  -->
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :detailSwiperImg="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="listInfo"></goods-list>
    </scroll>

    <!--  底部购物车区  -->
    <detail-bottom-bar @goCart="goToCart" />

    <!--  回到顶部  -->
    <back-top v-show="isShowBackTop" @click.native="backClick"/>


  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/context/goods/GoodsList";


import {getDetail, Goods, Shop, GoodsParam, getDetailImg} from "network/detail";

import {itemImgListener, backTopMixin} from "common/mixin";
import {debounce} from "common/debounce";

import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailBottomBar,
    GoodsList,
    DetailCommentInfo,
    DetailParamInfo,
    DetailGoodsInfo,
    DetailShopInfo,
    Scroll,
    DetailBaseInfo,
    DetailSwiper,
    DetailNavBar
  },
  mixins: [itemImgListener, backTopMixin],
  data () {
    return {
      iid: null,
      topImages: [],
      goods : {},
      shop : {},
      detailInfo : {},
      paramInfo : {},
      commentInfo : {},
      recommends : [],
      itemTabBarTitles: [],
      getThemeTop : null,
      currentIndex : 0,
    }
  },
  created() {
    // 保存进入的详情页的id
    this.iid = this.$route.params.iid

    // 获取进入的详情页的数据
    this.getDetail()

    // 获取详情页的推荐图片
    this.getDetailImg()

    // 给getThemeTop赋值(对给this.itemTabBarTitles的赋值的操作进行防抖)
    this.getThemeTop = debounce(() => {

      // 根据最新的数据，对应的DOM是已经被渲染出来
      // 但是图片依然是没有加载完成(目前获取到offsetTop不包含其中的图片)
      // offsetTop值不对的时候，都是因为图片的问题

      this.itemTabBarTitles = []

      this.itemTabBarTitles.push(0)
      this.itemTabBarTitles.push(this.$refs.params.$el.offsetTop)
      this.itemTabBarTitles.push(this.$refs.comment.$el.offsetTop)
      this.itemTabBarTitles.push(this.$refs.listInfo.$el.offsetTop)
      this.itemTabBarTitles.push(Number.MAX_VALUE)

    }, 100)

  },
  methods : {
    ...mapActions(['addCart']),

    // 点击详情页小导航滑动至点击的模块
    itemTabClick(index) {
      this.$refs.scroll.scrollTo(0,-this.itemTabBarTitles[index],500)
    },

    // 点击前往购物车
    goToCart () {
      // 获取购物车需要展示的信息
      const cartInfo = {}
      cartInfo.image = this.topImages[0]
      cartInfo.title = this.goods.title
      cartInfo.desc = this.goods.desc
      cartInfo.price = this.goods.realPrice
      cartInfo.iid = this.iid

      // console.log(cartInfo)

      // 把商品添加到购物车里面
      // this.$store.dispatch('addCart', cartInfo)

      this.addCart(cartInfo)
        .then(res => {
          // console.log(this.$toast)
          this.$toast.show('添加商品成功', 2000)
        })

    },

    // 图片加载刷新
    imageLoad () {
      this.$refs.scroll.refresh()

      // 在图片加载完成后计算offsetTop的值并给this.itemTabBarTitles进行赋值 完成点击商品详情也的小tabBar进行滑动内容
      this.$nextTick(() => {
        this.getThemeTop()
      })

    },

    contentScroll (position) {
      // 获取y值的坐标
      let positionY = -position.y;

      let length = this.itemTabBarTitles.length;


      for (let i = 0; i < length - 1; i++) {

        // 复杂写法
        // if (this.currentIndex !== i && ((i < length -1 && positionY >= this.itemTabBarTitles[i] && positionY < this.itemTabBarTitles[i+1]) || (i === length -1 && positionY >= this.itemTabBarTitles[i]))) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex
        //   console.log('进入了条件判断代码区',this.currentIndex)
        // }

        // 空间换时间 (性能优化/写代码的时间)
        if (this.currentIndex !== i && (positionY >= this.itemTabBarTitles[i] && positionY < this.itemTabBarTitles[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
        }

        // 有关返回顶部的图片显示与隐藏的混入业务代码
        this.listenerBackTop(position)

      }

    },

    /**
     *  网络请求相关
     */

    // 获取进入的详情页的数据
    getDetail() {
      getDetail(this.iid)
        .then(res => {
          const data = res.result

          // 获取轮播图图片信息
          this.topImages = data.itemInfo.topImages

          // 获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          // 创建店铺信息对象
          this.shop = new Shop(data.shopInfo)

          // 保存商品的详情数据
          this.detailInfo = data.detailInfo

          // 获取参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

          // 获取评论数据
          if(data.rate.list) {
            this.commentInfo = data.rate.list[0]
          }


        })
    },

    // 获取详情页的推荐图片
    getDetailImg() {
      getDetailImg()
        .then(res => {
          this.recommends = res.data.list
        })
    },


  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 50px);
}
</style>
