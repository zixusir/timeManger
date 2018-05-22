// 第二个页面 status
<template>
  <div>
    <mt-header
      class="header"
      fixed title="物品状态">
    </mt-header>
    <ul>
      <li class="item">
        <p class="left">编号<span></span></p>
        <p class="center">名称</p>
        <p class="right">剩余时间</p>
      </li>
      <li v-for="(item, index) in sortDate"
        :key="item.id"
        :class="select(item.data)">
        <div class="item"
          v-on:click="toggleShow(index)">
          <p class="left">{{ sortDate.indexOf(item) }} <span></span></p>
          <p class="center">{{ item.title }}</p>
          <p class="right">{{ see(item.data) }}</p>
        </div>
        <div v-show="item.show">
          <div>在这里显示其他内容</div>
        </div>
        <hr/>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'status',
  data: function () {
    return {
      list: [],
      sortDate: []
    }
  },
  computed: {
    nowDate: function () {
      let date = new Date()
      return date
    }
  },
  created: function () {
    if (localStorage.hasOwnProperty('lists')) {
      this.list = JSON.parse(localStorage.getItem('lists'))
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].show = false
      }
    }
    let oldList = this.list.concat()
    // 使用concat是为了避免数组的联动
    let temp
    // 冒泡排序
    for (let i = 0; i < this.list.length; i++) {
      for (let j = 0; j < this.list.length - 1 - i; j++) {
        if (oldList[j].data > oldList[j + 1].data) {
          temp = oldList[j]
          oldList[j] = oldList[j + 1]
          oldList[j + 1] = temp
        }
      }
    }
    this.sortDate = oldList.concat()
  },
  methods: {
    see: function (time) {
      let days = (time - this.nowDate) / (24 * 60 * 60 * 1000)
      return Math.floor(days) + 1
    },
    select: function (stime) {
      let days = Math.floor((stime - this.nowDate) / (24 * 60 * 60 * 1000)) + 1
      if (days < 1) {
        return 'danger'
      } else if (days < 7) {
        return 'urgent'
      } else {
        return 'normal'
      }
    },
    toggleShow: function (index) {
      let newItem = this.sortDate[index]
      newItem.show = !this.sortDate[index].show
      Vue.set(this.sortDate, index, newItem)
      // 一定要注意vue不能检测的几种数据变化情况包括数组和对象
    }
  }
}
</script>

<style scoped>
.header {
  height: 50px;
  color: #ffffff;
}
ul {
  list-style-type: none;
  padding: 0 0;
  height: 400px;
  overflow-y: scroll;
  margin: 0 0;
}
li {
  background-color: #eaedf7;
}
.item {
  display: flex;
}
.item p{
  flex: 1;
}
.danger {
  background-color: #e9546b;
  color: white;
}
.urgent {
  background-color: #e6b422;
  color: white;
}
.normal {
  background-color: #2ca9e1;
  color: white;
}
</style>
