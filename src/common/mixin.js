import { debounce } from "./debounce";
import BackTop from "components/context/backTop/BackTop";

export const itemImgListener = {
  data () {
    return {
      itemImgListener: null,
      refresh : null
    }
  },
  mounted () {
    this.refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods : {
    // 返回顶部
    backClick () {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenerBackTop(position) {
      this.isShowBackTop = Math.abs(position.y) > 1000 ? true : false
    }
  },
  components : {
    BackTop
  }
}

