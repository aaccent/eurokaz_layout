void (function () {
    const subCategoriesBlock = document.querySelector('.subcategories')

    if (!subCategoriesBlock) return

    subCategoriesBlock.addEventListener('click', () => {
        subCategoriesBlock.classList.toggle('_opened')
    })
})()
