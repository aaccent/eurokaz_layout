import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const html = document.documentElement

/**
 * Включает/выключает возможность пролистывать страницу с помощью `overflow`.
 * Добавляет `padding-right` чтобы не "прыгала" страница из-за пропажи полосы.
 * */
export function toggleScroll() {
    html.classList.toggle('disable-scroll')

    html.classList.contains('disable-scroll') ? disableScroll() : enableScroll()
}

/**
 * Включает возможность пролистывать страницу.
 * Убирает класс `disable-scroll` с `body`
 * */
export function enableScroll() {
    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'
    document.body.style.paddingRight = `0`
    html.classList.remove('disable-scroll')
}

/**
 * Отключает возможность пролистывать страницу с помощью `overflow`.
 * Добавляет `padding-right` чтобы не "прыгала" страница из-за пропажи полосы.
 * Добавляет класс `disable-scroll` на `body`
 * */
export function disableScroll() {
    document.documentElement.style.overflow = 'clip'
    document.body.style.overflow = 'clip'
    document.body.style.paddingRight = `${window.innerWidth - html.offsetWidth}px`
    html.classList.add('disable-scroll')
}

gsap.registerPlugin(ScrollTrigger)
const triggerSections = document.querySelectorAll('.section__trigger')
triggerSections.forEach((section) => {
    const title = section.querySelector('.section__title')
    const subtitle = section.querySelector('.section__subtitle')
    const line = section.querySelector('.line--dashed, .line')
    const content = section.querySelector('.animated-content')

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top bottom-=300',
            //markers: { startColor: 'green', endColor: 'red', fontSize: '12px' },
        },
    })
    tl.addLabel('title')
        .fromTo(title, { y: 100, opacity: 0 }, { y: 0, opacity: 1 })
        .fromTo(subtitle, { y: 100, opacity: 0 }, { y: 0, opacity: 1 })
        .fromTo(line, { width: 0 }, { width: 'var(--container-width)' })
        .addLabel('content')
        .fromTo(content, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, 'title+=1')
})
