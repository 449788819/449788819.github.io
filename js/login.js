$.fn.extend({
  tab: function () {
    var tabBox = $(this);
    var tabTitle = tabBox.find('.tab-title-item');
    var tabItem = tabBox.find('.tab-content-item');
    tabTitle.on('click', function () {
      var index = $(this).index();
      $(this).addClass('active').siblings().removeClass('active');
      tabItem.eq(index).addClass('active').siblings().removeClass('active');
    })
  }
})

$('#login-form').tab();

$('#imgbox').on('mouseenter', function () {
  var $this = $(this);
  var qrcode = $this.find('.imgbox-qrcode');
  var phone = $this.find('.imgbox-phone');
  console.log(123)
    qrcode.stop();
    qrcode.animate({
      left: 20
    }, function () {
      phone.addClass('active');
    })
})
$('#imgbox').on('mouseleave', function () {
  var $this = $(this);
  var qrcode = $this.find('.imgbox-qrcode');
  var phone = $this.find('.imgbox-phone');
    phone.removeClass('active');
    qrcode.stop();
    qrcode.animate({
      left: 84
    })
})

var form = function () {
  var username = '';
  var password = '';
  $('#username').on('focus',function () {
    var $this = $(this);
    var icon = $this.parent().find('label');
    icon.addClass('focus')
  })
  $('#username').on('blur',function () {
    var $this = $(this);
    var icon = $this.parent().find('label');
    username = $this.val();
    
    icon.removeClass('focus')
    
  })
  
  $('#password').on('focus',function () {
    var $this = $(this);
    var icon = $this.parent().find('label');
    icon.addClass('focus')
  })
  $('#password').on('blur',function () {
    var $this = $(this);
    var icon = $this.parent().find('label');
    password = $this.val();
    icon.removeClass('focus')
  })
  
  $('#submit').on('click', function () {
    var errowBox = $('#msg-box');
    var errowMes = $('#msg-errow');
    if(username == '') {
      errowMes.text('请输入用户名');
      errowBox.animate({
        opacity:1
      });
    }
    else if(password == ''){
      errowMes.text('请输入密码');
      errowBox.animate({
        opcity:1
      });
    }
    else {
      window.sessionStorage.setItem('usename',username);
      window.location.href='index.html';
    }
  })
  
}

form();