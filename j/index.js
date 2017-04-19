/* ==========================================================
 * v20150209
 * ==========================================================
 * Copyright 石华
 *
 * 土豪神器
 * ========================================================== */

(function() {
  var ui = {
    $loadingProgress: document.querySelector('#loadingProgress')
  , $yan: document.querySelector('#yan')
  , $pnum: document.querySelector('#pnum')
  , $loader: document.querySelector('#loader')
  , $btnRestart: document.querySelector('#btnRestart')
  , $btnShare: document.querySelector('#btnShare')
  , $share: document.querySelector('#share')
  , $btnClose: document.querySelector('#btnClose')
  };
  var game = '';
  var oConfig = window.oPageConfig;
  var oPage = {
    init: function() {
      this.view();
      this.listen();
    }
  , view: function() {
      var self = this;
      new preload({
        'items': window.oPageConfig.aImgItems
      , 'prefix': window.oPageConfig.sPrefix
      , 'callback': function() {
          game = new _game();
          window.moneyGame = game;
        }
      });
    }
  , listen: function() {
      var self = this;
      ui.$btnRestart.addEventListener('click', function() {
        game.restart();
      }, false);
      ui.$btnClose.addEventListener('touchstart', function() {
        game.restart();
      }, false);
      ui.$btnShare.addEventListener('click', function() {
        ui.$share.style.display = 'block';
      }, false);
      ui.$share.addEventListener('touchstart', function() {
        ui.$share.style.display = 'none';
      }, false);
    }

  };
  oPage.init();
})();