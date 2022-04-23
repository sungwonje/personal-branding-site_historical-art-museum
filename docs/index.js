console.clear();

// 스크롤 트리거 플러그인 활성화
gsap.registerPlugin(ScrollTrigger);

// 로딩
$('html').imagesLoaded(function() {
  $('#loading').remove();
});

// 커서
const $cursor = $('.cursor');

$(window).mousemove(function(e) {
  $cursor.css({
    top:e.clientY - 15,
    left:e.clientX - 15
  });
});

// BGM
function Bgm1__play() {
  $(".bgm-player").attr("state", "play");
  $("#bgm").get(0).play();
}

function Bgm1__pause() {
  $(".bgm-player").attr("state", "pause");
  $("#bgm").get(0).pause();
}

function Bgm1__init() {
  $(".bgm-player .btn-pause").click(Bgm1__pause);
  $(".bgm-player .btn-play").click(Bgm1__play);
}

Bgm1__init();

// 탑바
// top-bar 메뉴
$("#top-bar .top-bar_menu > ul > li").click(function () {
  let $this = $(this);
  let index = $(this).index();
  let no = index + 1;

  $this.siblings().removeClass("pressed");
  $this.addClass("pressed");
});

function ActiveBox__init(groupNo, menuLi) {
  setTimeout(function () {
    ActiveBox__start(groupNo, menuLi);
  }, 1000);

  function ActiveBox__start(groupNo, menuLi) {
    const ActiveBox__$box = $(".active-box-group-" + groupNo);
    const ActiveBox__$menuLi = $(menuLi);
    const ActiveBox__offsets = [];
    let ActiveBox__currentActiveIndex = 0;
    const ActiveBox__debounceMillis = 100;

    function _ActiveBox__measureOffset() {
      ActiveBox__offsets.length = 0;

      ActiveBox__$box.each(function (index, node) {
        const $box = $(node);

        const ActiveBox__addiOffset = $box.attr("data-active-box--addi-offset")
          ? parseInt($box.attr("data-active-box--addi-offset"))
          : 0;

        ActiveBox__offsets.push($box.offset().top + ActiveBox__addiOffset);
      });

      _ActiveBox__decideActiveIndex();
    }

    const _ActiveBox__measureOffsetDebounce = _.debounce(
      _ActiveBox__measureOffset,
      ActiveBox__debounceMillis
    );

    function _ActiveBox__decideActiveIndex() {
      const scrollTop = $(window).scrollTop();

      let newActiveIndex = 0;

      for (let i = ActiveBox__offsets.length - 1; i >= 0; i--) {
        if (scrollTop >= ActiveBox__offsets[i]) {
          newActiveIndex = i;
          break;
        }
      }

      if (ActiveBox__currentActiveIndex != newActiveIndex) {
        ActiveBox__$menuLi.removeClass("pressed");
        ActiveBox__$menuLi.eq(newActiveIndex).addClass("pressed");
        ActiveBox__currentActiveIndex = newActiveIndex;
      }
    }

    const _ActiveBox__decideActiveIndexDebounce = _.debounce(
      _ActiveBox__decideActiveIndex,
      ActiveBox__debounceMillis
    );

    $(window).resize(_ActiveBox__measureOffsetDebounce);
    $(window).scroll(_ActiveBox__decideActiveIndexDebounce);
    _ActiveBox__measureOffsetDebounce();
  }
}

ActiveBox__init(1, "#top-bar .top-bar_menu > ul > li");

// 탑바 라이트 & 다크 토글
$(".section-dark").each(function (index, node) {
  ScrollTrigger.create({
    trigger: node,
    //markers: true,
    start: "top top+=50",
    end: "bottom top",
    scrub: true,
    onEnter: () => $(".top-bar").addClass("dark"),
    onLeave: () => $(".top-bar").removeClass("dark"),
    onEnterBack: () => $(".top-bar").addClass("dark"),
    onLeaveBack: () => $(".top-bar").removeClass("dark")
  });
});

$(".section-transparent").each(function (index, node) {
  ScrollTrigger.create({
    trigger: node,
    //markers: true,
    start: "top top+=50",
    end: "bottom top",
    scrub: true,
    onEnter: () => $(".top-bar").addClass("transparent"),
    onLeave: () => $(".top-bar").removeClass("transparent"),
    onEnterBack: () => $(".top-bar").addClass("transparent"),
    onLeaveBack: () => $(".top-bar").removeClass("transparent")
  });
});

// 스크롤업 버튼 라이트&다크 토글
$(".section-dark").each(function (index, node) {
  ScrollTrigger.create({
    trigger: node,
    //markers: true,
    start: "top bottom",
    end: "bottom bottom",
    scrub: true,
    onEnter: () => $(".btn-scroll-up").addClass("dark"),
    onLeave: () => $(".btn-scroll-up").removeClass("dark"),
    onEnterBack: () => $(".btn-scroll-up").addClass("dark"),
    onLeaveBack: () => $(".btn-scroll-up").removeClass("dark")
  });
});

$(".section-transparent").each(function (index, node) {
  ScrollTrigger.create({
    trigger: node,
    //markers: true,
    start: "top 50%",
    end: "bottom 50%",
    scrub: true,
    onEnter: () => $(".btn-scroll-up").addClass("transparent"),
    onLeave: () => $(".btn-scroll-up").removeClass("transparent"),
    onEnterBack: () => $(".btn-scroll-up").addClass("transparent"),
    onLeaveBack: () => $(".btn-scroll-up").removeClass("transparent")
  });
});

// 모바일 팝업 메뉴
$("#top-bar .btn-popup").click(function () {
  $("#top-bar .top-bar_popup").addClass("active");
  $(".btn-scroll-up").hide();
});

$("#top-bar .btn-close").click(function () {
  $("#top-bar .top-bar_popup").removeClass("active");
  $(".btn-scroll-up").show();
});

$("#top-bar .popup-menu .body li").click(function () {
  $("#top-bar .top-bar_popup").removeClass("active");
  $(".btn-scroll-up").show();
});

// 홈
// 홈 화면 슬라이드
var swiper = new Swiper(".mySwiper", {
  speed: 1000,
  spaceBetween: 30,
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  loop: "true",
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  }
});

// 포트폴리오
// 슬라이더
function SwiperBox1__init(no) {
  const swiper = new Swiper(`.swiper-box-1-${no} .swiper`, {
    loop: true,
    slidesPerView: 1.000001,
    spaceBetween: 450,
    pagination: {
      el: `.swiper-box-1-${no} .swiper-pagination`,
      type: "progressbar"
    },
    navigation: {
      nextEl: `.swiper-box-1-${no} .swiper-button-next`,
      prevEl: `.swiper-box-1-${no} .swiper-button-prev`
    }
  });
}

SwiperBox1__init(1);
SwiperBox1__init(2);
SwiperBox1__init(3);
