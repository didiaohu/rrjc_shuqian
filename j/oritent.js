/* ==========================================================
 * oritent.js v20141226
 * ==========================================================
 * Copyright shihua
 * 359529568@qq.com
 * 移动端翻屏提示模块
 * ========================================================== */

(function(){
  var e = function() {
    function t(t) {
      var n = e,
          r = t.split("\r\n");
      var i = !! n.cssRules ? n.cssRules.length : 0;
      for (var s = 0; s < r.length; ++s) {
        n.insertRule(r[s], i++)
      }
      return i
    }
    var e = function() {
      var e = document.getElementsByTagName("head")[0];
      var t = document.createElement("style");
      t.type = "text/css";
      e.appendChild(t);
      return document.styleSheets[document.styleSheets.length - 1]
    }();
    return {
      add: t
    }
  }();
  var prefix = function() {
    var test = document.createElement('div');
    test.style.cssText = '-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;';
    if (test.style.webkitTransition) {
      return '-webkit-'
    } else if (test.style.mozTransition) {
      return '-moz-'
    } else if (test.style.oTransition) {
      return '-o-'
    } else if (test.style.msTransition) {
      return '-ms-'
    } else {
      return '';
    }
  }();
  var ort = function($el){
    if (window.orientation == 0 || window.orientation == 180) {
      $el.style.display = 'none';
      return false;
    } else if (window.orientation == 90 || window.orientation == -90) {
      $el.style.display = 'block';
      return false;
    }
    var width = $el.parentNode.clientWidth;
    var height = $el.parentNode.clientHeight;
    if(width < height){
      $el.style.display = 'none';
      return false;
    }else{
      $el.style.display = 'block';
      return false;
    }
  }
  var o = function(option) {
    var w, i, c, s;
    var t = prefix;
    w = 'display:none;position: absolute;top: 0;left: 0;z-index: 9999;overflow: hidden;width: 100%;height: 100%;background: #90b8a1;';
    c = 'position: absolute;top: 50%;left: 50%; width: 300px; height: 150px;margin: -75px 0 0 -150px;color: rgb(255, 255, 255);text-align: center;';
    i = 'position: relative;display: block;width: 72px;height: 110px;margin: 0 auto 10px;background: url(../base/i/tool/phone.png) no-repeat;background-size: 100% 100%;'+t+'transform: rotate(-90deg);'+t+'animation: phone 1.5s ease-in infinite;';
    s = '@'+t+'keyframes phone {0% {'+t+'transform: rotate(-90deg);}25% {'+t+'transform: rotate(-90deg);}50% {'+t+'transform: rotate(0deg);}75% {'+t+'transform: rotate(0deg);}100% {'+t+'transform: rotate(-90deg);}}';
    var str = '<div style="'+c+'"><i style="'+i+'"></i><div>为了更好的体验，请使用竖屏幕浏览</div></div>';
    e.add(s);
    var ele = document.createElement("div");
    ele.style.cssText = w;
    ele.innerHTML = str;
    document.body.appendChild(ele);
    window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function(){
      ort(ele);
    }, false);
    var $welcome = document.getElementById('tips');
  };
  window.oritent = o;
})(this);
new oritent()