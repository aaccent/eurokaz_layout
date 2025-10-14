import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'

void (function () {
    const sliderSwiper = document.querySelector<HTMLElement>('.slider .swiper')
    if (!sliderSwiper) return

    new Swiper(sliderSwiper, {
        slidesPerView: 1.3,
        spaceBetween: 10,
        modules: [Navigation, Pagination],
        navigation: {
            prevEl: '.slider__nav-prev',
            nextEl: '.slider__nav-next',
        },
        pagination: {
            el: '.slider__pag',
            type: 'bullets',
        },

        breakpoints: {
            1000: {
                slidesPerView: 3,
                spaceBetween: 20,
                pagination: {
                    type: 'fraction',
                },
            },
        },
    })
})()
