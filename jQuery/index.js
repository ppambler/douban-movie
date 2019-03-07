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
    fillData: function (selector, textData, srcData) {
      if (arguments[1] !== '') {
        this.$template.find(selector).text(textData)
      } else {
        // console.log(this.$template)
        this.$template.find(selector).attr('src', srcData)
      }
    },
    setData: function (movie) {
      var $node = this.$template
      // console.log($node[0])
      this.fillData('.cover img', '', movie.images.small)
      this.fillData('.detail h2 .title', movie.title)
      this.fillData('.original_title', ` / ${movie.original_title}`)
      this.fillData('.score', movie.rating.average)
      this.fillData('.collect', movie.collect_count)
      this.fillData('.year', movie.year)
      this.fillData('.type', movie.genres.join(' / '))
      this.fillData('.director', () => {
        var directorsArr = []
        movie.directors.forEach((item) => {
          directorsArr.push(item.name)
        })
        return directorsArr.join('、')
      })
      this.fillData('.actor', () => {
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
      url: 'http://api.douban.com/v2/movie/top250',
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
var App = {
  init: function () {
    Paging.init()
    Top250.init()
  }
}

App.init()