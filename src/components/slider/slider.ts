import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'

void (function () {
    const sliderSwiper = document.querySelector<HTMLElement>('.slider .swiper')
    if (!sliderSwiper) return

    const gallery = sliderSwiper.closest('.gallery')

    new Swiper(sliderSwiper, {
        //autoHeight: true,
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
                slidesPerView: gallery ? 2 : 3,
                spaceBetween: 20,
                pagination: {
                    type: 'fraction',
                },
            },
        },
    })

    const tabs = document.querySelectorAll('.slider__tab-item')
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const activeTab = document.querySelector('.slider__tab-item._active')
            activeTab?.classList.remove('_active')
            tab.classList.add('_active')
        })
    })
})()
