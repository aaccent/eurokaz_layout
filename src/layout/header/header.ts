import { isDesktop } from 'globals/adaptive'
import { toggleScroll } from 'features/scroll'

void (function () {
    const header = document.querySelector('header')
    const height = header?.offsetHeight || 0
    document.documentElement.style.setProperty('--header-height', `${height}px`)

    const reverseHeaderColors = document.body.querySelector('.main-hero, .page-hero')
    if (reverseHeaderColors) header?.classList.add('reverse')

    const menuButtons = document.querySelectorAll('.header__menu-button, .header__burger')
    const menu = document.querySelector('.header__menu')

    menuButtons.forEach((button) => {
        if (isDesktop) {
            button.addEventListener('mouseover', () => {
                menu?.classList.add('_opened')
            })

            menu?.addEventListener('mouseleave', () => {
                menu.classList.remove('_opened')
            })
        } else {
            button.addEventListener('click', () => {
                menu?.classList.toggle('_opened')
                reverseHeaderColors && header?.classList.toggle('reverse')
                toggleScroll()
            })
        }
    })

    if (isDesktop) return
    const menuItems = document.querySelectorAll('.header__menu-block:not(:first-child)')

    menuItems.forEach((item) => {
        item.addEventListener('click', () => {
            item.classList.toggle('_opened')
        })
    })
})()
