<template>
  <div class="toast" v-show="showDiaLog">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  data () {
    return {
      message: '',
      showDiaLog : false
    }
  },
  methods : {
    show (message='默认参数',duration = 1500) {
      this.message = message;
      this.showDiaLog = true;

      setTimeout(() => {
        this.showDiaLog = false;
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 8px 10px;

  z-index: 999;

  color: #fff;
  background-color: rgba(0,0,0,.75);
}
</style>
