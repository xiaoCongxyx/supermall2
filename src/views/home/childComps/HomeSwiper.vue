<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      isSwiperImgLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods : {
    imgLoad() {
      if(!this.isSwiperImgLoad) {
        this.$emit('swiperImgLoad')
        this.isSwiperImgLoad = true
      }
    }
  }
};
</script>

<style scoped>

</style>
