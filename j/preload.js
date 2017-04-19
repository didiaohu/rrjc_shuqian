/* ==========================================================
 * preload.js v20150311
 * ==========================================================
 * Copyright shihua
 * 359529568@qq.com
 * 边锋移动端图片预加载模块
 * ========================================================== */

(function(){
  var p = function(option) {
    if (!option.items || !Array.isArray(option.items) || !option.items.length || option.dev){
      document.querySelector('#loader').style.display = 'none';
      typeof option.callback === 'function' && option.callback.call(this);
      return;
    }
    this.selfimg = ['loading/bf-logo.png','loading/bf-slogan.png','loading/logo-center.png'];
    this.items = option.items;
    this.prefix = option.prefix || '';
    this.callback = option.callback || false;
    this.isFinish = false;
    this.counting = false;
    this.timer = null;
    this.percent = 0;
    this.despercent = 0;
    this.dev = option.dev || false;
    this.init();
  };
  p.prototype.init = function(){
    var sf = this;
    var l = 0;
    sf.selfimg.forEach(function(t) {
      var s = new Image;
      s.onload = s.onerror = s.onabort = function() {
        ++l === 3 && sf.startLoad();
      };
      s.src = (sf.prefix || '../i/') + t ;
    })
    return this;
  };
  p.prototype.startLoad = function(){
    var sf = this;
    sf.load();
    document.querySelector('.loading-container').style.opacity = 1;
    setTimeout(function() {
      ['.round-top','.round-bottom','.round-left','.round-right'].forEach(function(i){
        document.querySelector(i).className+= ' active';
      });
      document.querySelector('.loading-tips').style.opacity = 1;
    }, 300);
    sf.percent = 0;
    setTimeout(function() {
      sf.timer = setInterval(function(){
        sf.isFinish && sf.loadFinish();
      }, 2000);
    }, 700);
    return this;
  };
  p.prototype.load = function() {
    var e = 0;
    var t = this.items;
    var n = this.items.length;
    var sf = this;
    t.forEach(function(t) {
      var s = new Image;
      s.onload = s.onerror = s.onabort = function() {
          sf.despercent = Math.floor((++e / n) * 100);
          sf.showProgress();
          sf.isFinish = (e===n)? true : false;
      };
      s.src = sf.prefix + t;
    })
  };
  p.prototype.showProgress = function(){
    var sf = this;
    var desp = sf.despercent;
    sf.percent <= desp && sf.percent<100 && !sf.counting && sf.countNum();
  };
  p.prototype.countNum = function(){
    var sf = this;
    sf.counting = true;
    setTimeout(function(){
      sf.percent<100 && sf.percent++;
      var str = '玩命加载中...'+ sf.percent +'%';
      document.querySelector('.loading-tips').innerHTML = str;
      if(sf.percent != sf.despercent){
        sf.countNum();
      }else{
        sf.counting = false;
      }
    }, 20);
  }
  p.prototype.loadFinish = function(){
    var sf = this;
    ['.round-top','.round-bottom','.round-left','.round-right'].forEach(function(i){
      var cn = document.querySelector(i).className;
      document.querySelector(i).className = cn.replace('active', '');
    });
    clearInterval(sf.timer);
    setTimeout(function(){
      document.querySelector('.loading-tips').style.display = 'none';
      document.querySelector('.loading-container').className+= ' finish';
      document.querySelector('.loading-finish').className+= ' finish';
    }, 500);
    var r = this.callback;
    if(typeof r === "function"){
      r.call(sf);
    }
    document.querySelector('#loader').style.opacity = 0;
    setTimeout(function(){
      document.querySelector('#loader').style.display = 'none';
    }, 2500);
  };
  window.preload = p;
})(this);