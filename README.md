---
typora-copy-images-to: img\00
---

# douban-movie

## ★plan

> 以JavaScript为划分，目的只是想换个姿势写写，仅此而已……

- [ ] jQuery版
- [ ] 模块化版
- [ ] 原生JavaScript版
- [ ] Vue版
- [ ] React版

## ★资料

**➹：**[nanyang24/douban-movie: ☘移动端-豆瓣电影推荐入口 / A doubanAPI movies entrance](https://github.com/nanyang24/douban-movie)

**➹：**[豆瓣电影](http://book.jirengu.com/jirengu-inc/js-works/projects/doubanmovie/index.html)

## ★效果



## ★涉及技术

### ◇jQuery版

1. HTML5、CSS3、JavaScript
2. jQuery
3. MVC思想
4. 懒加载

## ★简述

这是一个简单的单页应用，通过豆瓣提供的豆瓣电影API，让我做出了以下简单但实用的功能：

1. 展示豆瓣评分top250的电影
2. 展示目前北美电影排行榜
3. 电影搜索

## ★总结

## ★Q&A

### ①移动端调试？

使用了browser-sync这个工具，在使用这个工具的过程中遇到一个bug，就是手机的预览地址有问题，于是我就这样做了：

![1551677822299](img/00/1551677822299.png)

难道是在windows下的bug？或者说是为啥得到的是一个 `172.10.……`的ip？而不是 `192.168.……`？当然，这个172的在pc端也是能访问的，只是我的手机无法访问……

接着我就打算调试移动端的log，然而Browsersync UI界面没有Remote Debugger(weinre)的开关，就像这样：

![1551679375074](img/00/1551679375074.png)

为此，我看了这个issue：<https://github.com/BrowserSync/browser-sync/issues/1413>

说是已经弃用什么的……因为weinre已经过时了，那么既然如此，那我该用啥？难道安装旧版本吗？

就像这样：

```bash
 npm i -g browser-sync@2.0.0
```

回顾我的需求「我只想看看移动端的Console，也就是移动端的调试」

所以有了这样的问题：

**➹：**[怎么在移动端调试web前端? - 知乎](https://www.zhihu.com/question/24250869)

就这样，找到了一个开源的调试工具——[Eruda](https://github.com/liriliri/eruda/blob/master/doc/README_CN.md)（一个专为手机网页前端设计的调试面板）

它的简单使用：

1. 对当前项目`npm init`一下，然后一直回车即可

2. 局部安装这个工具： `npm install eruda --save`，不过我觉得这个应该是开发时依赖吧！

3. 在页面中加载脚本：

   ```html
   <script src="node_modules/eruda/eruda.min.js"></script>
   <script>eruda.init();</script>
   ```

还有一个调试工具：

**➹：**[wuchangming/spy-debugger: 微信调试，各种WebView样式调试、手机浏览器的页面真机调试。便捷的远程调试手机页面、抓包工具，支持：HTTP/HTTPS，无需USB连接设备。](https://github.com/wuchangming/spy-debugger)

### ②回顾页面书写套路

1. 先css reset
2. 通用样式，比如 .layout, .clearfix等
3. 通用组件，如 .btn, .footer等
4. 页面样式
   - body设置默认字体大小、字体、行高、字体颜色、背景色等
5. 先分大块，再分小块，再细节
6. 使用语义化标签，class能省则省
7. 书写html时忽略除内容外的一些附属细节，完善附属细节时尽量考虑用伪元素代替，标签能省则省

### ③vw、vh、calc()、百分比？

在了解它们表示什么意思之前，先来看看viewport的意思：

![1551695084275](img/00/1551695084275.png)

所以说，viewport就是视口、浏览器窗口的可视区域的意思，注意就包括滚动条的宽度，而且我们可以通过以下代码获取视口大小：

```js
window.innerWidth
window.innerHeight
```

了解了这个概念，vw和vh就很好理解了

1. vw Viewport宽度：1vw 等于viewport宽度的1%
2.  vh Viewport高度：1vh 等于viewport高的的1%

 可见，它们俩是会随着视口大小的变化而变化的，如视口的宽此时是500px，那么如果有用到10vw为宽度的盒子，那么盒子的实际宽度就是50px啦！如果视口的宽缩水了一半，即250px的话，那么该盒子也会缩水一半，即25px！

总之你就这样看1vw就好了：

```
//假设此时的视口宽度为500px，那么：
1vw = 1*500px*1% = 5px
//你也可以认为1vw就是1%vw，10vw就是10%vw,100vw就是100%vw，即500px
```

关于`calc()`，calculate(计算)的缩写，可以理解为一个函数，是css3的一个新增的功能，用来指定元素的长度。如：可以使用calc()给元素的border、margin、pading、font-size和width等属性设置动态值。总之`calc()` 能让你给元素的做计算，当然这计算任务是浏览器来做的，而不是你去计算……

那么它的语法是怎样的呢？

```
使用“+”、“-”、“*” 和 “/”四则运算；
可以使用百分比、px、em、rem等单位；
可以混合使用各种单位进行计算；
表达式中有“+”和“-”时，其前后必须要有空格，如"widht: calc(12%+5em)"这种没有空格的写法是错误的；
表达式中有“*”和“/”时，其前后可以没有空格，但建议留有空格。
```

例子：设置div元素的高度为当前窗口高度-100px

```css
div{
	height: calc(100vh - 100px);     
}
```

关于百分比单位：

我们知道有些单位是相对父级的，又或者是自身的，又或者是视口的等等

那么关于`height:100%`是相对于谁呢？——相对于父级高度！

如果我对html元素搞了这样一条声明：

```css
html {
  height: 100%;
}
```

那么它的父元素是谁呢？也就是说html的高度为100%的作用是什么？

就是为了让body的高度100%有参考高度，不然div的百分比高度也会无效。可即便如此还是无法真正解释这样做的缘由。

既然如此，那就先来看看宽度：

宽度是默认就有的，即我们不设置宽，浏览器会自动将页面内容平铺填满整个横向宽度。所以我们不需要显示声明宽度。

有了对宽度的认识，我们再来看看高度：

> 事实上，浏览器根本就不计算内容的高度，除非内容超出了视窗范围(导致滚动条出现)。或者你给整个页面设置一个绝对高度。否则，浏览器就会简单的让内容往下堆砌，页面的高度根本就无需考虑。因为页面并没有缺省的高度值，所以，当你让一个元素的高度设定为百分比高度时，无法根据获取父元素的高度，也就无法计算自己的高度。
>
> 即父元素的高度只是一个缺省值：height: auto;我们设置height：100%时，是要求浏览器根据这样一个缺省值来计算百分比高度时，只能得到undefined的结果。也就是一个null值，浏览器不会对这个值有任何的反应。

注意：各个浏览器对于宽高的解析也不相同，大家可以自己搜索一下。如 <http://www.webhek.com/post/css-100-percent-height.html>

还有一个细节就是：

<https://jsbin.com/rekabumeze/edit?html,css,output>

```html
<style> 
.fa {
  width: 500px;
  height: 100px;
  border: 2px solid red;
}

.son {
  border: 2px solid green;
  width: 10%;
  height: 10%;
  padding-top: 10%;
}
</style>
<body>
 <div class="fa">
   <div class="son"></div>
 </div>
</body>
```

padding-top相对的是父元素的宽，而不是高……也就是说：

相对于父级宽度的：

> `max-width`、`min-width`、`width`、`left`、`right`、`text-indent`、`padding`、`margin`、`grid-template-columns`、`grid-auto-columns`、`column-gap` 等；

相对于父级高度的：

> `max-height`、`min-height`、`height`、`top`、`bottom`、`grid-template-rows`、`grid-auto-rows`、`row-gap` 等；

相对于自身字号的：

> `line-height` 等；

相对于行高的：

> `vertical-align` 等；

**➹：**[什么是viewport，为啥需要viewport - 移动开发](http://www.myexception.cn/mobile/428756.html)

**➹：**[JS获取浏览器可视区域尺寸-大前端](http://www.daqianduan.com/3784.html)

**➹：**[使用calc()设置内容高度 - 简书](https://www.jianshu.com/p/56051210c9e4)

**➹：**[CSS3的calc()使用_calc, css3属性详解 教程_w3cplus](https://www.w3cplus.com/css3/how-to-use-css3-calc-function.html)

**➹：**[CSS五种方式实现Footer置底 - 每天学点前端开发 - SegmentFault 思否](https://segmentfault.com/a/1190000008516654)

**➹：**[★css样式的百分比都相对于谁？ - 知乎](https://www.zhihu.com/question/36079531)

**➹：**[html,body高度100%的作用-云栖社区-阿里云](https://yq.aliyun.com/articles/559106)

**➹：**[详述css中的百分比值 - 庭院茶 - SegmentFault 思否](https://segmentfault.com/a/1190000000590998)

