$.fn.extend({
  // tab栏
  tab: function () {
    var tabBox = $(this);
    var tabTitle = tabBox.find('.tab-title-item');
    var tabItem = tabBox.find('.tab-content-item');
    tabTitle.on('mouseenter', function () {
      var index = $(this).attr('index');
      $(this).addClass('active').siblings().removeClass('active');
      tabItem.eq(index).addClass('active').siblings().removeClass('active');
    })
    tabTitle.each(function (i, v) {
      $(this).attr('index',i)
    })
  },
  // 淡入淡出式轮播图(参数1是要显示图片的个数,[参数2是换图间隔的时间])
  slider: function (number, T) {
    var sliderBox = $(this);
    var sliderList = sliderBox.find('.slider-item');
    var prev = sliderBox.find(' .slider-control-prev');
    var sliderControl = sliderBox.find('.slider-control');
    var next = sliderBox.find(' .slider-control-next');
    var indicatorBtn = sliderBox.find(' .indicator-btn');
    var index = 0;
    var timer = null;
    var time = T ? T : 3000;
    autoPlay();
    
    function autoPlay() {
      timer = setInterval(nextFn, time)
    }
    
    //鼠标进入停止自动轮播
    sliderBox.on('mouseenter', function () {
      if (sliderControl) {
        sliderControl.show();
      }
      clearInterval(timer);
    })
    //鼠标离开继续自动轮播
    sliderBox.on('mouseleave', function () {
      if (sliderControl) {
        sliderControl.hide();
      }
      autoPlay();
    })
    //前后鼠标点播
    prev.on('click', prevFn)
    next.on('click', nextFn)
    //小圆点控制器鼠标进入选择显示;
    indicatorBtn.on('mouseenter', function () {
      index = $(this).index();
      MyShow();
    })
    
    function nextFn() {
      index++;
      if (index > number) {
        index = 0;
      }
      MyShow();
    }
    
    function prevFn() {
      index--;
      if (index < 0) {
        index = number;
      }
      MyShow();
    }
    
    function MyShow() {
      sliderList.eq(index).fadeIn().siblings().fadeOut();
      indicatorBtn.removeClass('active').eq(index).addClass('active');
    }
    
  },
  // 左右移动式轮播(参数1是要显示图片的个数,[参数3是换图间隔的时间])
  //[参数2为是否自动轮播,true|false]
  sliderB: function (number, bool, T) {
    var sliderContainer = $(this);
    var sliderList = $(sliderContainer).find('.slider-list');
    var sliderIndicatorList = $(sliderContainer).find('.indicator-btn');
    var prev = $(sliderContainer).find('.slider-control-prev');
    var next = $(sliderContainer).find('.slider-control-next');
    var width = $(sliderContainer).width();
    var timer = null;
    var index = 1;
    var distance = 0;
    var time = T ? T : 3000;
    var flag = true;
    if (bool == false) {
      flag = false;
    }
    if (flag) {
      autoPlay();
    }
    sliderContainer.on('mouseenter', function () {
      clearInterval(timer);
      prev.show();
      next.show();
    })
    sliderContainer.on('mouseleave', function () {
      if (flag) {
        autoPlay();
      }
      prev.hide();
      next.hide();
    })
    next.on('click', forAutoPlay);
    prev.on('click', forPrev);
    sliderIndicatorList.on('mouseenter', forIndicator);
    
    function autoPlay() {
      timer = setInterval(forAutoPlay, time);
    }
    
    function forPrev() {
      index--;
      if (index < 1) {
        index = number;
        var value = (number + 1) * width * -1
        $(sliderList).css('left', value);
      }
      MySlider();
    }
    
    function forIndicator() {
      index = $(this).index() + 1;
      MySlider();
    }
    
    function forAutoPlay() {
      index++;
      if (index > number) {
        sliderList.css('left', 0)
        index = 1
      }
      MySlider();
    }
    
    function MySlider() {
      distance = width * index * -1;
      sliderList.animate({
        left: distance
      }, 300)
      sliderIndicatorList.removeClass('active').eq(index - 1).addClass('active');
    }
  },
  scrollEnd : function(callback, timeout) {
    $(this).scroll(function(){
      var $this = $(this);
      if ($this.data('scrollTimeout')) {
        clearTimeout($this.data('scrollTimeout'));
      }
      $this.data('scrollTimeout', setTimeout(callback,timeout));
    });
  }
  
})


$(window).on('scroll', function () {
  var scrollTop = $(document).scrollTop();
  if (scrollTop > 650) {
    $('#jd-search').addClass('fixed');
  } else {
    $('#jd-search').removeClass('fixed');
  }
  if (scrollTop > 1750) {
    $('#jd-lift').addClass('fixed');
  } else {
    $('#jd-lift').removeClass('fixed');
  }
})

