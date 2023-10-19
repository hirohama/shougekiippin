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



//---------------product時ヘッダードロワーメニュー、レイアウト調整など

if($('#draw_product_menu').length){

    /*------------------ヘッダードロワーメニュー-----------------------*/
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
    /*------------------ヘッダードロワーメニューここまで-----------------------*/
    /*------------------レイアウト調整-----------------------*/
    function layout_tablet(){/*タブレットサイト用レイアウト*/

        var read_block_cross_padding_per=7;/*写真にかかる部分の高さ(%)*/
        var chef_photo_left_per=7;/*シェフ写真左余白(%)*/
        var winsize=$("#product_outline_1").width();
        var chef_photo=$("#chef_photo");
        var chef_photo_box={
            h:chef_photo.outerHeight(),
            w:chef_photo.outerWidth()
        }
        var read_block=$("#product_outline_1");
        var read=read_block.find(".outline_1_title");
        var read_box={
            h:read.outerHeight(),
            w:read.outerWidth()
        }
        var one_percent=winsize/100;

        var chef_photo_left=one_percent*chef_photo_left_per;
            chef_photo.css("left",chef_photo_left+"px");//シェフ写真の位置決定

        var chef_photo_right=winsize-chef_photo_left-chef_photo_box.w;/*写真の横の余白*/

        var read_block_cross_padding=one_percent*read_block_cross_padding_per;/*写真にかかる部分の高さ*/
        var read_top;
            read_top=((chef_photo_box.h-read_box.h)/2-read_block_cross_padding);
        
        //console.log("read_top"+read_top);
        var read_right=(chef_photo_right-read_box.w)/2;
            read.css({"top":read_top+"px","right":read_right+"px"});
        var read_block_top_padding=chef_photo_box.h-read_block_cross_padding;
            read_block.css("padding-top",read_block_top_padding+"px");
    }
    function layout_tablet_clear(){
        var chef_photo=$("#chef_photo");
        var read_block=$("#product_outline_1");
        var read=read_block.find(".outline_1_title");
        chef_photo.attr("style","");
        read_block.attr("style","");
        read.attr("style","");
    }

    function layout_smp(){/*スマホサイト用レイアウト*/

        var img_photo=$("#image_photo");
        var chef_photo2=$("#chef_photo2");
        var section_title=$("#product_outline_2_2").find("h2");
        var section_text=$("#outline_2_text");
        var spacer=$("#product_outline_whitebox");
        var h;

        var img_photo_height=img_photo.outerHeight(true);
        chef_photo2.css("top",img_photo_height+"px");/*chef_photo2*/
        var chef_photo2_height=chef_photo2.outerHeight(true);
        h=img_photo_height+chef_photo2_height;
        section_title.css("top",h+"px");
        var section_title_height=section_title.outerHeight(true);
        h+=section_title_height;
        section_text.css("top",h+"px");
        var section_text_height=section_text.outerHeight(true);
        h+=section_text_height;
        spacer.css("height",h+"px");
    }
    function layout_smp_clear(){
        var chef_photo2=$("#chef_photo2");
        var style_onload=chef_photo2.attr("style");
        var section_title=$("#product_outline_2_2").find("h2");
        var section_text=$("#outline_2_text");
        chef_photo2.attr("style",style_onload);//背景画像なので、保管したものを出す
        section_title.attr("style","");
        section_text.attr("style","");

    }

    $(window).on('load resize', function () {
        if(window.matchMedia("(max-width:1023px)").matches&&window.matchMedia("(min-width:640px)").matches){
            layout_smp_clear();
            layout_tablet();
        }else if(window.matchMedia("(max-width:639px)").matches){
            layout_tablet_clear();
            layout_smp();
        }else{
            layout_smp_clear();
            layout_tablet_clear();
        }
    });
    draw_menu_btn.click(function(){
        draw_menu_container.toggleClass("active");
        drawer_menu_check();
    });


    /*--------------レイアウト調整-------------*/

}
//---------------product時ヘッダードロワーメニュー、レイアウト調整などここまで

