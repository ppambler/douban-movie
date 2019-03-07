var Paging = {
  init: function () {
    this.$tabs = $('footer>div')
    this.$pages = $('main>section')
    this.bind()
  },
  bind: function () {
    var _this = this
    this.$tabs.click(function () {
      var $this = $(this)
      var index = $this.index()
      $this.addClass('active').siblings().removeClass('active')
      _this.$pages.eq(index).fadeIn().siblings().fadeOut()
    })
  }
}


var App = {
  init: function () {
    Paging.init()
  }
}

App.init()