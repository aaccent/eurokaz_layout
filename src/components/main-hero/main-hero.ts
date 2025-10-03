import Swiper from 'swiper'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'

void (function () {
    const mainHeroSlider = document.querySelector<HTMLElement>('.main-hero.swiper')
    if (!mainHeroSlider) return
    new Swiper(mainHeroSlider, {
        modules: [Autoplay, EffectFade, Pagination, Navigation],
        effect: 'fade',
        slidesPerView: 1,
        loop: true,
        fadeEffect: {
            crossFade: true,
        },
        autoplay: {
            delay: 3000,
        },
        allowTouchMove: false,
        pagination: {
            el: '.main-hero__pagination',
            clickable: true,
            bulletClass: 'main-hero__pagination-square',
            bulletActiveClass: '_active',
        },

        navigation: {
            prevEl: '.main-hero__navigation-prev',
            nextEl: '.main-hero__navigation-next',
        },
    })
})()
