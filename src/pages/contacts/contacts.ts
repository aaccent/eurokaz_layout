import { Map } from 'mapbox-gl'
import logo from '@/assets/icons/logo.png'
import { isMobile } from 'globals/adaptive'

void (function () {
    const mapContainer = document.querySelector<HTMLElement>('.contacts-map')
    if (!mapContainer) return

    const [lng, lat] = (document.querySelector<HTMLElement>('[data-coords]')?.dataset.coords || '49.149299, 55.757066')
        .split(',')
        .map(Number)

    // 2. инициализируем карту
    const map = new Map({
        container: mapContainer,
        accessToken: 'pk.eyJ1Ijoic2V2YS1hYWNjZW50IiwiYSI6ImNsb2ZlNzR0NDByajUya3FwcmQ4bHdoZG8ifQ.2oZ5rpkSs2dKoP5a10lkcg',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [lng, lat],
        zoom: 12,
        minZoom: 0.5,
        dragRotate: false,
        cooperativeGestures: true,
        projection: { name: 'mercator' },
    })

    map.setMaxBounds([
        [-180, -85.051129], // юго-запад
        [180, 85.051129], // северо-восток
    ])

    map.on('load', () => {
        map.loadImage(logo, (err, img) => {
            if (err) {
                console.error(err)
                return
            }

            // @ts-ignore
            map.addImage('logo', img)
        })

        map.addSource('point', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: { type: 'Point', coordinates: [lng, lat] },
                        properties: {},
                    },
                ],
            },
        })

        map.addLayer({
            id: 'custom-pin',
            type: 'symbol',
            source: 'point',
            layout: {
                'icon-image': 'logo',
                'icon-anchor': 'center',
                'icon-size': isMobile ? 0.5 : 1,
            },
        })
    })
})()
