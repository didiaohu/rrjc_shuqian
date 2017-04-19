/* =============================================
 * v20150209
 * =============================================
 * Copyright 石华
 *
 * 土豪神器
 * ============================================= */
(function() {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                  window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
}());
(function(e) {
  var i = function(n) {
    this.options = n || {};
    this.width;
    this.height;
    this.tempY;
    this.flying;
    this.moneyList = [];
    this.canvas = document.getElementById('mc');
    this.ctx = this.canvas.getContext('2d');
    this.moneyWidth = 250;
    this.moneyHeight = 467;
    this.timer = false;
    this.restTime = 15;
    this.startTime = 0;
    this.start = 0;
    this.$wrap = document.querySelector('#wrap');
    this.$time = document.querySelector('#time');
    this.$area = document.querySelector('#area');
    this.$money = document.querySelector('#money');
    this.$back = document.querySelector('#back');
    this.$audio1 = document.querySelector('#audio1');
    this.$audio2 = document.querySelector('#audio2');
    this.$audio3 = document.querySelector('#audio3');
    this.$audio4 = document.querySelector('#audio4');
    this.$floor1 = document.querySelector('#floor1');
    this.$floor2 = document.querySelector('#floor2');
    this.$hand2 = document.querySelector('#hand2');
    this.$mask = document.querySelector('#mask');
    this.$pop = document.querySelector('#pop');
    this.$score = document.querySelector('#score');
    this.$result = document.querySelector('#result');
    this.SWA = false;
    this.context;
    this._buffer;
    this.soundSource;
    this.curAu = 0;
    this.img = new Image();
    this.callback = this.options.callback || '';
    this.init().bindEvents();
  };
  i.prototype.init = function() {
    var self = this;
    this.canvas.width = this.width = this.$wrap.parentNode.clientWidth;
    this.canvas.height = this.height = this.$wrap.parentNode.clientHeight;
    this.img.src = 'i/money.jpg';
    //初始化声音
    self.loadAudio();
    return this;
  };
  i.prototype.bindEvents = function(e) {
    var self = this;
    'touchstart touchmove touchend'.split(' ').forEach(function(t) {
      self.$wrap.addEventListener(t, self[t].bind(self), false);
    });
  };
  i.prototype.touchstart = function(e) {
    e.preventDefault();
    var touch = e.touches[0];
    var y = touch.pageY;
    this.tempY = touch.pageY;
    this.flying = false;
  };
  i.prototype.touchmove = function(e) {
    var self = this;
    var touch = e.touches[0];
    e.preventDefault();
    if (self.flying || self.start == 3) {
      return false;
    }
    var y = touch.pageY;
    if (self.tempY - y > 10) {
      self.flying = true;
      self.start ? self.addMoney() : self.startGame();
    }
  };
  i.prototype.touchend = function(e) {
    var self = this;
  };
  i.prototype.addMoney = function() {
    var self = this;
    self.playSound();
    if (self.start == 1) {
      self.$hand2.style.display = 'none';
      self.$back.className = 'active';
      self.start++;
    }
    var x = this.width / 2 - self.$money.clientWidth * 0.47;
    var y = this.height - this.moneyHeight;
    var o = {'x': x, 'y': y};
    this.moneyList.push(o);
    self.$score.innerHTML = (+this.moneyList.length) * 100;
    if (!self.timer) {
      self.timer = true;
      self.startTime = +new Date();
      self.restTime = 15;
      self.render();
    }
  };
  i.prototype.startGame = function() {
    var self = this;
    self.start = 1;
    self.playSound();
    self.$floor2.style.display = 'block';
    self.moneyWidth = 237 * (self.$money.clientWidth / 248);
    self.moneyHeight = 533 * (self.$money.clientWidth / 248);
  };
  i.prototype.playSound = function() {
    var self = this;
    var cau = this.curAu;
    var context = this.context;
    if (!self.SWA) {
      //不支持webaudio
      var cau = this.curAu;
      var $au = [this.$audio1, this.$audio2, this.$audio3, this.$audio4];
      $au[cau].play();
      this.curAu == 3 ? this.curAu = 0 : this.curAu++;
    }else {
      //支持webaudio
      var audio = this.context['createBufferSource']();
      audio.buffer = this._buffer;
      audio['connect'](this.context.destination);
      if (audio.start) {
        audio.start(0, 0);
      }else if (audio['noteGrainOn']) {
        var duration = audio.buffer.duration;
        audio['noteGrainOn'](0, 0, duration);
      }else {
        audio['noteOn'](0);
      }
    }
  };
  i.prototype.calOffset = function() {
    var self = window.moneyGame;
    var list = [];
    self.moneyList.forEach(function(i) {
      if (i.y + self.moneyHeight > 0) {
        i.y = i.y - 30;
        list.push(i);
      }
    });
    self.drawing(list);
  };
  i.prototype.drawing = function(list) {
    var self = window.moneyGame;
    self.ctx.clearRect(0, 0, self.width, self.height);
    list.forEach(function(i) {
      self.ctx.drawImage(self.img, i.x, i.y, self.moneyWidth, self.moneyHeight);
    });
  };
  i.prototype.showTime = function() {
    var self = window.moneyGame;
    var cur = +new Date();
    var s = 15 - Math.floor((cur - self.startTime) / 1000);
    if (s != self.restTime) {
      self.restTime--;
      self.$time.innerHTML = self.restTime;
    }
    if (self.restTime != 0) {
      requestAnimationFrame(self.render);
    }else {
      self.finish();
    }
  }
  i.prototype.render = function() {
    var self = window.moneyGame;
    self.calOffset();
    self.showTime();
  };
  i.prototype.restart = function() {
    this.start = 1;
    this.$result.innerHTML = this.$score.innerHTML = 0;
    this.restTime = 15;
    this.moneyList = [];
    this.$time.innerHTML = this.restTime;
    this.$hand2.style.display = 'block';
    this.$mask.style.display = 'none';
    this.$pop.style.display = 'none';
  };
  i.prototype.finish = function() {
    var self = this;
    this.start = 3;
    setTimeout(function() {
      self.ctx.clearRect(0, 0, self.width, self.height);
    }, 100);
    self.timer = false;
    this.$result.innerHTML = this.$score.innerHTML;
    this.$back.className = '';
    this.$mask.style.display = 'block';
    this.$pop.style.display = 'block';
    var sPlatform = window.oPageConfig.sPlatform == ''? '': '在'+ window.oPageConfig.sPlatform + '中';
    var data = {'title': '我'+ sPlatform +'拿了' + this.$score.innerHTML + '元，不服来战！'};
    window.wechatManager(data);
  };
  i.prototype.loadAudio = function() {
    var self = this;
    if (window.AudioContext || window.webkitAudioContext || window.mozAudioContext) {
      this.context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();

      var audioURl = window.oPageConfig.sSoundSrc;
      request = new XMLHttpRequest();
      request.open('GET', audioURl, true);
      request.responseType = 'arraybuffer';
      request.onload = function() {
        self.context['decodeAudioData'](request.response, function(buffer) {
          self._buffer = buffer;
          self.SWA = true;
        });
      };
      request.send();
    }
  }
  window._game = i;
})(this);