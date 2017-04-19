$(function() {
	//预加载图片
	var loadingImgs = ["img/activity_rule.png", "img/bg.jpg", "img/bg2.png", "img/close.png", "img/p1_btns_wrap.png", "img/p1_first.png", "img/p1_from.png", "img/p1_second.png", "img/p1_sub.png", "img/p1_third.png", "img/p2_kuang.png", "img/p2_qian.jpg", "img/p2_scoring.png", "img/p2_shou.png", "img/p2_txt1.png", "img/p2_txt2.png", "img/p2_txt3.png", "img/p2_zhuan.png", "img/p3_acquire.png", "img/p3_again.png", "img/p3_bg.jpg", "img/p3_share.png", "img/p3_share_btn.png", "img/prize.png", "img/qian.png", "img/ranking.png", "img/ranking_bg.png", "img/shiyong.png", "img/shizhong.png", "img/shou.png", "img/start_game.png", "img/tiaozhan.png", "img/yingqu.png"];
	//依次创建img对象,完成预加载
	var img,times = 0; //记录加载成功的图片次数
	for (var i = 0; i < loadingImgs.length; i++) {
		img = new Image();
		img.src = loadingImgs[i];
		img.onload = function() {
			times++;
			//计算百分比
			$('.loading').text(Math.floor(times / loadingImgs.length * 100) + '%');
			if (times == loadingImgs.length) {
				//加载完成 隐藏加载页面
				$('.loading_wrap').hide();
				$('#page1').show();

			}

		}
	}
	//第一界面
	//单击开始按钮
	$(".start").on("touchstart", function() {
		//		$(".user_alert").show();
		//		$(".submit_btn").on("touchend", function() {
		//跳转到第二界面

		//			$(this).parent().parent().hide();
		$(this).parent().hide();
		$('#page1').hide();
		$('#page2').show();
		page_two();
		//用户数据
		userData();

		//		});

	});
	//关闭提示框
	$('.close').on('touchend', function() {
			$(this).parent().hide();
		})
		//底部菜单栏
	$('.rank').on('touchend', function() {
		$('.rank_alert').show();
	})
	$('.rule').on('touchend', function() {
		$('.rule_alert').show();
	})
	$('.prize').on('touchend', function() {
		$('.prize_alert').show();
	});
	$('.explain').on('touchend', function() {
		$('.explain_alert').show();
	});

	//第二页面
	//变换的标题
	//存储图片
	var imgI = 0,
		txtTimer,
		gameStart = false,
		moneyNum = 0,
		str,
		timer,
		time,
		spread;

	function page_two() {
		txtTimer = setInterval(function() {
			imgI++;
			imgnum = imgI % 3 + 1
			$(".textTalk").attr("src", 'img/p2_txt' + imgnum + '.png')
		}, 1000);
		//单手指向上滑动开始数钱
		spread = 0;
		$("#money_wrap").on("swipeup", function(eve) {
			//禁止系统自带事件
			eve.preventDefault();
			spread++;
			//开始游戏 倒计时开启
			downTime(10);
			$("<img>").addClass('money animated fadeOutUpBig').attr('src', "img/p2_qian.jpg").appendTo($("#money_wrap"));
			setTimeout(function() {
				$('.fadeOutUpBig').remove();
			}, 330);
			moneyNum = "00" + spread;
			str = moneyNum.substr(-3);
			//显示分数
			$('.count_num').eq(0).html(str[0]);
			$('.count_num').eq(1).html(str[1]);
			$('.count_num').eq(2).html(str[2]);
		});
	}

	//倒计时函数

	function downTime(time) {
		if (gameStart == false) {
			gameStart = true;
			$('.time_clock').text(time);
			timer = setInterval(function() {
				time--;
				$('.time_clock').text(time);
				if (time == 0) {
					//当时间等于0是当前界面消失,第三界面显示
					//初始化
					clearInterval(timer);
					clearInterval(txtTimer);
					$('#page2').hide();
					$('#page3').show();
					page3Event();
					gameStart = false;
				}

			}, 1000);
		}

	}

	//第三界面
	//获取第二界面的数据 并在该界面显示
	function page3Event() {
		//数的总钱数
		$('#result_money').text('¥' + (spread) * 100);
		$('#best_sum').text((spread) * 100);
		if (spread > 30 && spread < 35) {
			$('#best_rank').text(5);
		} else if (spread > 35 && spread < 40) {
			$('#best_rank').text(3);
		} else if (spread > 40) {
			$('#best_rank').text(2);
		}
		//再来一次
		$('.again').on("touchend", function() {
			$('#page3').hide();
			$('#page2').show();
			$('.count_num').text("0");
			$('.time_clock').text("10");
			spread = 0;

		});
		//分享
		$('.share').on('touchend', function() {
			$('.share_laert').show().on('touchend', function() {
				$(this).hide();
			});
			$(".share_btn").on('touchend', function() {

			})
		})
	}

	//					获取用户数据	
	var userNm, userPo, userID;
function userData() {
		userNm = $('.user_name').val();
		userPo = $('.user_phone').val();
		userID = $('.user_address').val();
		localStorage.setItem("name", userNm);
		localStorage.setItem("phone", userPo);
		localStorage.setItem("ID", userID);
	}

});