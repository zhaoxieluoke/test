/*
* @Author: Administrator
* @Date:   2017-02-04 09:48:30
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-04 15:17:12
*/

'use strict';
function navhover(){
  $("nav ul li a").hover(function(){
    $(this).addClass('acthover').siblings().removeClass('acthover');
  },function(){
    $(this).removeClass('acthover');
  })
}

$(function(){


  Vue.component('vuehead', {
            template: '<header>'+
              '<div class="logo">'+
              '<a href="/">'+
                '<img src="images/index/logo.png" alt="">'+
              '</a>'+
            '</div>'+
            '<div class="blankdiv"></div>'+
            '<nav>'+
              '<ul>'+
                '<li><a href="index.html" class="active index">首页</a></li>'+
                '<li><a href="history.html" class="history">介绍和历史</a></li>'+
                '<li><a href="collection.html" class="collection">馆藏和展览</a></li>'+
                '<li><a href="china.html" class="china">提森和中国</a></li>'+
                '<li><a href="service.html" class="service">馆内服务</a></li>'+
                '<li><a href="visit.html" class="visit">参观提森</a></li>'+
              '</ul>'+
              '</nav></header>'
          })
  Vue.component('vuefoot', {
            template: '<footer>'+
                      '  <div>'+
                      '  <p>'+
                            '<b>参观提森</b>&ensp;&ensp;'+
                            '<a href="">如何到达</a>/'+
                            '<a href="">参观时间</a>/'+
                            '<a href="">费用</a>/'+
                            '<a href="">参观类型</a>/'+
                            '<a href="">下载</a>'+
                          '</p>'+
                          '<p>'+
                            '<b>联系我们</b>&ensp;&ensp;'+
                            '<span>如有任何问题请致电：(+34) 917 911 370  地址：Paseo del Prado 8, 28014 Madridmailto:mtb@museothyssen.org</span>'+
                          '</p>'+
                          '<p>英文站&ensp;&ensp;<a href="">www.museothyssen.org</a>&ensp;版权所有© 提森-博内米萨博物馆 &ensp;备案号:京ICP备05063701号-87</p>'+
                        '</div>'+
                        '<div class="qrcode">'+
                          '<p>提森博物馆微信</p>'+
                          '<img src="images/index/wx_ewm.jpg"/>'+
                        '</div>'+
                      '</footer>'
          })
          // start app
  new Vue({
    el: '#header'
  })
  new Vue({
    el: '#footer'
  })

  navhover();
})