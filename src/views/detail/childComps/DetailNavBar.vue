<template>
  <nav-bar>
    <div slot="left" class="back" @click="goBack">
      <img src = "~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div @click="titleClick(index)" :class="{active: index === currentIndex}" class="title-item" v-for="(item, index) in titles">{{ item }}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {NavBar},
  data () {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods : {
    titleClick(index) {
      this.currentIndex = index

      this.$emit('itemTabClick', index)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 11px;
}
</style>
