/* user.vue
*  author: zixu.sir
*  time: 2018.5.23
*/
<template>
  <div>
    <mt-header
      class="header"
      fixed title="个人">
    </mt-header>
    <div class="content">
      <div v-if="tab==='register'">
        <div class="page">
          <p class="textcenter">注册一个新用户</p>
          <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="newpsd"></mt-field>
          <mt-field label="确认密码" placeholder="再输入一次" type="password" v-model="secpsd"></mt-field>
          <mt-button disabled="regable">注册</mt-button>
          <mt-button>切回登录</mt-button>
        </div>
      </div>
      <div v-else-if="tab==='login'">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="newpsd"></mt-field>
        <mt-button @click="handleReg">注册新用户</mt-button>
      </div>
      <div v-else class="page">
        <div class="icon">
          <p class="v_center">{{userLogo}}</p>
        </div>
        <p>
          感谢使用，如果有什么意见建议，或者合作意向，欢迎联系:zixu_sir@163.com
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      list: [],
      tab: '',
      status: false,
      username: 'John',
      newuser: '',
      newemail: '',
      newpsd: '',
      secpsd: '',
      regable: true
    }
  },
  created: function () {
    // 读入数据
    if (localStorage.hasOwnProperty('list')) {
      this.list = JSON.parse(localStorage.getItem('lists'))
    }
    if (localStorage.hasOwnProperty('status')) {
      if (localStorage.hasOwnProperty('status') === 'true') {
        this.status = true
      } else {
        this.status = false
      }
    } else {
      this.status = false
      this.tab = 'register'
      localStorage.setItem('status', this.status)
    }
    if (localStorage.hasOwnProperty('username')) {
      this.username = localStorage.getItem('username')
    }
    console.log(this.status)
    if (!this.status) {
      console.log('why')
      this.tab = 'login'
    }
  },
  computed: {
    userLogo: function () {
      return this.username.charAt(0)
    }
  },
  watch: {
    secpsd: 'checksame',
    newpad: 'checksame'
  },
  methods: {
    handleReg: function () {
      this.tab = 'register'
    },
    checksame: function () {
      console.log(this.newpsd + ',' + this.secpsd)
      if (this.newpsd !== this.secpsd) {
        // this.regable = false
      } else {
        // this.regable = true
      }
    }
  }
}
</script>

<style scoped>
.header {
  height: 50px;
  color: #ffffff;
}
.content {
  display: flex;
}
.page {
  width: 95vw;
  flex: 1;
}
.textcenter {
  text-align: center;
  display: block;
}
.icon {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: #4AD5F3;
  display: table;
  margin: auto;
  vertical-align: middle;
}
.icon::before {
  content: '';
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
.v_center{
  display: inline-block;
  vertical-align: middle;
  font-size: 36pt;
  margin: auto;
}
</style>
