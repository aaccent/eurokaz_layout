import { isDesktop } from 'globals/adaptive'

void (function () {
    const cases = document.querySelectorAll<HTMLElement>('.cases__item')

    cases.forEach((item) => {
        if (isDesktop) {
            item.addEventListener('mouseenter', () => {
                const dataItem = item.dataset.item
                const content = document.querySelector(`.cases__item-content[data-content='${dataItem}']`)
                content?.classList.add('_visible')
            })

            item.addEventListener('mouseleave', () => {
                const activeContent = document.querySelector(`.cases__item-content._visible`)
                activeContent?.classList.remove('_visible')
            })
        } else {
            const arrow = item.querySelector('.cases__item-arrow')
            arrow?.addEventListener('click', () => {
                document.querySelector('.cases__item-content._visible')?.classList.remove('_visible')

                item.querySelector('.cases__item-content')?.classList.add('_visible')
            })
        }
    })
})()
