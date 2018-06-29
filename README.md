## searchBox

### 配置项

***基础配置***

- **showClearBtn**是否显示清除按钮，默认：true
- **showSearchBtn**是否显示搜索按钮，默认：true
- **placeholder** 搜索框默认显示文字，默认：''
- **selectLength** 键盘精灵联想显示条数，默认：5
- **autoFocus** 聚焦输入框时是否全选输入框内容，默认：false
- **highlightSearchData** 是否在下拉框中高亮搜索框中的字段，默认：false
- **highlightSearchColor** 下拉框中高亮颜色，默认：‘#f00’

***键盘精灵配置***

- **useJpjl** 是否使用键盘精灵（在浏览器会调用web键盘精灵接口、在客户端会调用客户端键盘精灵接口），默认：false
- **JpjlClientCodeType** useJpjl为true时，在客户端调用键盘精灵接口过滤的市场id，默认：['16', '32']
- **JpjlBrowserCodeType** useJpjl为true时，在浏览器调用键盘精灵接口过滤的市场id，默认：['stock']，可选项：stock/fund/kh/usa

***调用方法配置***

- **associationFun** 输入框内容联想功能，触发方式：输入框内容发生改变时，如果使用键盘精灵，在键盘精灵没有返回值时调用该方法；如果没有使用键盘精灵则直接调用该方法
- **noInputAssociationFun** 输入框没有内容时的联想功能，触发方式：在搜索框没有内容的时候聚焦搜索框触发该方法
- **clearInput** 清除输入框内容方法，触发方式：点击搜索框的清除按钮时触发该方法
- **noInputFun** 输入框的内容被删除完时触发的方法，触发方式：用键盘删除按钮删除完输入内容时触发
- **search** 搜索功能，触发方式：点击搜索框的搜索按钮或键盘回车或点击联想框内数据时触发该方法
- **JpjlFun** useJpjl为true时，输入框内容发生改变时调用该方法，若未定义该方法，则默认显示股票代码和股票名称

***下拉框插槽***

- **dropbox-start** 下拉框内容的最前面
- **dropbox-end** 下拉框内容的最后面，注：点击事件用mousedown不要用click

### 方法

通过`this.$refs.searchBox`调用

- **focusInput** 光标聚焦输入框
- **blurInput** 光标从输入框失焦
- **setInputData** 设置输入框内的值
- **getInputData** 获取当前输入框内的值
- **selectFunc** 全选输入框的内容

### 数据

通过`this.$refs.searchBox`调用

- dropData 下拉框中的数据，Array，数组的值可以是字符串也可以是对象，对象为{key:‘’,val:‘’} // key为搜索的内容，val为显示的内容
- showDropbox 是否显示下拉框，Boolean
- ... （需要扩展联系组件开发者） 

```html
<template>
  <searchbox class="searchbox-container"
      ref="searchBox"
      :showClearBtn=showClearBtn
      :showSearchBtn=showSearchBtn
      :placeholder="placeholder"
      :selectLength=selectLength
      :highlightSearchData=highlightSearchData
      :highlightSearchColor="highlightSearchColor"
      :useJpjl=useJpjl
      :JpjlClientCodeType="JpjlClientCodeType"
      :JpjlBrowserCodeType="JpjlBrowserCodeType"
      :associationFun="associationFun"
      :noInputAssociationFun="noInputAssociationFun"
      :noInputFun="noInputFun"
      :clearInput="clearInput"
      :search="search"
  >
    <div slot="dropbox-start"><p>暂无匹配搜索项：</p><p>猜你喜欢：</p></div>
    <div slot="dropbox-end" @mousedown="delHistory">删除历史记录</div>
  </searchbox>
</template>

<script>
import searchBox from './searchBox.vue'
export default {
  name: 'HelloWorld',
  components: {
    searchbox: searchBox
  },
  data () {
    const s = this
    return {
      showClearBtn: true,
      showSearchBtn: true,
      placeholder: '请输入选股条件',
      selectLength: 5,
      highlightSearchData: true,
      highlightSearchColor: '#0f0',
      useJpjl: true,
      JpjlClientCodeType: ['16', '17', '32', '33'],
      JpjlBrowserCodeType: ['stock', 'fund', 'usa', 'hk'],
      associationFun: s.associationfun,
      noInputAssociationFun: s.noInputAssociationfun,
      noInputFun: s.noInputfun,
      clearInput: s.clearInputfun,
      search: s.searchfun
    }
  },
  methods: {
    jpjlfun (data) {
      console.log('键盘精灵数据：' + data)
    },
    associationfun (val) {
      console.log('开始自己的联想：' + val)
      const s = this
      s.$http.jsonp('https://sug.so.360.cn/suggest?word=' + val + '&encodein=utf-8&encodeout=utf-8').then(function (res) {
        s.$refs.searchBox.dropData = res.data.s
        if (res.data.s.length > 0) {
          s.$refs.searchBox.showDropbox = true
        } else {
          s.$refs.searchBox.showDropbox = false
        }
      })
    },
    noInputAssociationfun () {
      console.log('输入框内没有内容！')
      const s = this
      s.$http.jsonp('https://sug.so.360.cn/suggest?word=JavaScript&encodein=utf-8&encodeout=utf-8').then(function (res) {
        s.$refs.searchBox.dropData = res.data.s
        if (res.data.s.length > 0) {
          s.$refs.searchBox.showDropbox = true
        } else {
          s.$refs.searchBox.showDropbox = false
        }
      })
    },
    noInputfun () {
      console.log('输入框的内容被删光啦！')
    },
    clearInputfun () {
      console.log('输入框里的内容被清除啦！')
    },
    searchfun (val) {
      console.log('搜索：' + val)
    },
    delHistory () {
      console.log('删除历史记录')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchbox-container{
  width: 300px;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
}
</style>

```

