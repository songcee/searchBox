<template>
  <div class="search-warp" :class="{focusWarp: focusStatus}">
    <div class="search-btn" @click="_searchInput" :class="{focusBtn: focusStatus}" v-if="showSearchBtn">
    <svg t="1527132796897" class="search-btn-svg" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6161" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><path d="M430.72 782.4C229.44 782.4 66.272 622.08 66.272 424 66.272 225.92 229.44 65.28 430.72 65.28 632 65.28 795.2 225.92 795.2 424 795.2 622.08 632 782.4 430.72 782.4L430.72 782.4ZM1014.016 968 749.728 707.84C818.912 632.64 861.44 533.44 861.44 424 861.44 189.76 668.608 0 430.72 0 192.832 0 0 189.76 0 424 0 657.92 192.832 847.68 430.72 847.68 533.504 847.68 627.776 812.16 701.824 752.96L967.168 1014.08C980.128 1026.88 1001.088 1026.88 1014.016 1014.08 1026.976 1001.6 1026.976 980.8 1014.016 968L1014.016 968Z" p-id="6162"></path></svg>
    </div>
    <div class="search-clear" @click="_clearInput" v-show="inputData!='' && inputData!=placeholder" v-if="showClearBtn">
    <svg t="1527131202262" class="search-clear-svg" style="" viewBox="0 0 1076 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2015" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15"><path d="M1074.977 463.141l1.763 1.396q-0.869-0.735-1.763-1.396zM0 465.15l3.184-2.523c-3.822 2.659-6.942 6.058-9.205 10.009z" p-id="2016"></path><path d="M111.983 994.893c-0.282 1.886-0.576 3.759-0.833 5.657 0.53-2.012 0.843-4.326 0.86-6.71zM83.758 1021.833zM55.569 991.477q0.306-2.118 0.637-4.237c-0.43 1.794-0.687 3.859-0.71 5.981z" p-id="2017"></path><path d="M1021.931 984.901c0.355 2.216 0.673 4.445 0.992 6.674-0.088-2.676-0.521-5.217-1.258-7.625zM965.272 999.46c-0.245-1.751-0.502-3.49-0.771-5.229 0.137 2.393 0.541 4.636 1.182 6.776z" p-id="2018"></path><path d="M538.634 0c-282.327 0-512 229.673-512 512s229.673 512 512 512 512-229.673 512-512-229.673-512-512-512zM538.634 950.516c-241.808 0-438.528-196.757-438.528-438.528s196.721-438.516 438.528-438.516 438.528 196.721 438.528 438.528-196.757 438.528-438.528 438.528z" p-id="2019"></path><path d="M748.554 305.446c-6.631-6.706-15.832-10.858-26.003-10.858-10.025 0-19.107 4.034-25.712 10.568l-158.353 156.638-155.944-156.458c-6.621-6.639-15.777-10.747-25.893-10.747-20.195 0-36.566 16.371-36.566 36.566 0 10.079 4.078 19.206 10.674 25.82l155.723 156.249-156.997 155.258c-6.704 6.632-10.856 15.833-10.856 26.003 0 20.197 16.373 36.571 36.571 36.571 10.027 0 19.112-4.036 25.718-10.571l157.214-155.512 158.466 159.030c6.568 6.345 15.524 10.255 25.393 10.255 20.194 0 36.564-16.37 36.564-36.564 0-9.814-3.867-18.726-10.16-25.293l-158.27-158.833 158.136-156.409c6.706-6.631 10.858-15.832 10.858-26.003 0-10.025-4.034-19.107-10.568-25.712z" p-id="2020"></path></svg>
    </div>
    <!-- <div class="search-content"> -->
    <input type="text"
      id="search_input"
      ref="searchInput"
      autocomplete="off"
      v-model="inputData"
      v-focus="focusStatus"
      :class="{placeholder: inputData==placeholder}"
      @focus="_focusFunc"
      @blur="_blurFunc"
      @keyup="_keyupFunc"
      @keydown.enter="_searchInput"
      @keydown.down="_selectDown"
      @keydown.up.prevent="_selectUp"
      @compositionstart="_compositionStart"
      @compositionend="_compositionEnd"
    >
    <!-- </div> -->
    <div class="search-dropbox" v-show="showDropbox">
      <slot name="dropbox-start"></slot>
      <p v-for="(item, index) in dropData"
        :title="_renderDropDataTitle(item)"
        @mousedown="_changeInput(item)"
        :class="{hover: index==now}"
        @mouseover="_hoverSelect(index)"
        v-html="_renderDropData(item)"
        :key="index"
      ></p>
      <slot name="dropbox-end"></slot>
    </div>
  </div>
