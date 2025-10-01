import Swiper from 'swiper'

void (function () {
    const mainHeroSlider = document.querySelector<HTMLElement>('.main-hero.swiper')
    console.log(mainHeroSlider)
    if (!mainHeroSlider) return
    new Swiper(mainHeroSlider, {})
})()
