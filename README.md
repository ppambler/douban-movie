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

