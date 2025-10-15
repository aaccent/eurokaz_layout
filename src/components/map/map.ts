import { Map, LngLatBounds } from 'mapbox-gl'
import bezier from '@turf/bezier'
import { lineString } from '@turf/helpers'
import * as turf from '@turf/turf'
import square from '@/assets/icons/square.png'
import circle from '@/assets/icons/circle.png'

void (function () {
    const mapContainer = document.querySelector<HTMLElement>('#map')
    if (!mapContainer) return

    const map = new Map({
        container: mapContainer,
        accessToken: 'pk.eyJ1Ijoic2V2YS1hYWNjZW50IiwiYSI6ImNsb2ZlNzR0NDByajUya3FwcmQ4bHdoZG8ifQ.2oZ5rpkSs2dKoP5a10lkcg',
        style: 'mapbox://styles/mapbox/light-v11',
        projection: { name: 'mercator' },
        minZoom: 0.5,
        dragRotate: false,
        cooperativeGestures: true,
        locale: {
            'ScrollZoomBlocker.CtrlMessage': 'ctrl + scroll для увеличения масштаба карты',
            'ScrollZoomBlocker.CmdMessage': '⌘ + scroll для увеличения масштаба карты',
            'TouchPanBlocker.Message': 'Используйте два пальца чтобы подвинуть карту',
            'NavigationControl.ZoomIn': 'Увеличить',
            'NavigationControl.ZoomOut': 'Уменьшить',
        },
    })

    map.setMaxBounds([
        [-180, -85.051129], // юго-запад
        [180, 85.051129], // северо-восток
    ])

    type PointRecord = {
        type: 'square' | 'circle'
        coords: [number, number] // [lng, lat]
    }

    const pointsData: PointRecord[] = [
        { type: 'square', coords: [-75.32999496209419, 43.116745891485785] }, //сша
        { type: 'square', coords: [2.202296089220894, 48.7495760863345] }, //европа
        { type: 'square', coords: [37.227341184922, 55.667670562189166] }, //мск
        { type: 'square', coords: [64.89984343546354, 48.219399654357545] }, //КАзаахстан
        { type: 'square', coords: [87.49122200472455, 37.83257712216818] }, //Китай
        { type: 'circle', coords: [48.022939, 46.277445] }, // рф юг
        { type: 'circle', coords: [20.45283338295273, 54.708238618132526] }, //калининград
        { type: 'circle', coords: [30.364143128759206, 59.922379120921796] }, //спб
        { type: 'circle', coords: [61.797519, 58.686574] }, //рф урал
        { type: 'circle', coords: [78.87794170231328, 66.64046266100534] }, //рф вверх далеко
        { type: 'circle', coords: [84.50294108347981, 55.560494433103436] }, //рф вниз далеко
    ]

    type WaysRecord = {
        deg?: number
        bend?: number
        type: 'solid' | 'dashed'
        start: [number, number]
        way: [number, number][]
        end: [number, number]
    }[]

    const ways: WaysRecord = [
        //мск-казазстан
        {
            type: 'dashed',
            start: [37.227341184922, 55.667670562189166],
            way: [
                [48.647841, 49.886451],
                [52.906202, 46.825436],
            ],
            end: [64.89984343546354, 48.219399654357545],
        },
        //мск-юг
        {
            type: 'solid',
            start: [37.227341184922, 55.667670562189166],
            way: [[42.022057, 49.201448]],
            end: [48.022939, 46.277445],
        },
        //мск-калининград
        {
            type: 'solid',
            start: [37.227341184922, 55.667670562189166],
            way: [
                [26.038737, 59.660805],
                [20.242588, 56.600327],
            ],
            end: [20.45283338295273, 54.708238618132526],
        },
        //мск-спб
        {
            type: 'solid',
            start: [37.227341184922, 55.667670562189166],
            way: [[35.60761, 59.149882]],
            end: [30.364143128759206, 59.922379120921796],
        },
        //мск-рф-урал
        {
            type: 'solid',
            start: [37.227341184922, 55.667670562189166],
            way: [[49.652915, 52.344569]],
            end: [61.797519, 58.686574],
        },
        // мск-вверх далеко
        {
            type: 'solid',
            start: [37.227341184922, 55.667670562189166],
            way: [
                [62.407549, 59.660805],
                [72.214417, 65.925753],
            ],
            end: [78.87794170231328, 66.64046266100534],
        },
        //мск-вниз-далеко
        {
            type: 'solid',
            start: [37.227341184922, 55.667670562189166],
            way: [
                [64.571652, 61.707452],
                [92.007842, 63.187825],
            ],
            end: [84.50294108347981, 55.560494433103436],
        },
        //казахстан-китай
        {
            type: 'dashed',
            start: [64.89984343546354, 48.219399654357545],
            way: [[83.187057, 45.880449]],
            end: [87.49122200472455, 37.83257712216818],
        },
        //казахстан-европа
        {
            deg: 60,
            bend: -0.2,
            type: 'dashed',
            start: [64.89984343546354, 48.219399654357545],
            way: [
                [54.563909, 42.736926],
                [27.205644, 42.060509],
                [12.276169, 45.239119],
            ],
            end: [2.202296089220894, 48.7495760863345],
        },
        //казахстан-сша
        {
            deg: 60,
            bend: -0.57,
            type: 'dashed',
            start: [64.89984343546354, 48.219399654357545],
            way: [
                [51.068076, 38.05458],
                [11.373236, 33.931966],
                [-42.724156, 28.369652],
            ],
            end: [-75.32999496209419, 43.116745891485785],
        },
    ]

    map.on('load', () => {
        map.resize()
        Promise.all([loadImage(square), loadImage(circle)])
            .then(([squareImg, circleImg]) => {
                /* 1. FeatureCollection для каждого стиля */
                const solidFeats: GeoJSON.Feature<GeoJSON.LineString>[] = []
                const dashedFeats: GeoJSON.Feature<GeoJSON.LineString>[] = []

                ways.forEach((w) => {
                    let bend = w.bend || 0.17
                    let deg = w.deg || 90

                    const [p1, p2] = [w.start, w.end]
                    const mid = turf.midpoint(turf.point(p1), turf.point(p2))
                    const bear = turf.bearing(p1, p2) + deg
                    const ctrl = turf.destination(mid, turf.distance(p1, p2) * bend, bear)

                    const curved = bezier(lineString([p1, ctrl.geometry.coordinates, p2]), 10000, 0.85)

                    ;(w.type === 'solid' ? solidFeats : dashedFeats).push(curved)
                })

                /* 2. источники */
                map.addSource('solid-lines', {
                    type: 'geojson',
                    data: { type: 'FeatureCollection', features: solidFeats },
                    lineMetrics: true,
                })
                map.addSource('dashed-lines', {
                    type: 'geojson',
                    data: { type: 'FeatureCollection', features: dashedFeats },
                })

                /* 3. слой сплошных */
                map.addLayer({
                    id: 'ways-solid',
                    type: 'line',
                    source: 'solid-lines',
                    layout: { 'line-join': 'round', 'line-cap': 'round' },
                    paint: {
                        'line-color': '#7B1C19',
                        'line-width': 1,
                        'line-gradient': [
                            'interpolate',
                            ['linear'],
                            ['line-progress'], // 0 → 1 по длине
                            0,
                            'rgba(123, 28, 25, 1)', // начало — непрозрачно
                            0.7,
                            'rgba(123, 28, 25, 0.6)', // 70 % — полупрозрачно
                            1,
                            'rgba(123, 28, 25, 0)', // конец — полностью прозрачно
                        ],
                    },
                })

                /* 4. слой пунктирных */
                map.addLayer({
                    id: 'ways-dashed',
                    type: 'line',
                    source: 'dashed-lines',
                    layout: { 'line-join': 'round', 'line-cap': 'round' },
                    paint: {
                        'line-color': '#7B1C19',
                        'line-width': 1,
                        'line-dasharray': [2, 2],
                    },
                })

                map.addImage('square-icon', squareImg, { sdf: false })
                map.addImage('circle-icon', circleImg, { sdf: false })

                const geoJson = buildGeoJSON(pointsData)
                map.addSource('points', { type: 'geojson', data: geoJson })

                addSymbolLayer('square-points', 'square-icon', 'square')
                addSymbolLayer('circle-points', 'circle-icon', 'circle')

                const bounds = new LngLatBounds()
                pointsData.forEach((p) => bounds.extend(p.coords))
                map.fitBounds(bounds, { padding: 60 })
            })
            .catch((err) => console.error('Не удалось загрузить иконки:', err))
    })

    // ---------- helpers ----------

    function loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = url
        })
    }

    function buildGeoJSON(data: PointRecord[]): GeoJSON.FeatureCollection {
        return {
            type: 'FeatureCollection',
            features: data.map((p, idx) => ({
                type: 'Feature',
                geometry: { type: 'Point', coordinates: p.coords },
                properties: { iconType: p.type, index: idx },
            })),
        }
    }

    function addSymbolLayer(layerId: string, iconName: string, iconType: 'square' | 'circle'): void {
        map.addLayer({
            id: layerId,
            type: 'symbol',
            source: 'points',
            filter: ['==', ['get', 'iconType'], iconType],
            layout: {
                'icon-image': iconName,
                'icon-anchor': 'center',
                'icon-allow-overlap': true,
                'icon-size': 1,
            },
        })
    }
})()
