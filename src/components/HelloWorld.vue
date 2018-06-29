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
  background: #f7f7f7;
}
</style>
