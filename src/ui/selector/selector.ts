void (function () {
    const selectors = document.querySelectorAll<HTMLElement>('.selector')

    selectors.forEach((selector) => {
        selector.addEventListener('click', (e) => {
            if (e.target !== e.currentTarget) return
            selector.classList.toggle('_opened')
        })

        const items = selector.querySelectorAll<HTMLElement>('.selector-item')
        const selected = selector.querySelector('.selector__selected')

        if (selected) selected.textContent = items[0].textContent

        items.forEach((item) => {
            item.addEventListener('click', () => {
                if (selected) selected.textContent = item.textContent
                selector.classList.remove('_opened')
            })
        })
    })
})()
