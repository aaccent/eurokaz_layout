import Swiper from 'swiper'

void (function () {
    const header = document.querySelector('header')

    const height = header?.offsetHeight || 0

    document.documentElement.style.setProperty('--header-height', `${height}px`)

    const reverseHeaderColors = document.body.querySelector('.main-hero, .page-hero')
    if (reverseHeaderColors) header?.classList.add('reverse')
})()
