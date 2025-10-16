void (function () {
    const questions = document.querySelectorAll('.faq__item-q')
    questions.forEach((q) => {
        q.addEventListener('click', () => {
            const item = q.closest('.faq__item')
            if (!item) return

            const activeItem = document.querySelector('.faq__item._opened')
            if (activeItem && activeItem !== item) activeItem.classList.remove('_opened')

            item.classList.toggle('_opened')
        })
    })
})()
