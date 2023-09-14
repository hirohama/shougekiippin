$(function(){
    console.log("onReady");
    var headNav = $("header");
    var scrollNum = 700;
      //scrollだけだと読み込み時困るのでloadも追加
      $(window).on('load scroll', function () {
        //現在の位置が500px以上かつ、クラスfixedが付与されていない時
        if($(this).scrollTop() > scrollNum && headNav.hasClass('fixed') == false) {
          headNav.css({"top": '-100px'}).removeClass('absolute').addClass('fixed').animate({"top": 0},600);
        }else if($(this).scrollTop() < scrollNum && headNav.hasClass('fixed') == true){
          headNav.not(":animated").animate({"top": -100},150, function() {
            headNav.removeClass('fixed').addClass('absolute').css({"top": '0'});
          })
        }
      });


    //スライダーアニメーション
    $('#slider').slick({slidesToShow: 3,
      slidesToScroll: 1,
      arrows:false,
      autoplay: true,
      dots: true,
      autoplaySpeed: 4000,
      speed:600});
    const tl = gsap.timeline()
        .to(".pNoren", {
            duration: 0.5,
            ease: "power3.in",
            attr:{d:"M0,0V30.85c0,116,13,259,13,259H492.1c-10.1-72-9.45-134,0-258.9V.2H0"}
        }).to(".pNoren", {
            duration: 0.2,
            ease: "power1.out",
            attr:{d:"M0,0V30.85c-5,178,0,259,0,259H480c8.72-39,7-76,12.1-258.85V.2H0"}
        }).to(".pNoren", {
            duration: 1,
            ease:"elastic.out",
            attr:{d:"M0,0V30.8c0-4.6,1.8,259.1,1.8,259.1H489.2c3.3-75.7,2.9-210.5,2.9-258.9V.2H0"}
        });
    $("a").click(function(){
        tl.restart();
    });
    $('#slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        tl.restart();
    });

    //フェードインアニメーション
    $(window).scroll(function (){
        $('.fadein').each(function(){
            var position = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > position - windowHeight + 200){
              $(this).addClass('active');
            }
        });
    });

    //個数入力
    var number,total_numner;
    var max = 50; //合計最大数
    var $input = $('.count .number'); //カウントする箇所
    var $plus = $('.count .plus'); //アップボタン
    var $minus = $('.count .minus'); //ダウンボタン
    //合計カウント用関数
    function total() {
        total_numner = 0;
        $input.each(function(val) {
            val = Number($(this).val());
            total_numner += val;
        });
        return total_numner;
    }
    //ロード時
    $(window).on('load', function() {
        console.log("count");
        $input.each(function() {
            number = Number($(this).val());
            if (number == max) {
                $(this).next($plus).prop("disabled", true);
            } else if (number == 0) {
                $(this).prev($minus).prop("disabled", true);
            }
        });
        total();
        if (total_numner == max) {
            $plus.prop("disabled", true);
        } else {
            $plus.prop("disabled", false);
        }
    });
    //ダウンボタンクリック時
    $minus.on('click', function() {
        total();
        number = Number($(this).next($input).val());
        if (number > 0) {
            $(this).next($input).val(number - 1);
            if ((number - 1) == 0) {
            $(this).prop("disabled", true);
            }
            $(this).next().next($plus).prop("disabled", false);
        } else {
            $(this).prop("disabled", true);
        }
        total();
        if (total_numner < max) {
            $plus.prop("disabled", false);
        }
    });
    //アップボタンクリック時
    $plus.on('click', function() {
        number = Number($(this).prev($input).val());
        if (number < max) {
            $(this).prev($input).val(number + 1);
            if ((number + 1) == max) {
            $(this).prop("disabled", true);
            }
            $(this).prev().prev($minus).prop("disabled", false);
        } else {
            $(this).prop("disabled", true);
        }
        total();
        if (total_numner == max) {
            $plus.prop("disabled", true);
        } else {
            $plus.prop("disabled", false);
        }
    });
});