$(function () {
  
  //关闭顶部广告栏
  $('#top-banner i').on('click', function () {
    $('#top-banner').fadeOut();
  })
  
  // 顶部导航条
  var arr = ['#jd-top-city', '#jd-top-myjd', '#jd-top-service', '#jd-top-nav', '#jd-top-mobile', '#jd-shoping-car'];
  $.each(arr, function (k, v) {
    $(v).on('mouseenter', function () {
      $(this).addClass('hover');
    });
    $(v).on('mouseleave', function () {
      $(this).removeClass('hover');
    });
  });
  $('#top-city-list').on('click', function (e) {
    var ele = $(e.target);
    var text = ele.text();
    ele.addClass('active').parent().siblings().find('a').removeClass('active');
    window.sessionStorage.setItem('city',text);
    window.location.href='index.html';
  });
  
  // 左侧菜单
  $('#cate_menu li').on('mouseenter', function () {
    var index = $(this).index()
    $(this).addClass('active').siblings().removeClass('active');
    $('#sub-menu').show();
    $('#sub-menu>div').eq(index).show().siblings().hide();
  });
  $('.category').on('mouseleave', function () {
    $('#cate_menu li').removeClass('active');
    $('#sub-menu').hide();
    $('#sub-menu>div').hide();
  });
  
  //秒杀倒计时
  function countdown() {
    var totalTime = 10 * 60 * 60;
    var timer = setInterval(function () {
      totalTime--;
      var H = Math.floor(totalTime / 3600);
      var M = Math.floor(totalTime / 60 % 60);
      var S = totalTime % 60;
      H = H >= 10 ? H : '0' + H;
      M = M >= 10 ? M : '0' + M;
      S = S >= 10 ? S : '0' + S;
      $('#jd-seckill-coundown .hour').text(H);
      $('#jd-seckill-coundown .minute').text(M);
      $('#jd-seckill-coundown .second').text(S);
      if (totalTime <= 0) {
        clearInterval(timer);
      }
    }, 1000)
    
  }
  countdown();
  
  // tab栏
  $('#top-tab').tab();
  $('#news-tab').tab();
  //轮播图
  $('#jd-slider').slider(5);
  $('#seckill-slider').slider(1);
  $('#select-slider').slider(2);
  $('#explore-slider').slider(4);
  $('#jd-live-slider').slider(4);
  $('#seckill-sliderB').sliderB(2, false);
  
  
  // 楼层
  var lift = function () {
    var liftIndex = 0;
    $('#jd-lift li').on('click', function () {
      liftIndex = $(this).index();
      var target;
      $(this).addClass('active').siblings().removeClass('active');
      if (liftIndex == 11) {
        target = 0;
      } else {
        target = $('.jd-lift').eq(liftIndex).get(0).offsetTop - 48;
      }
      $('html').animate({
        scrollTop: target
      })
    })

    function liftAddClass() {
      var liftArr = [];
      $('.jd-lift').each(function (i, v) {
        liftArr[i] = {};
        liftArr[i].offsetTop = this.offsetTop;
        liftArr[i].offsetHeight = this.offsetHeight;
      })
      $(window).on('scroll', function () {
        var scrollTop = $(document).scrollTop();
        var screenHeight = $(window).height();
        $.each(liftArr, function (i) {
          var minHeight = this.offsetTop - screenHeight / 2;
          var maxHeight = this.offsetTop + this.offsetHeight - screenHeight / 2;
          if(i == 0 && scrollTop < minHeight){
            return false;
          }
          if (scrollTop > minHeight && scrollTop < maxHeight) {
            liftIndex = i;
            return false;
          }
        })
       console.log(liftIndex)
      })
      $(window).scrollEnd(function () {
        $('#jd-lift li').eq(liftIndex).addClass('active').siblings().removeClass('active');
      },100)
    }

    liftAddClass();

  }
  lift();
  
  
  var login = function () {
  
  }
  login();
});














//
// function myscrollTo(target) {
//   var current = $(document).scrollTop();//当前值
//   var target = target;//目标值
//   var distance = target - current;//需要移动的总距离
//   var totaltime = 300;//500秒完成
//   var interval = 1;//10秒执行一次
//   var number = totaltime / interval;//移动的次数
//   var speed = distance / number;//每次移动的距离;
//
//   function handler() {
//     current = $(document).scrollTop();
//     if (Math.abs(speed) <= Math.abs(target - current)) {
//       current += speed;
//       //window.scrollTo(0, current)
//       $(document).scrollTop(current);
//       setTimeout(handler, interval)
//     } else {
//       //window.scrollTo(0, target)
//       $(document).scrollTop(target);
//     }
//   }
//
//   handler();
// }
