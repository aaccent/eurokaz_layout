void (function () {
    const upButton = document.querySelector('.footer__up-button')
    upButton?.addEventListener('click', () => {
        window.scroll({ top: 0, behavior: 'smooth' })
    })
})()
