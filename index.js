/**
 * 独自スコープを定義するプラグイン
 */
function plugin (Vue) {
  /**
   * _init をオーバーライドして、独自スコープを Vue インスタンス毎に初期化
   */
  var init = Vue.prototype._init
  Vue.prototype._init = function (options) {
    this._my = {} // 独自スコープのデータを初期化
    Vue.util.defineReactive(this, '$my', this._my) // 独自スコープ '$my' を定義

    init.call(this, options)
  }

  /**
   * 独自スコープに kye と value でプロパティを追加
   */
  Vue.prototype.$addProp = function (key, value) {
    Vue.set(this._my, key, value)
  }

  /**
   * 指定された key のプロパティを独自スコープから削除
   */
  Vue.prototype.$delProp = function (key) {
    Vue.delete(this._my, key)
  }
}


/**
 * プラグインをインストール
 */
Vue.use(plugin)


/**
 * Vue インスタンスを生成して #app にマウント
 */
new Vue({
  data: {
    key: '',
    value: '',
    target: ''
  },
  methods: {
    onClickAdd: function () {
      this.$addProp(this.key, this.value)
    },
    onClickDel: function () {
      this.$delProp(this.target)
    }
  }
}).$mount('#app')
