void (function () {
    const videoBlocks = document.querySelectorAll('.video-block__item')

    videoBlocks.forEach((block) => {
        const video = block.querySelector('video')
        //if(!video) return

        const wrapper = block.querySelector('.video-block__wrapper')

        wrapper?.addEventListener('click', () => {
            video?.play()
            block.classList.add('_playing')
        })

        video?.addEventListener('click', () => {
            const playing = block.classList.contains('_playing')
            if (!playing) return

            video.pause()
            block.classList.remove('_playing')
        })

        video?.addEventListener('ended', () => {
            block.classList.remove('_playing')
        })
    })
})()
