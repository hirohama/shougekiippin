



function submitContactForm(event) {
      event.preventDefault()
      const form = document.getElementById("ContactForm")
      const email = document.getElementById("ContactFormEmail")
      const emailVerify = document.getElementById("ContactFormEmailVerify")
      console.log("eメールテストです");
      if (email.value !== emailVerify.value) {
        email.setCustomValidity("メールアドレスが同一ではありません")
      } else {
        email.setCustomValidity("")
      }
      if (form.reportValidity()) {
        form.submit()
      }
}

$(function(){
//--------------グローバルメニュー（メガメニュー）
    var target=$('menu');
    var megamenu=$('#mega_menu');
    var trigger=$('#menu_btn');
    var menuIsOpen = false;
    trigger.click(function(){
        if(menuIsOpen){//メニューが開いていたら
            target.addClass("close");
            trigger.removeClass("active");
        }else{//メニューが閉まっていたら
            target.removeClass("close");
            trigger.addClass("active");
        }
        console.log(menuIsOpen);
        menuIsOpen = !menuIsOpen;
    });
//--------------グローバルメニュー（メガメニュー）ここまで



//---------------product時ヘッダードロワーメニュー

if($('#draw_product_menu').length){
    var draw_menu_container = $('#draw_product_menu');
    var draw_menu_btn = $('.draw_product_btn');
    var scrollNum = 500;
    var draw_height=0;
    var btn_height=0;
    var draw_menu_height=0
    var draw_menu = false;
    if(draw_menu_container.length){//もし#draw_product_menu_boxがあれば
        draw_menu=true;//あるよと判定
    }
      //scrollだけだと読み込み時困るのでloadも追加

    function drawer_menu_check(){
        draw_menu_active = draw_menu_container.hasClass("active");
        draw_height=draw_menu_container.outerHeight(true);/*全体の高さ*/
        btn_height=draw_menu_btn.outerHeight(true);/*ボタンのみの高さ*/
        draw_menu_height=draw_height-btn_height;
        console.log(draw_height);

        if($(this).scrollTop() > scrollNum&&!draw_menu_active){
            //ドロワーは出ておらず、ボタンを出す高さである
            draw_menu_container.css("top","-"+draw_menu_height+"px");
        }else if($(this).scrollTop() <= scrollNum&&!draw_menu_active){
            //ドロワーは出ておらず、ボタンを出す高さでもない
            draw_menu_container.css("top","-"+draw_height+"px");
        }else if(draw_menu_active){
            draw_menu_container.css("top","0px");
        }
    }
    $(window).on('load scroll resize', function () {
        //現在の位置が"scrollNum"以上
        drawer_menu_check();
    });
    draw_menu_btn.click(function(){
        draw_menu_container.toggleClass("active");
        drawer_menu_check();
    });
}
//---------------product時ヘッダードロワーメニューここまで

//---------------indexスライダーアニメーション
if($('#slider').length){

    $('#slider').slick({slidesToShow: 3,/*centerModeの場合は、奇数で整数を指定する*/
      slidesToScroll: 1,
      arrows:false,
      autoplay: true,
      dots: true,
      autoplaySpeed: 4000,
      speed:600,
      centerMode: "true" });
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
}
//---------------indexスライダーアニメーションここまで

//----------特集商品リストスライダー
$(window).on('load', function() {

    if($('.feature_list').length){

       $('.feature_list').on('init', function(event, slick){
    console.log('init : 初期化しました。');
  });
      
        $('.feature_list').slick({
          arrows:true,
          infinite: false,
          slidesToShow: 4,
          slidesToScroll: 4
        });
    }
});
//----------特集商品リストスライダーここまで

//----------クリックしたら指定した要素に".active"を付与し、兄弟要素から".active"を削る
if($('a.click_to_active').length){
    console.log("click");
    $("a.click_to_active").each(function(){
        $(this).click(function(){
            var act=$(this).attr("name");
            var act_array=String(act).split(",");
            console.log(act_array);
            for (var i = 0; i < act_array.length; i++) {
                var act_siblings=$(act_array[i]).siblings();
                act_siblings.removeClass("active");
                $(act_array[i]).addClass("active");
            }
            return false;
        });
    });
}
//----------クリックしたら指定した要素に".active"を付与し、兄弟要素から".active"を削るここまで

//--------------グローバルメニュー（メガメニュー）

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