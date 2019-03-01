![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/logo-title.png)
# 深度映像工作室官网首页
链接：[https://zamhown.github.io/divs-homepage](https://zamhown.github.io/divs-homepage)  

这个项目是我在2017年的本科毕业设计的一部分，当时是给学院里的媒体工作室做了个官网，还包括一个 ASP.NET MVC 实现的作品管理系统和交流社区。  

> 深度映像工作室是我们学校的一个学生组织，主要业务是拍视频、视频后期处理和平面设计，以实践教学为宗旨（并以揽私活维持生计），所以官网的首页部分需要做得炫酷一点。想当年为了答辩租了两个月服务器，一月120，还是有点小贵的。毕业以后由于没人续费，这个官网和整个作品社区就凉了……这次我把首页部分单拎了出来，用webpack优化了一遍传到了GitHub Pages。虽然是静态的，但终于有一个永久免费的服务器了。  

这次趁热把以前的东西总结了一下，不然又会像这次一样一上手什么都忘了。先列举下该页面主要用到的技术：  

- 响应式设计与浏览器兼容
- 视频播放的控制（懒加载、loading进度条等）
- 将AE动画转化为svg动画在网页上播放
- canvas动画
- 自定义字体、拆分字体文件
- 引入单文件方式使用Vue
- 用Webpack进行打包、图片压缩等
- 模块按需进行懒加载

总结的点比较多，也比较细碎杂乱，大家可以通过目录，各取所需。  

## 目录
**第一部分 响应式设计与浏览器兼容**  
[一、概览](#一概览)  
[二、响应式设计](#二响应式设计)  
[三、浏览器兼容](#三浏览器兼容)  

**第二部分 效果实现与优化**    
[四、视频部分](#四视频部分)  
&nbsp;&nbsp;&nbsp;&nbsp;[4.1&nbsp;&nbsp;视频的动态加载](#41视频的动态加载)  
&nbsp;&nbsp;&nbsp;&nbsp;[4.2&nbsp;&nbsp;视频的加载进度条](#42视频的加载进度条)  
[五、Lottie动画部分](#五Lottie动画部分)  
[六、Canvas动画部分](#六Canvas动画部分)  
[七、自定义字体与拆分字体](#七自定义字体与拆分字体)  
[八、其他效果与彩蛋](#八其他效果与彩蛋)  

**第三部分 Webpack配置、打包与懒加载**  
[九、Webpack与各loader配置](#九Webpack与各loader配置)  
&nbsp;&nbsp;&nbsp;&nbsp;[9.1&nbsp;&nbsp;打包js文件](#91打包js文件)  
&nbsp;&nbsp;&nbsp;&nbsp;[9.2&nbsp;&nbsp;将ES6以上的语法转译为ES5](#92将ES6以上的语法转译为ES5)  
&nbsp;&nbsp;&nbsp;&nbsp;[9.3&nbsp;&nbsp;打包HTML文件（一）](#93打包HTML文件一)  
&nbsp;&nbsp;&nbsp;&nbsp;[9.4&nbsp;&nbsp;打包CSS文件](#94打包CSS文件)  
&nbsp;&nbsp;&nbsp;&nbsp;[9.5&nbsp;&nbsp;优化JS和CSS文件](#95优化JS和CSS文件)  
&nbsp;&nbsp;&nbsp;&nbsp;[9.6&nbsp;&nbsp;打包图片和其他资源文件](#96打包图片和其他资源文件)  
&nbsp;&nbsp;&nbsp;&nbsp;[9.7&nbsp;&nbsp;打包HTML文件（二）](#97打包HTML文件二)  
&nbsp;&nbsp;&nbsp;&nbsp;[9.8&nbsp;&nbsp;其他配置](#98其他配置)  
[十、开发环境配置与拆分](#十开发环境配置与拆分)  
&nbsp;&nbsp;&nbsp;&nbsp;[10.1&nbsp;&nbsp;配置拆分](#101配置拆分)  
&nbsp;&nbsp;&nbsp;&nbsp;[10.2&nbsp;&nbsp;开发服务器配置](#102开发服务器配置)  
&nbsp;&nbsp;&nbsp;&nbsp;[10.3&nbsp;&nbsp;模块热替换配置](#103模块热替换配置)  
[十一、模块懒加载](#十一模块懒加载)  
[十二、其他减少请求数和压缩资源大小的方法](#十二其他减少请求数和压缩资源大小的方法)  

## 一、概览

我们先整体地看一下成品页面。首先，在PC端第一屏是一个全景视频做背景（工作室作品《It's Time》的节选），Logo和主菜单放在上方左右侧。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/1.gif)  

向下拉进入第二屏时，全景视频逐渐变暗，Logo和主菜单部分变黑并形成一个Header。第二屏是“作品”部分，最左边的作品通过svg动画（lottie-web库）自动预览，右上方的作品当鼠标移入就使用视频模式预览。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/2.gif)  

下面是“关于我们”部分，有一段中规中矩的文字展示，鼠标移入合影会触发css强调动画。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/3.gif)  

再下面是“团队”，有六位成员的照片和简介。如果鼠标不移入这一部分，成员简介将随机展示；如果鼠标移入其中一张照片，则展示对应成员的简介，并停止随机展示。展示简介时，成员照片呈现毛玻璃和下陷效果。画面左边斜线填充的矩形会随着滚动条进行相对微动。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/4.gif)  

最后是“联系”部分。背景仍为第一屏的视频，但是叠加了一层铁丝网一样的效果，画面也更加黯淡。前景左部是Logo和联系方式，右部是简易留言板。鼠标移到“向我们留言”按钮时会有一个hover效果。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/5.gif)  


## 二、响应式设计

众所周知，只用考虑PC端，并且只考虑Chrome浏览器的前端项目是幸福的。然而幸福往往非常珍贵，因为我们往往要考虑所有主流环境，特别是做一个有宣传作用的官网。如今随着各种智能设备的发展，面对如此千差万别的屏幕分辨率，为每种设备专门做一套网页的做法早已不符合时代的需要。这时，催生了**响应式网页设计**（Responsive Web Design）的概念。  

响应式网页设计的理念是：Web页面应当根据用户的行为以及设备环境（系统平台、屏幕尺寸、屏幕定向等）进行对应的调整。换句话说，页面应该有能力去自动响应用户的设备环境。

在技术上，响应式网页设计通常采用css媒体查询、JavaScript的屏幕分辨率监测、css的流动布局及百分比布局、弹性图片、以及css3新增的[弹性盒子布局（Flexible Box Layout）](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)和[网格布局（Grid Layout）](https://css-tricks.com/snippets/css/complete-guide-grid/)来实现。目前也有许多前端框架和组件库可以做到这一点，从最老派的Bootstrap到最新潮的Ant Design都有响应式支持。  

在效果上，我希望当用户在PC上慢慢调整浏览器宽度时，页面可以流畅地改变布局。以“关于我们”为例，有针对PC宽屏、PC普通屏、平板、手机四种宽度下的四种布局：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/6.gif)  
*缩窗口大法，事实上我经常这样盘网页*  

为了能在浏览器宽度改变时让网页版式进行平滑的变化，除了媒体查询以外，可以试试css3的[transition属性](http://www.w3school.com.cn/css3/css3_transition.asp)，它能自动给元素的样式改变加上过渡动画，非常傻瓜式的操作。还记得第一次接触transition的时候简直改变了我对css的看法。  

一般情况下，当你在PC端把任意宽度的版式做好，那么平板和移动端已经完成一半了。我们之后只需要针对不同平台进行优化就好。但是很明显，移动端和PC端差异极大，体现在分辨率和交互方式（鼠标或触摸）上，因此不得不处理一些繁琐的细节。  

为了在js里判断用户设备类型，我使用了[device.js](https://github.com/matthewhudson/current-device)库。它可以用来检测设备的操作系统（比如 iOS，安卓，黑莓，Windows，Firefox OX），方向（横屏或者竖屏），类型（平板或者移动设备），在`<html>`上自动添加相应的class，并提供了一些js函数用来判断设备。  

这个页面对移动端的优化大体如下：  

### 1.  最基础的viewport
```html
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
```

这已经是常识了，**视区**（Viewport）涉及到物理像素和逻辑像素的转换问题，以前面试时曾被问到过具体每个设置项的含义。可参考：[响应式 Web 设计 - Viewport](http://www.runoob.com/css/css-rwd-viewport.html)  

### 2.  移除所有背景视频，改用canvas动画
两年前开发这个页面的时候，移动端对背景视频的支持还很不友好，体验也不统一。有的浏览器对视频优化过度，用户一点击视频就会自动弹出小窗播放，控制栏也去不掉。除此之外，用户的流量也需要考虑，出于道义不能假设用户用手机查看网页时总是希望加载背景视频的。因此这个页面在移动端不加载也不显示视频，第一屏用canvas动画代替：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/7.gif)  

这是一个聚光灯效果叠加在背景图片上，弥补了去掉视频后第一屏的动感的不足。这个动画的实现将在[第六节](#六Canvas动画部分)简要介绍。  

### 3.  页面由横宽到竖长带来的版式调整
PC端屏幕横宽，信息量大；移动端屏幕竖长，信息量小。如果不考虑分辨率大小，长短边的互换也会为版式调整提出很复杂的要求。下面举两个版式调整的例子。  

首先是PC端展开的主菜单在移动端收进汉堡按钮，这个设计也是老生常谈了，就连苹果官网也不能免俗。这个页面里的Header主要有PC、平板、手机三种模式。除了点击事件的捕获，所有效果都可以通过css实现。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/8.gif)  

第二个是之前提过的Flex Box的应用。“作品”部分的展示框架使用了Flex Box，由于是两年前的实现，现在看来使用Grid Layout要更合适。4:2:1:1的布局可以很方便适配手机端。  
![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/zp-1.png)  
*PC和平板布局*  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/zp-2.png)  
*手机端布局*  

后面“团队”部分的设计思路和“作品”很像。6个正方形，PC端2行3列，平板端3行2列，手机端6行1列，就不再赘述了。  

### 4.  网页页脚部分的改变
页脚部分除了版式的改变以外，还有两个小细节。第一是微信公众号二维码的展现，在PC端鼠标移到微信图标上就会冒出一个带二维码的气泡：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/qrc-1.png)  

但移动端明显不太适合这样做。我的处理方式是弹出一个模态框解决。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/qrc-2.png)  

如果是在微信里打开这个网页，由于可以长按图片进行二维码识别，模态框的引导语就变成了这样：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/qrc-3.png)  

第二处是QQ。在PC端网页上，点击QQ图标后会自动调起QQ以供进行临时会话，超链接是这样的：  
```
tencent://message/?uin=<你的客服QQ号>&Site=<你的域名>&Menu=yes
```

但在手机端，唤起手机QQ的超链接是不一样的：  
```
mqqwpa://im/chat?chat_type=wpa&uin=<你的客服QQ号>&version=1&src_type=web&web_src=<你的域名>
```

而在微信里则会把这个链接屏蔽，对应的处理是弹出一条提示：

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/qq.png)  

## 三、浏览器兼容
浏览器兼容也算是一种广义的响应式设计。不同浏览器内核对h5、css3和js特性的支持各有差别，开发阶段需要不断地测试。目前这个页面在Chrome、Firefox、Safari、Edge、IE11和微信内置的魔改版X5内核上都没什么问题（如果在微信打开，需要点击“访问原网页”）。  

为了更方便地兼容多种浏览器，这个页面用到了两个库。一个是[prefix free](http://leaverou.github.io/prefixfree/)，可以让你在写css属性时不用加浏览器前缀（如-webkit-），这个库会自动补上。另一个是[modernizr](https://modernizr.com/)，可以让你在js里判断某个特性在当前的浏览器下是否支持，同时也像[device.js](https://github.com/matthewhudson/current-device)一样把可用的特性作为class放在`<html>`标签上。  

本页面针对不同浏览器所做的优化如下：  

### 1.  iOS版Safari滑动不顺畅问题的解决
```css
-webkit-overflow-scrolling: touch;
```

这是一个常见的问题，将如上的css属性加在所有带滚动条的元素上就可以避免。  

### 2.  移动版Chrome的地址栏颜色
```html
<meta name="theme-color" content="#000000">
```

可能很多人发现用移动版Chrome进入B站以后，地址栏永远是粉色的。这个`<meta>`的作用就是如此：自定义Chrome地址栏的颜色。这里我设成了黑色，有助于获得更有整体性的视觉体验。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/chrome.png)  


### 3.  Safari的网页图标定义
```html
<link rel="apple-touch-icon" href="<大小为256*256的png图标地址>" />
```

这是iOS设备私有属性，添加这个标签后，在Safari上使用“添加到主屏”按钮将网站添加到主屏幕时采用设定好的图标。这个在我专栏之前的文章中也有提到：[APP图标设计小技巧：在iOS上快速获得APP图标的真实预览图](https://zhuanlan.zhihu.com/p/28482598)。  

效果如下（图标在右下角）：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/pad-1.png)  

而且图标也会出现在Safari的个人收藏中，如果网站被添加到个人收藏的话。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/pad-2.png)  

### 4.  Safari主屏幕入口优化
```html
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
```

第一个`<meta>`标签表示用户从主屏幕快捷方式（上文设定的那个）打开网页后默认全屏显示，第二个`<meta>`标签和Chrome那个作用相近，全屏显示时上方状态栏设定为黑色。效果如下：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/full-screen.png)  
*全屏显示网页效果拔群*  

### 5.  IE11和Edge上的处理
E11和Edge其实已经很好了，基本上兼容所有主流特性，有时还会有惊喜。但是这个页面用到的svg动画（通过lottie-web库播放，在[第五节](#五Lottie动画部分)  会介绍）在两年前不被支持，这可能是lottie-web库的局限。所以只能“优雅降级”，用视频来代替动画。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/9.gif)  

## 四、视频部分
### 4.1&nbsp;&nbsp;视频的动态加载
一般情况下，如果要定义一个自动播放的页面背景视频，标签定义大致上是这样的：  
```html
<video id="bg-video" src="../../assets/video/banner.mp4" 
       poster="../../assets/img/bg-video-poster.jpg"
       autoplay loop muted preload="auto">
</video>
```

属性就不细说了，目前的设置会在页面加载后即载入整个视频，并自动播放、无限循环且静音，这个设置在PC端是没问题的。但是在[第二节](#二响应式设计)响应式设计中说到，移动端的页面放弃了所有背景视频，所以我们就有了动态加载视频的需求。为了阻止页面在移动端自动请求这个视频，有两种方案：  

- `<video>`标签不写在html里，而是通过js在判断设备后动态添加标签至DOM；
- `<video>`标签写在html里，通过js在判断设备后调用视频对象的`load()`方法加载。

出于html和js尽量分离的考虑，我采用了第二种方法，因此在html里就要把`autoplay`属性去掉，并把`preload="auto"`改为`preload="none"`。这样即使页面里保留了这个标签，加载时也不会出现对这条视频资源的请求。在js里判断如果当前设备不是手机且支持播放视频，才开始加载：  
```js
if (Modernizr.video() && !device.mobile()) {
    window.addEventListener('load', function () {
        const bg_video = document.getElementById('bg-video');
        bg_video.muted = true;
        bg_video.addEventListener('canplay', () => bg_video.play());
        bg_video.load();
    }, false);
}
```

第一行涉及到上文讲过的[modernizr](https://modernizr.com/)和[device.js](https://github.com/matthewhudson/current-device)的使用，而下面的代码由如下两个经验点：  

（1）在页面加载完的事件里，先把视频对象静音（`bg_video.muted=true`），再调用`load()`方法手动加载。为什么这样做呢？事实上Chrome的自动播放政策（Autoplay Policy）在2018年4月做了更改，浏览器为了提高用户体验，减少数据消耗，只有`muted`的`autoplay`始终被允许。可我们明明把`autoplay`属性去掉了，按理说不适用这个规则啊？其实不是这样，通过js实现的“自动播放”也属于`autoplay`的范围内。经我测试只在标签上加`muted`还不够（有时会卡住不播放），所以在播放视频之前手动将视频对象的`muted`置`true`，这样才能成功播放。  

（2）视频在调用`load()`之后为了确保能够及时自动播放，`canplay`事件一被触发就需要调用`play()`方法。`canplay`事件的含义是该视频虽然可能还没加载完成，但已经可以播放了。  

经过如上的优化，非移动端下的视频已经保证能在任何情况下自动加载并播放。  

### 4.2&nbsp;&nbsp;视频的加载进度条
为了提醒用户等待背景视频又不至于打扰到用户，我模仿了很多国外网站的做法把loading进度条放到了页面顶端，并加了阴影突出层次感。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/10.gif)  

这涉及到响应`<video>`标签的`onloadedmetadata`和`onprogress`事件。前者在成功获取视频元数据（包括视频时长等）时触发，后者在已加载视频数据的长度发生更新时触发。通过第一个事件取到视频总长度，通过第二个事件取到视频已加载的长度即可。我是用Vue来绑定事件的，代码片段如下：
```js
// 上下文是Vue实例
bgVideoInit: function (e) {  // 绑定onloadedmetadata事件
    this.bg_video_duration = e.target.duration;
},
bgVideoLoadProgress: function (e) {  // 绑定onprogress事件
    var bg_video = e.target;
    if (this.bg_video_duration > 0) {
        var buffered = 0;
        for(var i = 0; i < bg_video.buffered.length; i++) {
            buffered += (bg_video.buffered.end(i) - bg_video.buffered.start(i));
        }
        if (buffered) {
            var progress = Math.floor(buffered / this.bg_video_duration * 100);
            if (progress>this.bg_video_progress) {
                this.bg_video_progress = progress;
            }
            if (this.bg_video_progress === 100) {
                $('#bg-video-progress').fadeOut();
            }
        }
    }
},
```

需要注意的是，`<video>`加载视频时，为了能取到正确的已加载长度，我将每个buffer已加载的长度加起来作为结果。  

除了背景视频，“作品”部分的预览视频其实也有loading进度条，原理相似，这里就不赘述了。  

## 五、Lottie动画部分

页面中“作品”部分最显眼的就是一个SVG形式的动画，作为一个MG动画视频的预览，看上去比原视频还要清晰而锐利：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/11.gif)  

这其实是借助[Lottie-web](https://github.com/airbnb/lottie-web)库实现的。Lottie是Airbnb推出的动效神器，简单来说就是可以把AE（Adobe After Effects）做出来的动画转化成json文件，并可以在网页端或移动端直接播放！有了AE这一业界顶尖的2D动画工具之一加持，动效什么的真的不是问题了。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/lottie-example.gif)  
*官方的使用范例*  

关于Lottie，我之前写了一篇详尽的文章介绍它的使用，也是这个专栏的第一篇文章。现在已经将近两年过去了，这个库也由Bodymovin改名为lottie-web。我已经将原文章对应更改过，可以用来参考：[大杀器Bodymovin和Lottie：把AE动画转换成HTML5/Android/iOS原生动画](https://zhuanlan.zhihu.com/p/26304609)。  

两年前在这个页面的开发过程中，我发现Bodymovin还是有很多局限，比如不支持AE里合成的倒放，json生成不出来，不知道现在修复了没有。当时我用了个trick，把“GOPRO”出现和消失的动画各生成一个json（其实消失的原始动画倒过来的，也是一种“出现”效果），在js里进行控制，实现无限循环交替播放：  
```js
// GOPRO字体动画，两段动画交替播放
var an1 = lottie.loadAnimation({
    animationData: go1,
    loop: false, autoplay: false,
    renderer: 'svg',
    container: $container1[0]
});
var an2 = lottie.loadAnimation({
    animationData: go2,
    loop: true, autoplay: false,
    renderer: 'svg',
    container: $container2[0]
});
var isAn2Stop = true;
$container2.hide();
an1.onComplete = function() {
    an1.stop();
    $container2.show();
    $container1.hide();
    isAn2Stop = false;
    an2.play();
};
an2.onEnterFrame = function (e) {
    // 由于an2是倒放，判断是不是到第0帧
    if (e.currentTime < 1 && !isAn2Stop) {
        isAn2Stop = true;
        an2.stop();
        $container1.show();
        $container2.hide();
        an1.play();
    }
};
an2.setDirection(-1);  // an2倒放
an1.play();
```

在渲染方式上采用了SVG，因为经过试验，我发现这是最适合这种动画的方式了。  

## 六、Canvas动画部分

[第二节](#二响应式设计)提到过，为了在移动端去掉视频之后保持第一屏的动感，我使用了canvas动画。效果是这样：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/7.gif)  

这里借助了一个canvas动画库实现：[Scrawl-canvas](https://github.com/KaliedaRik/Scrawl-canvas)。但事实上我不是很推荐这个库，第一用的人比较少，第二比较老旧（在npm上找不着），但真的很好上手，自成体系，你能想到的二维动画功能都有涵盖。如果实在找不到什么东西用就可以用这个。  

[Scrawl-canvas的官网](http://scrawl.rikweb.org.uk/)上有很多范例，文档也还算齐全。千万别被它官网的设计风格吓到，人家是故意复古的……  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/scrawl.png)  

这个聚光灯动画并不直接包括在官方Demo里，只能找到探照灯效果（只有鼠标附近发出圆形的光，其他地方都是暗的）：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/12.gif)  

这个时候就需要一点想象力了：探照灯效果只是一个径向渐变的半透明图层叠加在图片上，这个图层和鼠标一起移动；那么聚光灯不就是**两个线性渐变和一个径向渐变的叠加**么？  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/14.gif)  
*正式开发之前做的Demo*  

于是，把实现聚光灯需要的图层理清楚后，再加上每个图层的动画，这个动效就完成了。具体源码有点长就不放这里了，如果对这个库的使用感兴趣，虽然可以参考我源码里的`src/scrawl_canvas_animate.js`文件，但是还是推荐去看官方文档。为了尽可能地压缩Scrawl-canvas库的大小，我在引用的时候改过它的部分代码。  

## 七、自定义字体与拆分字体
这个页面里几乎所有有字的地方都使用了不同粗细的思源黑体而不是系统自带字体。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/font-1.png)  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/font-2.png)  

但是如果把这些思源黑体文件全部打包到网页资源中，这个大小是不能忍受的。这也可能是大多数网页不常用自定义字体的原因之一。这个时候一个很自然的想法就出现了：一个汉语字体文件里面有几万个汉字的字形信息，但网页上可能只用到其中十几个字，我能不能只把这十几个字拆分出来做一个字体文件呢？实际上确实可以大幅压缩字体文件大小。  

阿里巴巴有一个在线工具就是做这个事情的：[Iconfont-webfont平台](https://www.iconfont.cn/webfont#!/webfont/index)。

比如你的网页上会用到思源黑体极细，你只需要把用到这个字体的字全部收集起来，去一下重，粘贴到这个网页里，它会自动生成对应的拆分字体，甚至会告诉你怎么在css中引用。  

在开发中，我的经验是把每个自定义字体涉及的字做一个本地备份（如我源码里的`assets/fonts/font.txt`），这样的话就算后来修改了网页上的文案，更新字体文件时也不用去重新统计网页上的字，直接对备份进行增删就可以了。  

拆分字体的方案也有局限性：对于接受用户输入的`<input>`来说，拆分字体是没法拆的，你无法预测用户会输入什么，除非限定数字或英文字母。这个时候，就把系统可能自带的较为现代的字体往css上堆就行了，可以作为一项保底样式。
```css
* {
    font-family: PingFang SC,Helvetica Neue,Helvetica,Hiragino Sans GB,STHeitiSC-Light,Microsoft YaHei,Arial,sans-serif;
}
```

## 八、其他效果与彩蛋

除了上文提到的那些动效，其他动效用css3就可以实现。比如第一屏左下角这个比较像挊的动画就是一个标准到无聊的css3动画。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/13.gif)  

如果懒得自己实现css3动画，也可以使用现成的。比如[animation.css](https://github.com/daneden/animate.css)库就囊括了一些常用的动画，这个网页里鼠标移上“关于我们”合影的效果就是直接使用了这个库提供的“tada”动画（感觉名字萌萌哒）。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/3.gif)  

比直接引用库还方便的动效就当属上文提过的[transition属性](http://www.w3school.com.cn/css3/css3_transition.asp)了。比如“团队”部分，我只是设置了当鼠标hover的时候，有以下变化：  

团队成员照片上叠加几个`filter`属性，比如高斯模糊、对比度增强和褐色化；
带有介绍的、具有半透明背景和内阴影的覆盖层显示出来。  

但是由于`transition`属性的设置，这些属性都有了渐变过程，变得自然多了。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/gif/4.gif)  

下面介绍一下彩蛋。最大的彩蛋就是当你打开开发者工具，会在控制台发现格式化的版权信息：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/chrome.png)  

这涉及到console的格式化输出。  
```js
console.log('%cDEEP%c深度映像工作室%c\n%c  ©2017 by DEEP IMAGING VISION STUDIO  ',
                'color:white;background:#B5916F;padding:10px;font-size:24px;line-height:44px',
                'color:white;background:#231F20;padding:10px;font-size:24px;line-height:44px',
                'padding:0px',
                'color:white;background:#666;padding:2px;font-size:12px;line-height:20px'
            );
```

对于console，其实我们可操控的格式的自由度非常小，上面这段代码的基本思想就是把一句话分三段（DEEP、深度映像工作室、版权信息），然后每段设置一个字体大小、背景色和`padding`。虽然发挥空间小，但是如果配色配得好，还是能像那么回事的。  

设计彩蛋无疑是一种乐趣，我以前在一个专门的回答里谈了下感想：[如何在程序里留下彩蛋？](https://www.zhihu.com/question/271409373/answer/362807022)  


## 九、Webpack与各loader配置
前面总结的大部分是视觉效果的设计和实现，从这节开始进入更硬核的部分，详细总结一下这个页面是怎么用npm工具构建，又是怎么用webpack打包的。这些工具在前两年被称作是“前端工程化”的潮流，但如今看来，如果想要做前后端分离，它们更像是空气和水。主要的目的是优化前端性能，减少请求数和压缩资源大小，并方便调试与测试，提升开发体验。  

之前我使用Angular、React和Vue都只用现成的脚手架，这次第一次从零配置webpack，所以关于webpack部分会比较详细，是以初学者的视角去总结的。但是，下文假设读者有使用Angular、React或Vue自带脚手架的经验，知道ES6 module、npm、webpack大概是怎么回事，否则先去看一下[webpack官方文档](https://www.webpackjs.com/guides/getting-started/)会比较好。  

首先明确一下这一部分的目的：  

**假设这个官网主页已经写好了**，有一个手撸的`index.html`文件，引用了一些css文件，html和css都牵扯了一堆的资源文件，如图片、视频、字体等。js部分引用了一些库，还引用了一个手撸的`index.js`文件，`index.js`文件内部还引用了其他数个js文件。  

现在把它用webpack打包，生成一套压缩和优化过的，可以直接用于生产环境的前端页面、代码文件和资源文件。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/zip.png)  

构建这个项目的命令行脚本我都记录在根目录下的`build_steps.txt`文件里。首先是项目初始化和webpack安装：  
```sh
$ npm init
$ npm i -D webpack webpack-cli
```

webpack作为一个模块打包器，原本是用来打包互相依赖的js文件的。但是通过各种loader和插件的加成，才变得“一切”皆可打包。就像人类的胎儿在子宫的发育过程和人类进化过程意外地重合一样，我们逐步配置webpack的过程似乎也模拟了webpack的发展过程。  

### 9.1&nbsp;&nbsp;打包js文件

首先在根目录下建一个`webpack.config.js`文件，写入以下配置：  
```js
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'js/[name].[hash].bundle.js'
    }
};
```

这个配置设定了如下信息：  

- 打包js的入口文件是`src/index.js`；
- 打包好的js文件存放在项目根目录下的docs文件夹中（一般这个文件夹都起名为dist，但是在这个项目中，GitHub Pages直接从docs文件夹加载网页，因此这里就是docs了）；
- 打包好的js文件起名规则是`js/[name].[hash].bundle.js`，也就是把打包好的文件存入`./docs/js`文件夹，文件名为`[name].[hash].bundle.js`。其中`[name]`代表原js文件名，`[hash]`代表本次生成的哈希值（用于避免上线之后浏览器缓存不及时更新的问题）。

接下来这个配置就可以直接使用了。开始打包之前还需要编辑一下`package.json`文件，移除`main`属性并添加一行`"private": true`（为了防止npm意外发布你的代码）：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/pj.png)  

然后在`script`属性里添加一个`build`属性：  
```json
"scripts": {
    "build": "node_modules/.bin/webpack"
},
```

build属性的值`node_modules/.bin/webpack`是一条命令。如果我在命令行中运行`npm run build`，那么等同于运行webpack命令。而webpack命令默认的配置文件是`webpack.config.js`，因此这个文件名不用写进命令里去。  

这时我们在命令行中运行一下`npm run build`，如果js文件的解析没什么错误，你会发现docs文件夹被自动生成，结构是类似于这样的：  
```
docs
  |- /js
    |- index.dd32afaad6ab68153238.bundle.js
```

### 9.2&nbsp;&nbsp;将ES6以上的语法转译为ES5

ES6语法固然很爽，但并不是所有浏览器都支持，出于浏览器兼容的目的我们应该在打包js文件时把ES6及以上语法转译为ES5。这个领域最有名的工具就是[babel](https://www.babeljs.cn/)。  

babel的官网有一个在线转换器，可以把下一代js语法转为ES5语法。我觉得是个很好的“实验室”，可以研究下新语法的本质。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/babel.png)  
*小例子：箭头函数与标准匿名函数对于this指向的差别*  

为了使用这个神器，我们还需要了解[loader](https://www.webpackjs.com/concepts/loaders)的概念。loader是webpack用来预处理文件的插件，当webpack从入口开始解析文件时，遇到的所有被引用的文件，只要符合某个loader的标准就调用这个loader预处理该文件。换句话说，这允许你打包几乎任何静态资源。  

在webpack里，我们需要用到的是**babel-loader**，可以用来预处理js文件。先安装babel-loader及相关库：  
```sh
$ npm i -D babel-loader @babel/core @babel/preset-env
```

接下来配置`webpack.config.js`：  
```js
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'js/[name].[hash].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        babelrc: false,  // 不采用.babelrc的配置
                    }
                }
            }
        ]
    }
};
```

配置文件里加了一个新属性`module`，在`rules`里增加了一个规则。`test`表示该loader适用的文件的正则表达式，`exclude`表示排除掉的文件的正则表达式，这些表达式用来匹配文件的路径。`use`里是对loader的设置。  

我们完成了这样一个工作：`src/index.js`文件与它依赖的所有js文件都被打包进一个文件中，并实现了浏览器兼容，仅此而已，然并卵。我要生成的是整个页面和它的所有资源，只打包js有什么用呢？  

### 9.3&nbsp;&nbsp;打包HTML文件（一）

我希望每次运行`npm run build`的时候，页面文件`index.html`中对该js文件的引用也要自动改变，并且也要放到docs文件夹下。其实只靠webpack本身已经完不成这个功能了，我们需要一个插件：**html-webpack-plugin**，用于打包html文件。首先是插件的安装：  
```sh
$ npm i -D html-webpack-plugin
```

接下来继续配置`webpack.config.js`，更改三处地方，变成这样：  
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');  // 更改1

module.exports = {
    entry: {
        index: './src/index.js'  // 更改2
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'js/[name].[hash].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        babelrc: false,  // 不采用.babelrc的配置
                    }
                }
            }
        ]
    },
    plugins: [  // 更改3
        new HtmlWebpackPlugin({
            minify:{
                collapseWhitespace: true
            },
            chunks: ['index'],
            filename: 'index.html',
            template: './src/layout/index.html'  
        })
    ]
};
```

更改1：引入html-webpack-plugin。  

更改2：我们在配置文件中把`entry`改为了键值对的形式，相当于显式声明了一个块（Chunk）。chunk表示一个文件，默认情况下webpack的输入是一个入口文件，输出也是一个文件，这个文件就是一个chunk。如果后期增加一个入口文件，就会打包成两个bundle文件，就是两个chunk。这里的块名就是键值对的key值“index”。  

更改3：新增`plugins`属性，在`plugins`里new一个`HtmlWebpackPlugin`的实例。在传入的对象里，`minify`表示压缩html的相关设置（这里设置为消去html里标签之间的空白字符），`chunks`表示要在html中引入的js文件的块名，`filename`表示最后打包生成的html的文件名（也可以是相对路径，以`output.path`为根目录），`template`设置了html页面的模板地址，就是你要解析的原html文件。  

将docs文件夹手动删除，再运行`npm run build`之后，文件结构是类似于这样的：  
```
docs
  |- index.html
  |- /js
    |- index.dd32afaad6ab68153238.bundle.js
```

打开index.html文件，会发现源代码都缩到了一行，而且在`<body>`的末尾自动添加了一个标签（js文件的hash值可能不同）：  
```html
<script type="text/javascript" src="js/index.dd32afaad6ab68153238.bundle.js"></script>
```

如果你之前手动引入过这个js文件，这个标签还是会加上去。因此在原html文件里没有必要手动引入任何需要打包的js文件。  

### 9.4&nbsp;&nbsp;打包CSS文件
在webpack中，js是一等公民，webpack默认不打包css文件，打包css文件同样需要loader与其他插件。  

在原始网页中css文件是直接link在`<head>`标签里的。但是用了webpack就不必在html中引用了，而是引用在js里：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/css.png)  

为了能解析这些css文件，先安装**css-loader**：  
```sh
$ npm i -D css-loader
```

然后配置`webpack.config.js`文件，在`modules.rules`中添加以下规则：  
```js
{
    test: /\.css$/,
    use: [
        {
            loader: 'css-loader',
            options: {
                url: true,
                modules: 'global'
            }
        }
      ]
}
```

css-loader的配置中，`url`表示是否解析css中`url()`语句引用的资源文件，`modules`表示是否启用局部作用域，默认为“scope”即启用，css中的类名等会被替换为哈希值。由于我只有一个html文件，所以选择了全局作用域。  

如果只用css-loader，打包后你会发现相关css直接放在了页面`<head>`里的`<style>`标签里，并没有输出单独的css文件。输出css文件需要使用一个插件：**mini-css-extract-plugin**。首先安装插件：
```sh
$ npm i -D mini-css-extract-plugin
```

接着修改`webpack.config.js`文件，首先在文件开头引用mini-css-extract-plugin：  
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
```

接下来修改引用css-loader的那条规则，变成以下这样：  
```js
{
    test: /\.css$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '../'
            }
        },
        {
            loader: 'css-loader',
            options: {
                url: true,
                modules: 'global'
            }
        }
    ]
}
```

我们在同一个规则下设置了两个loader，实际处理顺序是先用css-loader再用`MiniCssExtractPlugin.loader`（从下到上应用loader，与直觉相反）。  

在`MiniCssExtractPlugin.loader`里设置了`publicPath`，在打包时`publicPath`会加到css引用的所有资源文件路径的头部，如果使用了静态文件CDN，这个属性也可以填CDN的地址。`publicPath`其实是一个重要属性，很多地方都有，具体可参考[这篇文章](https://juejin.im/post/5ae9ae5e518825672f19b094)。  

然后，我们在plugins属性里增加一项（和HtmlWebpackPlugin并列）：  
```js
new MiniCssExtractPlugin({
    filename: 'css/[name].[hash].css'
})
```

这里才算正式声明了这个插件，并设置了css文件的保存路径，与`output.filename`相似。  

接下来运行`npm run build`，如果不报错（事实上会报错，因为我们设置了解析css里的url，但是又没有相应loader），输出的docs文件夹结构是类似这样的：  
```
docs
  |- index.html
  |- /js
    |- index.dd32afaad6ab68153238.bundle.js
  |- /css
    |- index.dd32afaad6ab68153238.css
```

### 9.5&nbsp;&nbsp;优化JS和CSS文件
虽然以上工作成功打包了js和css，但还没有经过进一步的压缩和优化。在这里我们停顿一下，通过引用一些插件来优化js和css的输出效果。需要安装的插件分别是**uglifyjs-webpack-plugin**和**optimize-css-assets-webpack-plugin**：  
```sh
$ npm i -D uglifyjs-webpack-plugin
$ npm i -D optimize-css-assets-webpack-plugin
```

若要在`webpack.config.js`文件里配置，两个插件作为优化器，不应放在`plugins`属性里，而是放在一个新的属性：`optimization`。我们在配置文件中加入这个属性：  
```js
optimization: {
    minimizer: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
    ]
}
```

UglifyJsPlugin的配置中，前两个都是关乎构建性能的，分别是启用文件缓存和并行化处理。最后一个`sourceMap`设置了是否输出对应的map文件（输出map会减慢编译速度）。和压缩相关的参数还有很多，具体文档可见：[UglifyjsWebpackPlugin · webpack 中文文档(2.2)](https://www.html.cn/doc/webpack2/plugins/uglifyjs-webpack-plugin/)。  

OptimizeCSSAssetsPlugin的配置可参考：[NMFR/optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)。需要注意的是，对css的压缩没有js压缩那么“无损”，据我所知有一些压缩规则可能会造成问题，比如：  

- **属性合并**。Longhand属性压缩为Shorthand属性（这两个名词的解释在这里：[CSS Shorthand vs. Longhand - When to Use Which - Hongkiat](https://www.hongkiat.com/blog/css-shorthand-longhand-notations/)）
- **选择器合并**。如`.a {width: 100px} .b {width: 100px}`会被压缩成`.a, .b {width: 100px}`

当然一般情况下是不会有影响的，但如果压缩以后样式改变，可以想想是不是因为这些原因。  

除此之外，我们还要设置一下`devtool`。在配置中增加如下属性，与`optimization`同级：  
```js
devtool: 'source-map'
```

当js异常抛出时，你常会想知道这个错误发生在哪个文件的哪一行。然而因为webpack将文件输出为一个或多个bundle，而且又被混淆压缩过，所以追踪这一错误会很不方便。`devtool`可以设置各种source map，具体可见[这篇文章](https://www.cnblogs.com/jingmoxukong/p/7018671.html)。  

### 9.6&nbsp;&nbsp;打包图片和其他资源文件
html、css、js都有了，但是和它们相关的资源文件还没被放进输出目录里，接下来就涉及到对图片、视频、图标、字体文件等资源的打包了。我们需要安装一个神器：**url-loader**。  
```sh
$ npm i -D url-loader
```

这个loader有什么用呢？它几乎支持所有资源的预处理，而且可以把比较小的资源文件转为base64编码嵌入html、css或js文件里，从而节省资源请求数。我们在`modules.rules`里面添加以下规则：
```js
{
    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp4|ico)$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 8192,
                name (file) {
                    return '[path][name].[ext]?[hash]';
                }
            }
        }
    ]
}
```

test属性可以根据实际情况自己删改，但是应该包括所有可能引用到的资源文件的后缀名。  

loader配置里的`limit`是文件大小阈值，这里设置为8k，8k以下的文件就会被转换为base64编码，否则原样复制到输出目录。以下是base64版svg图片嵌入html的例子：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/base64.png)  

回到配置中来，`name`同样是指输出的文件名格式，这里用了函数类型作为属性值，函数返回`[path][name].[ext]?[hash]`，其实和直接写字符串效果一样。`[path]`是指文件名以外的相对路径（相对于项目根目录），这样打包以后输出目录中资源文件的相对路径会被完整保留下来。`[name]`指原文件名，`[ext]`指原扩展名。至于哈希值我把它放在了问号的后面，既能避免缓存问题，又能保持文件名的清爽。  

一般而言我们对于资源文件的打包工作就结束了。但是在这个项目里，经测试发现有一张小图片被转化为base64以后不能被成功识别，其实就是[第三节](#三浏览器兼容)提到过的Safari图标文件。可能Safari在提取图标的时候不支持base64只认文件路径。这里又牵扯出一个问题：如何处理例外？  

解决这个问题还需要一个**file-loader**。file-loader是url-loader的弱化版，换句话说url-loader只是在file-loader的基础上多了base64功能，恰好可以用file-loader处理那些不需要base64编码的文件。首先进行安装：
```sh
$ npm i -D file-loader
```

我们只需要对一个名为`icon256.png`的图片应用file-loader。在url-loader的规则上方插入一条新规则，再在url-loader的规则里添加`exclude`。修改如下：
```js
{
    test: /icon256\.png$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name (file) {
                    return '[path][name].[ext]?[hash]';
                }
            }
        }
    ],
},
{
    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp4|ico)$/,
    exclude: /icon256\.png$/,  // 添加例外
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 8192,
                name (file) {
                    return '[path][name].[ext]?[hash]';
                }
            }
        }
    ]
}
```

关于这两个loader和base64编码的原理，[这篇文章](https://segmentfault.com/a/1190000011487980)讲得不错。  

### 9.7&nbsp;&nbsp;打包HTML文件（二）
终于到最后一步了。我们之前使用html-webpack-plugin的时候，功能只是压缩、输出html文件，并在里面加入打包后的js和css引用。但是html中引用的资源文件却没有解析（如`<img>`的`src`），也没有复制到输出目录。如果没有接下来的设置，上文的url-loader只会处理css和js里引用的资源文件。  

为此我们需要安装**html-loader**：
```sh
$ npm i -D html-loader
```

添加的规则如下：  
```js
{
    test: /\.html$/,
    use:[
        {
            loader: 'html-loader',
            options: {
                attrs: [
                    'img:src',
                    'link:href',
                    'video:src',
                    'video:poster'
                ]
            }
        }
    ]
}
```

配置里的`attrs`属性列出了四个字符串，以“img:src”为例，img是指html中的`<img>`标签，src是指`<img>`的`src`属性，表示html-loader作用于`<img>`标签中的`src`的属性。这里一定要把引用本地资源文件的属性名都列出来。  

接下来心满意足地运行一下`npm run build`，一个生产环境下可用的页面包终于被生成出来了！  

### 9.8&nbsp;&nbsp;其他配置
这里介绍两个实用工具：eslint和clean-webpack-plugin。  

一般的代码编辑器都不会对你的js代码风格指指点点，就算你全写在一行也照样能跑。但是为了保持良好的代码风格，我们可能需要一个额外的工具监督自己，这种工具在团队项目中更为重要。达成这个目的需要安装**eslint**，名字里带lint的工具基本都有类似的监督功能。  

```sh
$ npm i -D eslint eslint-loader
$ npm i -g eslint
```

第一行是在本项目的开发依赖中安装eslint和eslint-loader，第二行是全局安装eslint。安装好以后就可以在项目目录下初始化eslint：  
```sh
$ eslint --init
```

与`npm --init`相似，它会以问答形式来确定你想维持的代码风格，最终生成一个`.eslintrc.js`配置文件。如果你用的编辑器是vscode（强行安利！），它会自动读取`.eslintrc.js`文件，对不符合规则的代码进行提示。  

我们还需要用**eslint-loader**对js代码进行预处理，在`webpack.config.js`文件的`modules.rules`里添加以下规则（放在babel-loader规则的上方）：  
```js
{
    enforce: 'pre',
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
}
```

配置好这些以后，在build的时候如果它发现有地方不符合eslint规则，会报错提醒你修改。  

但是我们有时也需要灵活一些。比如eslint默认规则是不应该在代码中出现`console`对象，但在第八节讲过，我们有输出彩蛋的刚性需求（并不），这时候就需要绕过规则。控制`console`对象的规则名为`no-console`，我们只需要在相关代码文件第一行加入如下注释就好：    
```js
/* eslint-disable no-console */
```

现在这个构建方法还有一个小瑕疵：由于输出的js和css文件名里都有哈希值，每次构建都无法覆盖先前的原文件，多次构建以后不同版本的代码混在一起极为不便。那么需要在每次运行`npm run build`之前手动删除输出文件夹docs。但是这一步也是可以自动的，只需要安装一个叫**clean-webpack-plugin**的工具就好，它能帮你在打包前自动删除输出目录：  
```sh
$ npm i -D clean-webpack-plugin
```

在webpack.config.js的开头引用：  
```js
const CleanWebpackPlugin = require('clean-webpack-plugin');
```

在plugins属性里面添加这个插件：  
```js
new CleanWebpackPlugin(path.resolve(__dirname, 'docs'), {
    root: __dirname,
    verbose: true
})
```

构造CleanWebpackPlugin实例的参数有两个：你要删除的文件夹路径和相关配置。在配置里，`root`表示项目根目录，`verbose`表示是否将日志打印在控制台上。  

再build一次试一下，完美！  

## 十、开发环境配置与拆分
### 10.1&nbsp;&nbsp;配置拆分
我们在上一节主要维护了一个`webpack.config.js`文件，似乎已经够用了。但是我们还面临一个问题：如何更方便地调试页面？难道每改一处代码就要运行一遍`npm run build`吗？  

如果用过ARV三大框架，肯定会了解**开发服务器**（dev server）、**实时重新加载**（live reloading）和**模块热替换**（Hot Module Replacement, HMR）的概念。我们可以借助webpack搭一个专用于前端页面调试的本地服务器，在具有http协议的同时，还能实现一更改代码文件，浏览器里的预览页面就会自动刷新，甚至不用刷新就能自动更新的功能。  

在这个时候，我们明显感觉到了开发环境和生产环境的不同。通常这两个环境的webpack配置文件是独立的，但是最好还是遵循不重复原则(Don't repeat yourself, DRY)，保留一个公共配置。为了将这些配置合并在一起，我们需要使用一个叫**webpack-merge**的工具。有了公共配置，就不必在环境特定（environment-specific）的配置中重复代码。  

接下来我们开始拆分配置。首先安装webpack-merge：  
```sh
$ npm i -D webpack-merge
```

然后在项目根目录建立一个文件夹config，新建三个js文件：  
```
config
  |- webpack.common.js
  |- webpack.dev.js
  |- webpack.prod.js
```

接下来要把`webpack.config.js`拆分到`webpack.common.js`和`webpack.prod.js`两个文件中，webpack.config.js就不复存在了。那么哪些配置是生产环境独有的呢？我选择了以下三个部分：  

- `devtool`属性
- 所有优化器
- clean-webpack-plugin插件

把这四部分抽到`webpack.prod.js`以后，剩余设置都放在`webpack.common.js`。`webpack.prod.js`需要引用`webpack.common.js`，再和自己的设置merge在一起。  

最后`webpack.prod.js`是这样的：  
```js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new CleanWebpackPlugin(common.output.path, {
            root: common.output.path + '/../',
            verbose: true
        })
    ]
});
```

注意，由于我把配置文件移到了config文件夹，当前目录不再是项目根目录，所有和路径有关的属性都要检查一下。比如clean-webpack-plugin配置里的路径，又比如在`webpack.common.js`中，`output.pash`属性应改为`path.resolve(__dirname, '../docs')`。  

关于`mode`属性：`mode`有三个参数`production`、`development`、`none`，默认为`production`。在`mode`为`production`或`development`的状态下，为了兼顾两个状态下的程序运行，webpack创建了一个全局变量`process.env.NODE_ENV`，等同于在插件plugins中加入了如下语句：  
```js
new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development|production") })
```

`process.env.NODE_ENV`可以在程序中区分当前是生产环境还是开发环境，是个很重要的量。  

### 10.2&nbsp;&nbsp;开发服务器配置

接下来可以配置开发环境了。首先安装**webpack-dev-server**，这个是本地开发服务器工具：  
```sh
$ npm i -D webpack-dev-server
```

将开发环境设置写入`webpack.dev.js`中：  
```js
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'docs')
    }
});
```

我们可以发现主要是增加了三个属性：`mode`、`devtool`和`devServer`。其中`devServer`是webpack-dev-server的配置。`contentBase`指定了服务器资源的根目录，如果不写入`contentBase`的值，那么`contentBase`默认是项目的目录。更多设置可以参考[这篇文章](http://www.cnblogs.com/penghuwan/p/6941616.html)。  

`devtool`和生产环境不同，变成了`inline-source-map`，将source map嵌入到源文件中。  

这里需要强调一下webpack打包和webpack-dev-server开启服务的区别：webpack输出真实的文件，而webpack-dev-server输出的文件只存在于内存中，开启的时候在输出目录是找不到相关文件的。  

我们添加一个script脚本，可以直接运行开发服务器。再次修改`package.json`文件，`scripts`属性如下：  
```json
"scripts": {
    "dev": "node_modules/.bin/webpack-dev-server --open --config config/webpack.dev.js",
    "start": "npm run dev",
    "build": "node_modules/.bin/webpack --config config/webpack.prod.js"
}
```

我们修改了`build`（用`--config`指定了配置文件），增加了`dev`和`start`。`dev`的命令是`webpack-dev-server`，用`--open`设置自动弹出浏览器窗口，用`--config`指定配置文件。而`start`语句指向`dev`。如此一来，我们用命令行运行`npm run dev`或`npm start`就可以运行开发服务器了。  

### 10.3&nbsp;&nbsp;模块热替换配置

模块热替换（Hot Module Replacement, HMR）是webpack提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行刷新。和之前webpack-dev-server自带的live reload功能不同，模块热替换由于避免了整页更新，从而在调试时可以保持网页的使用状态（如填写字段、弹出弹窗等等）。关于HMR的内部原理，[这篇文章](https://zhuanlan.zhihu.com/p/30669007)讲得很好。  

启用这个功能实际上很简单。只需要更新webpack-dev-server的配置，和使用webpack内置的HMR插件。  

首先在`webpack.dev.js`文件开头引用webpack：
```js
const webpack = require('webpack');
```

然后在配置里增加`plugins`属性，引入两个插件：  
```js
plugins: [
    new webpack.HotModuleReplacementPlugin(),  // 开启全局的模块热替换
    new webpack.NamedModulesPlugin()  // 当模块热替换时在浏览器控制台输出对用户更友好的模块名信息
]
```

然后`devServer`属性里加一行设置即可。
```js
devServer: {
    contentBase: path.join(__dirname, 'docs'),
    hot: true  // 开启热替换
}
```

现在我们可以试一下了：在开发服务器运行中，把html文件上的一段文案改一下，保存，观察浏览器的console。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/hmr.png)  

Nothing hot updated？怎么和说好的不一样？  

查阅了很多资料，发现原因是热更新的检查是从入口文件开始的，入口文件并没有引用html文件。有一个解决方案是在js入口文件（`index.js`）里添加引用：  
```js
import './layout/index.html';
```

但是这个方法无疑会增大js文件大小，我不是很喜欢。而且经过测试，html改动后仍然会调用live reloading而非HMR，所以这里留一个疑问。  

做到这里不禁感叹，以前使用Angular、React和Vue的时候体验都很顺滑，从没觉得从零搭建webpack脚手架难度这么大。毕竟这是一个边练边学的过程，真要做时间比较赶的项目，还是成熟脚手架更稳定。  

## 十一、模块懒加载
webpack支持模块懒加载。在这个项目中，模块懒加载的需求其实来自于[第二节](#二响应式设计)提到的移动端canvas聚光灯动画，[第六节](#六Canvas动画部分)介绍了它的实现。由于这个动画是用在移动端代替背景视频的，因此我需要判断一下当前设备是否是移动端，只有在移动端导入和它相关的所有代码。  

在动画实现上，我分离了设置动画的代码并放在一个单独的`scrawl_canvas_animate.js`文件里。同时我又将Scrawl-canvas库魔改一番，合并缩减了代码放在了`scrawlCanvas.js`文件中，被`scrawl_canvas_animate.js`文件引用。  

那么如何在代码中动态加载这个模块？使用Dynamic Import比较简单直接一点：  
```js
$(function() {
    // 移动端canvas聚光灯动画（懒加载）
    // 是否是移动端且支持canvas
    if (device.mobile() && Modernizr.canvas()) {
        import(
            /* webpackChunkName: "scrawl_canvas_animate" */
            './scrawl_canvas_animate')  // 模块路径
            .then(scrawl_canvas_animate => {
                // 使用这个模块的相关代码
            });
    }
});
```

在这里，`import`成为了一个函数，接受的参数与`import`语句无异，并提供基于Promise的API。在路径参数之前有一行`webpackChunkName`注释，用来告诉webpack在打包时这个文件的块名应该起什么。  

为了接应这行注释，我们更改一下`webpack.common.js`文件，在`output`属性中添加一行设置：  
```js
chunkFilename: 'js/[name].[hash].bundle.js',
```

现在还有一个很重要的问题，Dynamic Import还处于草案阶段，浏览器并不能直接支持，甚至连babel-loader和eslint都通不过。  

面对这种情况，我们首先解决babel-loader，需要新的工具：**babel-plugin-syntax-dynamic-import**。  
```sh
$ npm i -D babel-plugin-syntax-dynamic-import
```

这个工具能帮助babel-loader解析Dynamic Import语法。安装以后将`webpack.common.js`里babel-loader所在的规则修改一下：  
```js
{
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
            babelrc: false,  // 不采用.babelrc的配置
            plugins: [
                'syntax-dynamic-import'
            ]
        }
    }
}
```

接下来解决eslint，这里需要安装**babel-eslint**：
```sh
$ npm i -D babel-eslint
```

然后修改`.eslintrc.js`文件，添加以下配置：  
```js
"parser": "babel-eslint",
"parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "allowImportExportEverywhere": true
}
```

修改好后，运行一下`npm run build`，我们发现在docs文件夹的js子文件夹赫然多了一个文件：  
```
js
  |- index.dd32afaad6ab68153238.bundle.js
  |- scrawl_canvas_animate.dd32afaad6ab68153238.bundle.js
```

成功了！`scrawl_canvas_animate`虽然没有写在配置文件的入口列表里，webpack还是把它挖了出来，并单独打包成一个文件。  

如果懒加载的模块与主模块有共同的依赖，为了节省请求资源大小，需要把公用的模块单独打包。这个涉及到Code Splitting，具体可参考[这篇文章](https://blog.csdn.net/zjw0742/article/details/74518955)。  

除了canvas动画部分，lottie动画也适用于懒加载，因为如果浏览器不支持lottie-web（如[第三节](#三浏览器兼容)提到的IE11/Edge），也不必加载相关代码和整个lottie-web库。lottie动画部分处理与上文相似，就不赘述了。  

测试一下，在PC端Chrome浏览器打开页面，同域js请求是这样的：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/js-1.png)  

用设备模拟器模拟移动端环境，同域js请求是这样的：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/js-2.png)  
*前三个js存入缓存，最后一个是懒加载的js*  

懒加载的js在加载时，`<script>`引用全部放在了`<head>`标签里。  

## 十二、其他减少请求数和压缩资源大小的方法
终于把最重要的部分总结完了，现在是饭后甜点时间。  

当页面用Webpack进行优化以后，总结一些尚余的可优化空间：  

1. **静态文件CDN**：用CDN加载静态文件可以减少对页面服务器的请求。如果想通过CDN引用js库，推荐七牛云的Staticfile CDN。前些年还可以通过fork它的GitHub仓库再pr来自行增加js库，但现在好像不太维护了，只有一些最知名的库还在更新。即使如此，它的速度和易用性都不错，关键是免费。  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/scdn.png)  

2. **spirit图**：spirit图算是经典的减少图片资源请求的压缩方式，主要是把小尺寸图片拼在一张大图里，然后通过css的`background-position`来定位。在本项目中，“团队”部分的照片就用spirit图优化过，六个照片其实是一张图片：  

![图片加载中](https://raw.githubusercontent.com/zamhown/divs-homepage/master/readme/spirit.png)  
当然spirit图也有着维护较麻烦的缺点。一般只有不怎么变化的小尺寸图片会用这种方法。  

3. **尽量使用svg图片**。作为纯矢量格式的svg往往比同样内容的png小太多，也清晰太多。压缩了资源大小不说，如果用了url-loader也更容易被转换为base64，这下连请求都省了。  

在不断优化的过程中，多多检查开发者工具的Network标签页，看着请求慢慢变少，资源慢慢变小，就会有一种“盘它”的感觉。  

***

Hoo wee……终于总结完了。这次介绍的作品是一张简简单单的主页，但牵扯到的东西贯穿了我三年来的学习成果（这次没有总结Vue在本页面的应用，因为没啥讲头），我相信做精一样东西比千百次地重复收获得更多。在开发的时候，我碰过不少壁，做过不少妥协，也遗留了不少问题，希望可以得到大佬和未来实践的指引，就当是为以后寻找方向吧。
