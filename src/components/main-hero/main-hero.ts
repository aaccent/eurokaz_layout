import Swiper from 'swiper'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { gsap } from 'gsap'
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
        // autoplay: {
        //     delay: 3000,
        // },
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

    const mainHeroContent = mainHeroSlider.querySelector('.main-hero__slide-content')
    console.log(mainHeroContent)
    if (!mainHeroContent) return

    gsap.to('.main-hero__slide-content', { rotation: 27, x: 100, duration: 1 })
})()
