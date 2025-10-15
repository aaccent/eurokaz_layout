// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { isMobile } from 'globals/adaptive'
//
// gsap.registerPlugin(ScrollTrigger)
// void (function () {
//     if (isMobile) return
//     const images = document.querySelectorAll<HTMLImageElement>('.content img')
//     images.forEach((img) => {
//         const maxWidth = img.offsetWidth
//         console.log(maxWidth)
//         gsap.to(img, {
//             scrollTrigger: {
//                 trigger: img,
//                 markers: { startColor: 'green', endColor: 'red', fontSize: '12px' },
//                 start: 'top center',
//                 end: 'bottom+=200px bottom',
//                 scrub: 1,
//             },
//             maxWidth: 'var(--container-width)',
//             ease: 'none',
//             duration: 1.5,
//         })
//     })
// })()
