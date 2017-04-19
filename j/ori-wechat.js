/* =============================================
 * v20150207
 * =============================================
 * Copyright 石华
 *
 * 微信分享模块 - 纯原生版
 * ============================================= */

!(function(options) {
var
  win = this;

  if (!options.link) {
    options.link = location.href;
  }
  var $yp_share_tip = document.createElement('img');
  $yp_share_tip.className = 'js-img-share';
  $yp_share_tip['data-toggle'] = 'hide';
  $yp_share_tip.width = '100%';
  $yp_share_tip.cssText = 'display:none;position:fixed;top:0;right:0;z-index:9999;';
  // var $yp_share_tip = $('<img class="js-img-share" data-toggle="hide"\
  //                         width="100%"\
  //                         style="display:none;position:fixed;top:0;right:0;z-index:9999;"\
  //                         >');
  // var $yp_share_img = $('<img style="position:absolute;width:0;height:0;">');
  // $yp_share_img.attr('src', options.img).prependTo(ui.$body);
  var $yp_share_img = document.createElement('img');
  $yp_share_img.style.cssText = 'position:absolute;width:0;height:0;';
  $yp_share_img.src = options.img;
  document.body.insertBefore($yp_share_img, document.body.childNodes[0]);

  // 处理分享封面图片
  function fGetImgPath(sUrlFile) {
    // 判断是否绝对地址
    if (!/^[http|\/]/ig.test(sUrlFile)) {
      // 用图片地址替换原来的页面文件地址
      sUrlFile = location.href.replace(/[\?#].*/ig, '').replace(/\/([^/]+\.[^/]+)$/ig, '').replace(/\/$/ig, '') + '/' + sUrlFile;
    }
    return sUrlFile;
  }
  // 预处理传入数据
  function fFilterData(data) {
    data.img = fGetImgPath(data.img);
    return data;
  }
  // 更新分享数据
  function fUpdateShare(data) {
    data = fFilterData(data);

    if (data.img) {
      // $yp_share_img.attr('src', data.img);
      $yp_share_img.src = data.img
    }
    document.title = data.desc.length>0? (data.title + '-' + data.desc) : data.title;
  };
  function wechat(data) {
    //data = yp.extend(options, data);
    var cfg = options;
    for(var key in data){
      cfg[key] = data[key];
    }
    fUpdateShare(cfg);
  };
  function init() {
    fUpdateShare(options);
  };
  var wm = function(){};
  wm.prototype.updateShare = function(e, data) {
    wechat(data);
  };
  window.wechatManager = wechat;
  init();
})(window.oPageConfig.oWechat);