//---------------indexスライダーアニメーション
if($('#slider').length){
    $('#slider').slick({
      slidesToShow: 3,/*centerModeの場合は、奇数で整数を指定する*/
      slidesToScroll: 1,
      arrows:true,
      autoplay: false,
      dots: false,
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
if($('.feature_list').length){
      $('.feature_list').owlCarousel({
        loop:false,
        nav:true,
        responsive:{
            0:{
                items:2
            },
            640:{
                items:3
            },
            1024:{
                items:4
            }
        }
    });
}
//----------特集商品リストスライダーここまで

//--------------SVGのパスをランダムで返す関数
const SVGPath=[
    "M44.6,-76.8C58.6,-69.2,71.3,-58.9,78.6,-45.6C85.8,-32.4,87.4,-16.2,87.4,0C87.5,16.2,85.8,32.4,78.6,45.6C71.3,58.8,58.5,69,44.5,75.8C30.5,82.5,15.2,85.9,0.3,85.4C-14.6,84.8,-29.2,80.3,-42,72.8C-54.8,65.3,-65.9,54.9,-74.1,42.3C-82.3,29.6,-87.5,14.8,-88.4,-0.5C-89.3,-15.8,-85.7,-31.6,-78.5,-45.9C-71.3,-60.1,-60.3,-72.8,-46.6,-80.5C-32.9,-88.3,-16.4,-91.2,-0.6,-90.2C15.3,-89.2,30.6,-84.3,44.6,-76.8Z",
    "M43.5,-75.6C56.8,-67.6,68.3,-56.8,76.4,-43.8C84.4,-30.8,88.8,-15.4,89.2,0.2C89.6,15.8,86,31.7,77.8,44.4C69.6,57.2,56.9,66.9,43.2,74C29.5,81.1,14.7,85.6,-0.6,86.6C-15.9,87.6,-31.7,85,-46.1,78.3C-60.5,71.6,-73.4,60.7,-80.8,46.9C-88.2,33.2,-90.2,16.6,-88.8,0.8C-87.4,-15,-82.5,-29.9,-75.3,-44.1C-68.1,-58.2,-58.6,-71.5,-45.6,-79.7C-32.6,-87.9,-16.3,-91,-0.6,-89.9C15.1,-88.9,30.1,-83.6,43.5,-75.6Z",
    "M43.5,-73.6C57.9,-67.1,72,-58.4,80.6,-45.8C89.2,-33.2,92.2,-16.6,90.6,-0.9C88.9,14.7,82.7,29.4,74.8,43.2C66.9,57,57.3,69.8,44.5,78.5C31.8,87.3,15.9,91.9,0.3,91.5C-15.4,91,-30.8,85.5,-43.8,76.9C-56.8,68.3,-67.4,56.7,-76,43.3C-84.6,30,-91.2,15,-91.5,-0.2C-91.8,-15.3,-85.7,-30.7,-77.7,-45C-69.7,-59.4,-59.8,-72.9,-46.5,-79.9C-33.2,-87,-16.6,-87.7,-1,-85.9C14.6,-84.2,29.2,-80,43.5,-73.6Z",
    "M43.9,-76.2C57.4,-68.3,69.2,-57.5,77.9,-44.4C86.6,-31.2,92.2,-15.6,92.8,0.3C93.3,16.2,88.8,32.5,80.7,46.6C72.5,60.7,60.8,72.8,46.7,80.5C32.6,88.3,16.3,91.7,-0.1,91.9C-16.5,92,-32.9,88.8,-46.2,80.6C-59.5,72.4,-69.7,59.2,-77.9,45C-86.2,30.7,-92.6,15.4,-92.6,0C-92.6,-15.3,-86.1,-30.7,-77.6,-44.4C-69,-58.2,-58.4,-70.4,-45.1,-78.5C-31.8,-86.5,-15.9,-90.3,-0.4,-89.7C15.2,-89.1,30.4,-84.1,43.9,-76.2Z",
    "M45.4,-79.7C58.9,-70.9,69.9,-58.8,77.2,-45C84.6,-31.2,88.2,-15.6,88.5,0.2C88.8,15.9,85.7,31.8,78.1,45.1C70.4,58.3,58.2,68.9,44.4,77.4C30.6,85.9,15.3,92.3,-0.5,93.1C-16.2,93.9,-32.4,89.1,-45.3,80.1C-58.2,71,-67.8,57.9,-74.7,43.8C-81.5,29.8,-85.7,14.9,-87,-0.7C-88.2,-16.4,-86.6,-32.7,-79.1,-45.5C-71.5,-58.3,-57.9,-67.6,-43.7,-76C-29.6,-84.5,-14.8,-92.2,0.6,-93.2C16,-94.2,31.9,-88.6,45.4,-79.7Z",
    "M46,-78.9C60,-71.7,71.8,-60,79,-46.1C86.2,-32.2,88.9,-16.1,87.8,-0.6C86.7,14.8,81.8,29.6,73.8,42.2C65.8,54.9,54.8,65.3,42,74.4C29.2,83.6,14.6,91.3,-0.3,91.8C-15.2,92.3,-30.3,85.5,-44.7,77.3C-59.1,69.1,-72.6,59.4,-79.7,46.3C-86.7,33.2,-87.2,16.6,-85.8,0.8C-84.4,-15,-81.1,-30,-73.8,-42.6C-66.5,-55.3,-55.2,-65.7,-42.3,-73.4C-29.3,-81.1,-14.6,-86.2,0.7,-87.4C16.1,-88.6,32.1,-86,46,-78.9Z",
    "M46.1,-79C59.9,-72,71.3,-59.8,79.4,-45.8C87.5,-31.8,92.3,-15.9,92.3,0C92.4,16,87.7,31.9,79.2,45.3C70.8,58.7,58.6,69.5,44.7,78C30.9,86.5,15.4,92.7,-0.5,93.6C-16.5,94.6,-33.1,90.3,-46.3,81.4C-59.5,72.5,-69.3,59.1,-77.1,44.8C-84.9,30.5,-90.7,15.2,-90.9,-0.1C-91,-15.4,-85.4,-30.7,-77,-44C-68.6,-57.3,-57.3,-68.5,-44,-75.8C-30.7,-83.1,-15.3,-86.5,0.4,-87.3C16.2,-88,32.4,-86,46.1,-79",
    "M44.5,-75.3C58.7,-68.8,72.2,-59.1,80.4,-46C88.7,-32.9,91.8,-16.5,91.3,-0.3C90.8,15.9,86.7,31.8,78.6,45.1C70.4,58.3,58.2,69,44.4,75.7C30.6,82.4,15.3,85.3,-0.3,85.7C-15.8,86.1,-31.7,84.2,-44.4,76.9C-57.2,69.6,-67,56.9,-73.7,43.2C-80.4,29.5,-84,14.8,-84.9,-0.5C-85.7,-15.7,-83.8,-31.5,-77.2,-45.4C-70.6,-59.2,-59.3,-71.2,-45.7,-78.2C-32,-85.1,-16,-87,-0.5,-86.2C15.1,-85.4,30.2,-81.9,44.5,-75.3Z",
    "M43.5,-75.4C57.3,-67.4,70,-57.5,78.2,-44.7C86.5,-31.8,90.4,-15.9,89.6,-0.4C88.9,15,83.4,30,75.9,44.2C68.4,58.4,58.7,71.7,45.7,79.8C32.7,87.9,16.4,90.8,-0.1,90.9C-16.5,91.1,-33,88.4,-46.7,80.7C-60.4,73,-71.4,60.3,-78,46C-84.7,31.7,-87.1,15.8,-86.4,0.4C-85.7,-15,-81.9,-30.1,-74.7,-43.4C-67.4,-56.7,-56.8,-68.3,-43.7,-76.7C-30.7,-85.2,-15.4,-90.6,-0.3,-90.2C14.9,-89.7,29.7,-83.5,43.5,-75.4Z",
    "M44.6,-77.1C57.6,-69.8,67.8,-57.4,76,-43.7C84.2,-30,90.3,-15,91.1,0.5C91.9,16,87.5,32,78.9,45C70.4,58,57.7,68.1,43.9,75C30.1,81.9,15,85.7,0.1,85.6C-14.9,85.6,-29.8,81.5,-43.6,74.6C-57.3,67.6,-69.9,57.6,-77.6,44.7C-85.2,31.7,-88.1,15.9,-87.2,0.5C-86.3,-14.8,-81.7,-29.7,-74.1,-42.9C-66.6,-56.1,-56.2,-67.6,-43.3,-75C-30.5,-82.5,-15.2,-85.8,0.3,-86.3C15.8,-86.8,31.6,-84.5,44.6,-77.1Z",
    "M44.1,-75.9C57.8,-68.5,70.1,-58,78.2,-44.9C86.2,-31.7,90.1,-15.9,89.3,-0.4C88.5,15,83.1,29.9,75.8,44.3C68.4,58.7,59.1,72.4,46.1,80.7C33.2,88.9,16.6,91.5,0.6,90.5C-15.4,89.4,-30.8,84.7,-45,77.2C-59.2,69.7,-72.2,59.5,-79.4,46.1C-86.5,32.8,-87.8,16.4,-87.2,0.3C-86.6,-15.7,-84.1,-31.4,-77.1,-44.9C-70,-58.3,-58.3,-69.5,-44.7,-77C-31,-84.5,-15.5,-88.3,-0.2,-88C15.2,-87.7,30.4,-83.3,44.1,-75.9Z"
];

if($('.clipNum_fromScript').length){
    $('.clipNum_fromScript').each(function(){
      console.log("aaa")
    var r=Math.round(Math.random()*(SVGPath.length-1));
        $(this).find("path").attr("d",SVGPath[r]);
    })
}
//--------------SVGのパスをランダムで返す関数ここまで
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