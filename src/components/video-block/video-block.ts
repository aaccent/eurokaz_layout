void (function () {
    const videoBlock = document.querySelector('.video-block')
    const video = videoBlock?.querySelector<HTMLVideoElement>('.video-block video')
    if (!videoBlock || !video) return

    const playButton = document.querySelector('.video-block__play-button ')

    playButton?.addEventListener('click', () => {
        video.play()
        videoBlock.classList.add('_playing')
    })

    video.addEventListener('click', () => {
        const playing = videoBlock.classList.contains('_playing')
        if (!playing) return

        video.pause()
        videoBlock.classList.remove('_playing')
    })

    video.addEventListener('ended', () => {
        videoBlock.classList.remove('_playing')
    })
})()
