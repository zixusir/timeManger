// a new vue component
// Vue 2.2.0+的版本里，当在组件中使用v-for时，key是必须设置的。
<template>
  <div class="hello">
    <mt-header class="header" fixed title="有效期限监控">
      <router-link to="/" slot="left">
        <mt-button icon="back" style="color: white;">返回</mt-button>
      </router-link>
      <mt-button @click.native="addItem" slot="right">添加</mt-button>
    </mt-header>
    <mt-loadmore>
    <ul v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li class="item">
        <p class="left">编号<span></span></p>
        <p class="center">名称</p>
        <p class="right">截止日期/次数</p>
      </li>
      <li v-for="(item, index) in list" :key="item.id">
        <div class="item"
          @click="toggleShow(index)">
          <p class="left">{{ index }} <span></span></p>
          <p class="center">{{ item.title }}</p>
          <p class="right">{{ see(item.data) }}</p>
        </div>
        <div v-show="listShow[index]">
          <mt-button type="primary"
            @click="changeTime">
            修改时间
          </mt-button>
          <mt-button type="danger">删除物品</mt-button>
          <div style="height: 5px;"></div>
        </div>
      </li>
    </ul>
    </mt-loadmore>
    <mt-popup
      class="popup"
      v-model="popupVisible"
      popup-transition="popup-fade">
      <h3>新增物品</h3>
      <mt-field label="名称" placeholder="请输入物品名称" v-model="newItem"></mt-field>
      <div class="timePicker" style="display: block;">
        <span
          class="mint-cell-text"
          style="text-align: left; color: rgb(66,185,131);">
          截止时间
        </span>
        <div class="mint-field-core" @click="handleDate">{{ this.showDate }}</div>
      </div>
      <mt-button @click.native="handleClick1" type="danger">取消</mt-button>
      <mt-button @click.native="deleteAll" type="danger">删除</mt-button>
      <mt-button @click.native="handleClick" type="primary">添加</mt-button>
    </mt-popup>
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm">
    </mt-datetime-picker>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'member',
  data () {
    return {
      loading: true,
      popupVisible: false,
      list: [
        {
          id: 1,
          title: 'box',
          data: '2018/10/10'
        },
        {
          id: 2,
          title: 'box',
          data: '2018/10/10'
        },
        {
          id: 3,
          title: 'box',
          data: '2018/10/10'
        }
      ],
      listShow: [],
      newItem: '',
      datetime: '1199116800000'
    }
  },
  computed: {
    showDate: function () {
      // 在这里将用毫秒表示的时间转化为年月日表示
      let date = new Date()
      date.setTime(this.datetime)
      return date.toLocaleDateString()
    }
  },
  created: function () {
    if (typeof (Storage) !== 'undefined') {
      console.log('浏览器支持storage')
    } else {
      console.log('你的浏览器不支持localStorage ')
    }
    if (localStorage.hasOwnProperty('lists')) {
      // console.log('the data find')
      let lists = localStorage.getItem('lists')
      this.list = JSON.parse(lists)
      for (let i = 0; i < this.list.length; i++) {
        this.listShow.push(false)
      }
    }
  },
  methods: {
    loadMore: function () {
      this.loading = true
      setTimeout(() => {
        let last = this.list[this.list.length - 1]
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i)
        }
        this.loading = false
      }, 2500)
    },
    addItem: function () {
      this.popupVisible = true
    },
    handleClick: function () {
      let id = this.list.length
      let item = {
        id: id + 1,
        title: this.newItem,
        data: this.datetime
      }
      this.list.push(item)
      localStorage.setItem('lists', JSON.stringify(this.list))
      this.popupVisible = false
    },
    handleClick1: function () {
      this.popupVisible = false
    },
    deleteAll: function () {
      this.list = []
      localStorage.removeItem('lists')
    },
    handleDate: function () {
      this.$refs.picker.open()
    },
    handleConfirm: function (date) {
      this.datetime = date.valueOf()
    },
    see: function (time) {
      let date = new Date()
      date.setTime(time)
      return date.toLocaleDateString()
    },
    toggleShow: function (index) {
      Vue.set(this.listShow, index, !this.listShow[index])
    },
    changeTime: function (index) {
      let id = index
      console.log(id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0 0;
  height: 400px;
  overflow-y: scroll;
  margin: 0 0;
}
li {
  /* display: inline-block */
  background-color: #eaedf7;
  border-style: none none solid none;
  border-width: 1px;
  border-color: white;
}
a {
  color: #42b983;
}
p {
}
.item {
  display: flex;
}
.item p {
  flex: 1;
}
.header {
  height: 50px;
  color: #ffffff;
}
.popup {
  width: 80%;
  padding: 10px 10px;
}
.timePicker {
  padding: 0px 10px 15px 5px;
}
.timePicker span {
  padding-left: 10px;
  float: left;
  text-align: left;
  width: 105px;
}
.timePicker div {
  width: 90%;
  text-align: left;
}
</style>
