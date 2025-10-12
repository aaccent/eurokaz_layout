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
            crossFade: false,
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

        on: {
            init: () => {
                const content = mainHeroSlider.querySelector<HTMLElement>(
                    '.swiper-slide-active .main-hero__slide-content',
                )
                if (!content) return
                animateSlideContent(content)
            },
            slideChangeTransitionStart: () => {
                const content = mainHeroSlider.querySelector<HTMLElement>(
                    '.swiper-slide-active .main-hero__slide-content',
                )
                if (!content) return
                animateSlideContent(content)
            },
        },
    })
})()

function animateSlideContent(content: HTMLElement) {
    const title = content.querySelector('.main-hero__slide-title')
    const description = content.querySelector('.main-hero__slide-description')
    const line = content.querySelector('.line')
    gsap.fromTo(line, { width: 0 }, { width: '100%', duration: 1 })

    const tl = gsap.timeline()
    tl.fromTo(title, { opacity: 0, y: 100 }, { opacity: 1, duration: 1, y: 0 }).fromTo(
        description,
        { opacity: 0, y: 100 },
        { opacity: 1, duration: 1, y: 0 },
    )
}
