var Helpers = {
  isToBottom: function ($viewport, $content) {
    return $viewport.height() + $viewport.scrollTop() + 30 > $content.height()
  },

  createNode: {
    init: function () {
      this.$template = $(this.template())
      // console.log(this.$template)
    },
    template: function () {
      return `<div class="item">
        <a href="#">
            <div class="cover">
              <img src="" alt="">
            </div>
            <div class="detail">
              <h2>
                <span class="title"></span>
                <span class="extra original_title"></span>
              </h2>
              <div class="extra"><span class="score"></span><span class="xxx">分</span> / <span class="collect">xxx</span>收藏 </div>
              <div class="extra"><span class="year">2019</span>年 / <span class="type"></div>
              <div class="extra">导演：<span class="director">yyy</div>
              <div class="extra">主演：<span class="actor">aaa、bbb、ccc</span></div>
          </div>
        </a>
      </div>`
    },
    setData: function (movie) {
      var $node = this.$template
      // console.log($node[0])
      console.log(movie.images.medium)
      var img = movie.images.medium.replace(/http:|https:/, '')
      $node.find('a').attr('href', movie.alt)
      $node.find('.cover img').attr('src', img)
      $node.find('.detail h2 .title').text(movie.title)
      $node.find('.original_title').text(` / ${movie.original_title}`)
      $node.find('.score').text(movie.rating.average)
      $node.find('.collect').text(movie.collect_count)
      $node.find('.year').text(movie.year)
      $node.find('.type').text(movie.genres.join(' / '))
      $node.find('.director').text(() => {
        var directorsArr = []
        movie.directors.forEach((item) => {
          directorsArr.push(item.name)
        })
        return directorsArr.join('、')
      })
      $node.find('.actor').text(() => {
        var actorArr = []
        movie.casts.forEach((item) => {
          actorArr.push(item.name)
        })
        return actorArr.join('、')
      })
      return $node
    },
    start: function (movieItem) {
      this.init()
      var $node = this.setData(movieItem)
      return $node
    }
  }
}

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

var Top250 = {
  init: function () {
    this.$container = $('#top250')
    this.$content = this.$container.find('.container')
    this.page = 0
    this.count = 10
    this.isFinshed = false
    this.isLoading = false
    this.isOneLoading = true
    this.bind()
    this.getData((data) => {
      this.renderData(data)
      this.page++
    })
  },
  bind: function () {
    var _this = this
    console.log(_this)
    this.$container.on('scroll', function () {
      console.log(_this.isLoading)
      if (Helpers.isToBottom(_this.$container, _this.$content) && !_this.isFinshed && !_this.isLoading) {
        console.log('to bottom')
        _this.getData(function (data) {
          _this.renderData(data)
          _this.page++
          if (_this.page * _this.count > data.total) {
            _this.isFinshed = true
          }
        })
      }
    })
  },
  getData: function (callback) {
    this.isLoading = true
    if (this.isOneLoading) {
      this.$container.find('.boxLoading').show(400)
    } else {
      this.$container.find('.loading').show(400)
    }
    $.ajax({
      url: '//api.douban.com/v2/movie/top250',
      data: {
        start: this.count * this.page,
        count: this.count
      },
      dataType: 'jsonp'
    }).done((ret) => {
      this.isLoading = false
      this.isOneLoading = false
      this.$container.find('.boxLoading').hide(400)
      this.$container.find('.loading').hide(400)
      callback(ret)
    })
  },
  renderData(data) {
    // console.log(data)
    data.subjects.forEach((item) => {
      var $node = Helpers.createNode.start(item)
      // console.log('一个node碎片')
      // console.log($node[0])
      this.$content.append($node)
    })
  }
}

var UsBoard = {
  init: function () {
    var _this = this
    this.$container = $('#beimei')
    this.$content = this.$container.find('.container')
    this.getData(function (data) {
      _this.renderData(data)
    })
  },
  getData: function (callback) {
    $.ajax({
      url: '//api.douban.com/v2/movie/us_box',
      data: {
        start: 0,
        count: 10
      },
      dataType: 'jsonp'
    }).done(function (ret) {
      callback(ret)
    })
  },
  renderData(data) {
    var _this = this
    console.log(data)
    data.subjects.forEach(function (item) {
      var $node = Helpers.createNode.start(item.subject)
      _this.$content.append($node)
    })
  }
}

var Search = {
  init: function () {
    this.page = 0
    this.count = 10
    this.isFinshed = false
    this.isLoading = false
    this.$container = $('#search')
    this.$content = this.$container.find('.container')
    this.bind()
  },
  bind: function () {
    var _this = this
    this.$container.find('.search-area .button').on('click', function () {
      console.log('click ')
      console.log(this.$content)
      if (_this.$content.length > 0) {
        _this.$content.empty()
      }
      _this.getData(function (data) {
        console.log(data)
        _this.renderData(data)
      })
    })
    console.log(this.$container.find('.search-area input'))
    this.$container.find('.search-area input').on('keyup', function (e) {
      if (e.key === 'Enter' || e.keyCode === 13) {
        if (_this.$content.length > 0) {
          _this.$content.empty()
          _this.page = 0
          console.log(_this.page)
        }
        _this.getData(function (data) {
          _this.renderData(data)
          _this.page++
        })
      }
    })
    this.$container.on('scroll', function () {
      console.log(_this.isLoading)
      if (Helpers.isToBottom(_this.$container, _this.$container.find('.wrap')) && !_this.isFinshed && !_this.isLoading) {
        console.log('to bottom')
        _this.getData(function (data) {
          _this.renderData(data)
          _this.page++
          if (_this.page * _this.count > data.total) {
            _this.isFinshed = true
          }
        })
      }
    })
  },
  getData: function (callback) {
    this.$container.find('.loading').show()
    var _this = this
    var keyword = this.$container.find('.search-area input').val()
    this.isLoading = true
    $.ajax({
      url: '//api.douban.com/v2/movie/search',
      data: {
        q: keyword,
        start: this.count * this.page,
        count: this.count
      },
      dataType: 'jsonp'
    }).done(function (ret) {
      _this.$container.find('.loading').hide()
      _this.isLoading = false
      callback(ret)
    })
  },
  renderData(data) {
    var _this = this
    // debugger
    if (data.total === 0) {
      var result = '<div class="notfound">没找着，那就重新输入吧……</div>'
      _this.$content.append(result).show()
    }
    data.subjects.forEach(function (item) {
      var $node = Helpers.createNode.start(item)
      _this.$content.append($node)
    })
  }
}
var App = {
  init: function () {
    Paging.init()
    Top250.init()
    UsBoard.init()
    Search.init()
  }
}

App.init()