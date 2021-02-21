<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType : {
      type: Number,
      default : 0
    },
    pullUpLoad : {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null,
    }
  },
  mounted() {
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      useTransition: false,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    // 监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })

    // 监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods : {
    scrollTo(x, y ,time) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      // 可以上拉加载多次
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>
