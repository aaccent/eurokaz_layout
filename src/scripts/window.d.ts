import { ScriptStatus, ScriptTypes } from '@/features/loadScript'

declare global {
    interface Window {
        initMap: () => void
        onYouTubeIframeAPIReady: () => void
        globalScripts: {
            [key in ScriptTypes]?: ScriptStatus
        }

        initSwiper: () => void
        openPopup: (name: string) => void
        closeActivePopup: () => void
    }
}

export {}