</template>
<script>
// import Vue from 'vue'

export default {
  name: 'searchBox',
  props: {
    // 是否显示清除按钮
    'showClearBtn': {
      type: Boolean,
      default: true
    },
    // 是否显示搜索按钮
    'showSearchBtn': {
      type: Boolean,
      default: true
    },
    // 搜索框默认显示文字
    'placeholder': {
      type: String,
      default: ''
    },
    // 搜索联想显示条数
    'selectLength': {
      type: Number,
      default: 5
    },
    // 聚焦输入框时是否全选输入框内容
    'autoFocus': {
      type: Boolean,
      default: false
    },
    // 是否在下拉框中高亮搜索框中的字段
    'highlightSearchData': {
      type: Boolean,
      default: false
    },
    'highlightSearchColor': {
      type: String,
      default: '#f00'
    },
    // 是否使用键盘精灵
    'useJpjl': {
      type: Boolean,
      default: false
    },
    // useJpjl为true时，输入框内容发生改变时调用该方法
    'JpjlFun': {
      type: Function,
      default: function () {}
    },
    // useJpjl为true时，在客户端调用键盘精灵接口过滤的市场id
    'JpjlClientCodeType': {
      type: Array,
      default: function () { return ['16', '32'] }
    },
    // useJpjl为true时，在浏览器调用键盘精灵接口过滤的市场id
    'JpjlBrowserCodeType': {
      type: Array,
      default: function () { return ['stock'] }
    },
    // 输入框内容联想功能
    'associationFun': {
      type: Function,
      default: function () {}
    },
    // 没有输入内容是的联想功能
    'noInputAssociationFun': {
      type: Function,
      default: function () {}
    },
    // 输入框的内容被删除完时触发的方法
    'noInputFun': {
      type: Function,
      default: function () {}
    },
    // 清除输入框内容方法
    'clearInput': {
      type: Function,
      default: function () {}
    },
    // 输入框内容执行搜索方法
    'search': {
      type: Function,
      default: function () {}
    }
  },
  data () {
    return {
      inputData: '', // input框中的内容
      associationData: '', // 联想的输入内容
      focusStatus: false, // 是否聚焦input框
      showDropbox: false, // 是否显示下拉框
      preventAssociation: false, // 是否触发联想
      dropData: [], // 下拉框中的数据
      now: -1, // 当前下拉框选择第几个
      inputPinyinFlag: false // 用于屏蔽拼音输入时是按键监听
    }
  },
  mounted () {
    this.inputData = this.placeholder
  },
  directives: {
    focus: {
      update (el, {value}) {
        if (value) {
          el.focus()
        } else {
          el.blur()
        }
      }
    }
  },
  watch: {
    inputData (val, oldVal) {
      const s = this
      if (val == s.placeholder || (val === '' && oldVal === s.placeholder)) {
        return
      }
      if (s.focusStatus && !s.preventAssociation) {
        s._association()
      }
      s.preventAssociation = false
    }
  },
  methods: {
    _focusFunc (e) {
      const s = this
      s.focusStatus = true
      if (s.inputData === s.placeholder) {
        s.inputData = ''
      }
      if (s.autoFocus) {
        s.$refs.searchInput.select()
      }
      if (s.inputData !== '') {
        s._association()
      } else {
        s.noInputAssociationFun()
      }
    },
    _blurFunc () {
      const s = this
      s.focusStatus = false
      s.showDropbox = false
      if (s.inputData === '') {
        s.inputData = s.placeholder
      }
    },
    _keyupFunc (e) {
      const s = this
      if (s.inputPinyinFlag) {
      }
      if (e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 13 || e.keyCode == 9) {
      }
    },
    _association () {
      const s = this
      s.associationData = s.inputData
      if (s.inputData == '') {
        s.noInputFun()
        s.showDropbox = false
      } else {
        s.now = -1
        if (s.useJpjl) {
          if (window.external && 'createObject' in window.external) {
            // 客户端环境用filterStock
            window.API.use({
              method: 'Util.filterStock',
              data: {
                filter: s.inputData.toUpperCase(),
                count: s.selectLength,
                retmarket: true,
                markets: s.JpjlClientCodeType.join(',')
              },
              success: function (data) {
                data = data.replace(/(\w)'(\w)/g, "$1\\'$2")
                data = eval(data)
                // console.log(data)
                // data = data.replace(/(\w)'(\w)/g, "$1\\'$2").replace(/(^\(*)|(\)*$)/g, '')
                // console.log(data)
                // data = JSON.parse(data)
                if (data.length === 0) {
                  s.associationFun(s.inputData)
                  return
                }
                if (s.$props.JpjlFun.name !== '_default') {
                  s.showDropbox = false
                  s.JpjlFun(data)
                } else {
                  let jsonData = []
                  for (let i in data) {
                    jsonData.push({key: data[i].stock, val: data[i].name})
                  }
                  s.dropData = jsonData
                  if (s.focusStatus && s.dropData.length > 0) { s.showDropbox = true }
                }
              }
            })
          } else {
            // 浏览器环境用web-jpjl
            s.$http.jsonp('http://news.10jqka.com.cn/public/index_keyboard_' + encodeURIComponent(s.inputData) + '_' + s.JpjlBrowserCodeType.join(',') + '_' + s.selectLength + '_jsonp.html', {
              jsonpCallback: 'jsonp'
            }).then(function (res) {
              if (s.JpjlBrowserCodeType.length > 1) {
                let hasData = 0
                let jsonData = []
                for (let i in res.data) {
                  if (res.data[i].length > 0) {
                    hasData++
                  }
                  let dataLength = res.data[i].length
                  for (let j = 0; j < dataLength; j++) {
                    let tmp = res.data[i][j].split('||')[1].split(' ')
                    jsonData = jsonData.concat({key: tmp[0], val: tmp[0] + ' ' + tmp[1]})
                  }
                }
                if (hasData === 0) {
                  s.associationFun(s.inputData)
                  return
                }
                if (s.$props.JpjlFun.name !== '_default') {
                  s.showDropbox = false
                  s.JpjlFun(res.data)
                } else {
                  s.dropData = jsonData.slice(0, s.selectLength)
                  if (s.focusStatus && s.dropData.length > 0) { s.showDropbox = true }
                }
              } else {
                if (res.data.length === 0) {
                  s.associationFun(s.inputData)
                  return
                }
                if (s.$props.JpjlFun.name !== '_default') {
                  s.showDropbox = false
                  s.JpjlFun(res.data)
                } else {
                  let dataLength = res.data.length
                  let jsonData = []
                  for (let i = 0; i < dataLength; i++) {
                    let tmp = res.data[i].split('||')[1].split(' ')
                    jsonData = jsonData.concat({key: tmp[0], val: tmp[0] + ' ' + tmp[1]})
                  }
                  s.dropData = jsonData
                  if (s.focusStatus && s.dropData.length > 0) { s.showDropbox = true }
                }
              }
            }, function (res) { console.warn('jpjl-error') })
          }
        } else {
          s.associationFun(s.inputData)
        }
      }
    },
    _clearInput () {
      const s = this
      s.inputData = s.placeholder
      s.showDropbox = false
      s.clearInput()
    },
    _searchInput () {
      const s = this
      s.now = -1
      s.showDropbox = false
      s.focusStatus = false
      s.search(s.inputData)
    },
    _changeInput (val) {
      const s = this
      s.preventAssociation = true
      s.inputData = typeof val === 'string' ? val : val.key
      s.showDropbox = false
      s.now = -1
      s._searchInput()
    },
    _selectDown () {
      const s = this
      if (!s.showDropbox) { return }
      s.now++
      if (s.now == s.dropData.length) {
        s.now = 0
      }
      s.preventAssociation = true
      s.inputData = typeof s.dropData[s.now] === 'string' ? s.dropData[s.now] : s.dropData[s.now].key
    },
    _selectUp () {
      const s = this
      if (!s.showDropbox) { return }
      s.now--
      if (s.now == -1) {
        s.now = s.dropData.length - 1
      }
      s.preventAssociation = true
      s.inputData = typeof s.dropData[s.now] === 'string' ? s.dropData[s.now] : s.dropData[s.now].key
    },
    _hoverSelect (index) {
      this.now = index
    },
    _renderDropData (item) {
      const s = this
      let str = typeof item === 'string' ? item : item.val
      return s.heightlight(str, s.associationData)
    },
    _renderDropDataTitle (item) {
      let str = typeof item === 'string' ? item : item.val
      return str
    },
    heightlight (string, keyword) {
      const s = this
      if (!string) {
        return ''
      }
      string = '' + string
      let reg = new RegExp(keyword, 'gi')
      string = string.replace(reg, function (txt) {
        return '<span style="color: ' + s.highlightSearchColor + '">' + txt + '</span>'
      })
      return string
    },
    _compositionStart () {
      const s = this
      s.inputPinyinFlag = true
    },
    _compositionEnd () {
      const s = this
      s.inputPinyinFlag = false
    },
    focusInput () {
      const s = this
      s.autofocus = true
      s.selectFunc()
    },
    blurInput () {
      const s = this
      s.autofocus = false
    },
    setInputData (val) {
      const s = this
      s.preventAssociation = true
      s.inputData = val
    },
    getInputData () {
      const s = this
      return s.inputData
    },
    selectFunc () {
      const s = this
      s.$refs.searchInput.select()
    }
  }
}
</script>

<style scope>
.search-warp {
  border: 1px solid #ccc;
  margin: 0 auto;
  position: relative;
}
.focusWarp{
  border-color: #5491f5;
}
.search-warp input{
  border: none;
  outline: 0;
  float: left;
  background: #f7f7f7;
  width:-moz-calc(100% - 60px);
  width:-webkit-calc(100% - 60px);
  width: calc(100% - 60px);
  height: 30px;
  padding: 0 5px;
}
.search-clear {
  float: right;
  cursor: pointer;
  width: 15px;
  height: 30px;
  margin-right: 5px;
  /*background: url(http://i.thsi.cn/images/jsmodule/web/searchbox/clear.png) center center no-repeat;*/
}
.search-clear-svg {
  vertical-align: text-top;;
}
.search-btn {
  float: right;
  cursor: pointer;
  width: 25px;
  height: 30px;
  margin-right: 5px;
  /*background: url(http://i.thsi.cn/images/jsmodule/web/searchbox/search.png) center center no-repeat;*/
}
.search-btn-svg{
  vertical-align: middle;
}
.placeholder{
  color: #757575;
}
.search-dropbox{
  position: absolute;
  top: 32px;
  left: -1px;
  width: 100%;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 100;
}
.search-dropbox p{
  cursor: pointer;
  padding-left: 5px;
  text-align: left;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.search-dropbox p.hover{
  background: #ccc;
}
</style>
