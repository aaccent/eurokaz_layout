import { isDesktop } from 'globals/adaptive'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

    const aboutBlock = document.querySelector('.about-block')
    if (!aboutBlock) return

    gsap.registerPlugin(ScrollTrigger)

    const numbers = aboutBlock.querySelectorAll<HTMLElement>('.about-block__numbers-item span[data-to]')
    numbers.forEach((num) => {
        const final = Number(num.dataset.to) || 50
        const obj = { val: 0 }
        gsap.fromTo(
            obj,
            { val: 0 },
            {
                val: final,
                duration: 1.8,
                ease: 'power2.out',
                onUpdate: () => {
                    num.textContent = Math.round(obj.val).toString()
                },
                scrollTrigger: {
                    trigger: num,
                    start: 'top 80%',
                },
            },
        )
    })
})()
