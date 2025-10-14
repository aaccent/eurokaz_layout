void (function () {
    const seoButton = document.querySelector('.seo__button')
    const seoContent = document.querySelector('.seo__content')
    if (!seoButton || !seoContent) return

    seoButton.addEventListener('click', () => {
        const opened = seoContent.classList.contains('_full')
        if (opened) {
            seoContent.classList.remove('_full')
            seoButton.textContent = 'Читать полностью'
        } else {
            seoContent.classList.add('_full')
            seoButton.textContent = 'Скрыть'
        }
    })
})()
