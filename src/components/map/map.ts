import { isMobile } from 'globals/adaptive'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

document.addEventListener('DOMContentLoaded', () => {
    if (isMobile) {
        const mapSvg = document.querySelector<HTMLElement>('.map__svg-mobile svg')
        const scalePlusButton = document.querySelector('.map__scale-plus')
        const scaleMinusButton = document.querySelector('.map__scale-minus')

        if (!mapSvg || !scaleMinusButton || !scaleMinusButton) return

        let scale = 1

        mapSvg.style.transform = `scale(${scale})`

        scalePlusButton?.addEventListener('click', () => {
            if (scale >= 3) return
            scale += 0.2
            mapSvg.style.transform = `scale(${scale})`
        })

        scaleMinusButton.addEventListener('click', () => {
            if (scale === 1) return
            scale -= 0.2
            mapSvg.style.transform = `scale(${scale})`
        })
    }

    gsap.registerPlugin(DrawSVGPlugin)

    const kazakhstan = isMobile ? document.getElementById('kazakhstan__mobile') : document.getElementById('kazakhstan')

    const tl = gsap.timeline({ repeat: -1 })
    tl.fromTo('.to-kz__anim', { drawSVG: '0' }, { duration: 2, drawSVG: true })
    tl.fromTo(kazakhstan, { filter: 'none' }, { filter: 'drop-shadow(0 0 20px rgba(123, 28, 25, 0.9))' })
    tl.fromTo('.from-kz__anim', { drawSVG: '0' }, { duration: 2, drawSVG: true })
    tl.fromTo('.dashed-lines', { opacity: 0 }, { opacity: 1, duration: 2 })
})
