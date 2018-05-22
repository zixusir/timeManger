<template>
  <div id="app">
    <router-view/>
    <mt-tabbar v-model="selected" :click='handleClick'>
    <mt-tab-item id="tab-container1">
      <img slot="icon" src="./assets/icon/ViewGallery.png" />
      清单
    </mt-tab-item>
    <mt-tab-item id="tab-container2">
      <img slot="icon" src="./assets/icon/email.png" />
      状态
    </mt-tab-item>
    <mt-tab-item id="tab-container3">
      <img slot="icon" src="./assets/icon/account.png" />
      个人
    </mt-tab-item>
  </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      selected: 'tab-container1',
      active: 'tab-container1'
    }
  },
  computed: {
  },
  methods: {
    handleClick: function () {
      this.active = this.selected
      switch (this.selected) {
        case 'tab-container1':
          this.$router.push('/member')
          break
        case 'tab-container2':
          this.$router.push('/status')
          break
        case 'tab-container3':
          this.$router.push('/user')
          break
      }
    }, // 饿了么的前端框架tabelement应该包含点击事件，如果在item钟重写点击事件这可能导致原油点击事件框架不可用
    routerto: function (routerpath) {
      this.$router.push(routerpath)
    }
  },
  watch: {
    selected: 'handleClick'
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
mt-header{
  background-color: #012500;
}
</style>
