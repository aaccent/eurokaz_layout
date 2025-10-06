import { isDesktop } from 'globals/adaptive'

void (function () {
    const decor = document.querySelector<HTMLElement>('.about-block__decor-inner')
    if (!decor) return

    if (isDesktop) {
        Array.from({ length: 64 }).forEach((_, index) => {
            if (index === 16 || index === 32 || index === 48) {
                const div = document.createElement('div')
                const span = document.createElement('span')
                div.append(span)
                decor.append(div)
            } else {
                const span = document.createElement('span')
                decor.append(span)
            }
        })
    } else {
        const decorBottom = document.querySelectorAll('.about-block__numbers-decor')

        decorBottom.forEach((decor) => {
            Array.from({ length: 13 }).forEach((_, index) => {
                if (index === 0) {
                    const div = document.createElement('div')
                    const span = document.createElement('span')
                    div.append(span)
                    decor.append(div)
                } else {
                    const span = document.createElement('span')
                    decor.append(span)
                }
            })
        })
    }
})()
