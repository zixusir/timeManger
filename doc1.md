写这篇文章主要是记录我自己填的一个坑，掉进这个坑里，主要原因还是因为自己在阅读Vue官方文档的时候不够仔细。教训灰常深刻，很难受(;_;)

进入正题，我想做的是一个列表页面，通过点击列表的每一项可以显示或者隐藏这个项目的具体内容。

正常的思路这件小事的html部分应该这么写

```html
<template>
<ul>
<li v-for="(item, index) in list" :key="item.id">
  <div @click="toggleShow(index)">
    这里是正常显示的部分，通过点击触发隐藏部分显示或隐藏
  </div>
  <div v-show="item.show">
    这里是隐藏的部分
  </div>
</li>
</ul>
</template
```
如果是一般的思路，应该是在点击事件触发以后去操作dom,比如使用jquery的show()和hide()。但是，vue的主要思想是通过数据去驱动视图，因此，这里就不采用Jquery的解决方法,而是通过V-show，指令来控制隐藏部分的显示和隐藏。

script部分的写法
```js
<script>
import Vue from 'vue'
export default {
  name: 'status',
  data: function () {
    return {
      list: [
        {
          id: 1,
          title: '项目一',
          show: false
        },
        {
          id: 2,
          title: '项目二',
          show: false
        },
        {
          id: 3,
          title: '项目三',
          show: false
        }
      ]
    }
  },
  created: function () {
  methods: {
    toggleShow: function (index) {
      this.list[index].show = !this.list[index].show
    }
  }
}
</script>
```
在data部分，通过一个数组list，来存放列表需要显示的项目，每一个项目里面通过一个show属性来控制隐藏部分的显示和隐藏。从思路上面 这种写法是正确的，但实际上点击事件并不起作用。后来发现实际上点击事件触发了数组的属性也改变了，只是视图 没有更改。
被这个问题困扰了好久，但实际上Vue的官方文档已经给出了解释:

注意事项
由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
当你修改数组的长度时，例如：vm.items.length = newLength
举个例子：
```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```
为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果，同时也将触发状态更新：

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```
你也可以使用 vm.$set 实例方法，该方法是全局方 法 Vue.set 的一个别名：
```js
vm.$set(vm.items, indexOfItem, newValue)
```
为了解决第二类问题，你可以使用 splice：
```js
vm.items.splice(newLength)
```

视图没有更新的原因，就在于voe无法检测数组 的更改，正确的方法就是调用vue提供的set方法
重写script部分
```js
<script>
import Vue from 'vue'
export default {
  name: 'status',
  data: function () {
    return {
      list: [
        {
          id: 1,
          title: '项目一',
          show: false
        },
        {
          id: 2,
          title: '项目二',
          show: false
        },
        {
          id: 3,
          title: '项目三',
          show: false
        }
      ]
    }
  },
  created: function () {
  methods: {
    toggleShow: function (index) {
      let newItem = this.list[index]
      newItem.show = !this.list[index].show
      Vue.set(this.list , index, newItem)
      // 一定要注意vue不能检测的几种数据变化情况包括数组和对象
    }
    }
  }
}
</script>
```