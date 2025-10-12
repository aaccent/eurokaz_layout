import { Map, LngLatBounds, Marker } from 'mapbox-gl'
import bezierSpline from '@turf/bezier-spline'
import * as turf from '@turf/turf'
import greatCircle from '@turf/great-circle'

const map = new Map({
    container: 'map',
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

const points = [
    { type: 'square', coords: [-75.32999496209419, 43.116745891485785] },
    [-1.6520186369035732, 48.53354914796627],
    [49.12822560788961, 55.787670596939314],
    [21.429563233787306, 54.757491332086275],
    [34.10776519290381, 59.8504702244197],
    [57.767807185991664, 47.46629784565948],
    [92.92405331828253, 40.25557522514172],
    [108.04123915516756, 57.28582947098475],
]

type PointRecord = {
    type: 'square' | 'circle'
    coords: [number, number] // [lng, lat]
}

// 2. исходный массив
const pointsData: PointRecord[] = [
    { type: 'square', coords: [-75.32999496209419, 43.116745891485785] },
    { type: 'square', coords: [2.202296089220894, 48.7495760863345] },
    { type: 'square', coords: [37.227341184922, 55.667670562189166] },
    { type: 'square', coords: [64.89984343546354, 48.219399654357545] },
    { type: 'square', coords: [87.49122200472455, 37.83257712216818] },
    { type: 'circle', coords: [47.44679237838445, 44.56378861141133] },
    { type: 'circle', coords: [20.45283338295273, 54.708238618132526] },
    { type: 'circle', coords: [30.364143128759206, 59.922379120921796] },
    { type: 'circle', coords: [66.7273367129539, 57.15326096772635] },
    { type: 'circle', coords: [78.87794170231328, 66.64046266100534] },
    { type: 'circle', coords: [84.50294108347981, 55.560494433103436] },
]

map.on('load', () => {
    map.resize()
    Promise.all([loadImage('./assets/icons/square.png'), loadImage('./assets/icons/circle.png')])
        .then(([squareImg, circleImg]) => {
            map.addImage('square-icon', squareImg, { sdf: false })
            map.addImage('circle-icon', circleImg, { sdf: false })

            // 4-1. GeoJSON
            const geoJson = buildGeoJSON(pointsData)
            map.addSource('points', { type: 'geojson', data: geoJson })

            // 4-2. слои
            addSymbolLayer('square-points', 'square-icon', 'square')
            addSymbolLayer('circle-points', 'circle-icon', 'circle')

            // 4-3. fitBounds
            const bounds = new LngLatBounds()
            pointsData.forEach((p) => bounds.extend(p.coords))
            map.fitBounds(bounds, { padding: 60 })
        })
        .catch((err) => console.error('Не удалось загрузить иконки:', err))

    const lineCoords: [number, number][] = [
        [37.227341184922, 55.667670562189166], // Москва
        [64.89984343546354, 48.219399654357545], // Казахстан (Караганда)
    ]

    const arc = greatCircle(
        lineCoords[0],
        lineCoords[1],
        { npoints: 100 }, // кол-во промежуточных точек
    )

    map.addSource('arc', { type: 'geojson', data: arc })
    map.addLayer({
        id: 'arc-layer',
        type: 'line',
        source: 'arc',
        paint: {
            'line-color': '#7B1C19',
            'line-width': 1,
            'line-opacity': 0.9,
        },
    })

    const lineGeoJson: GeoJSON.Feature<GeoJSON.LineString> = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: lineCoords,
        },
        properties: {},
    }

    map.addSource('line1', { type: 'geojson', data: lineGeoJson })

    // 2-2. стилизованный слой
    // map.addLayer({
    //     id: 'line1-layer',
    //     type: 'line',
    //     source: 'line1',
    //     layout: {
    //         'line-join': 'round',
    //         'line-cap': 'round',
    //     },
    //     paint: {
    //         'line-color': '#7B1C19', // цвет
    //         'line-width': 1, // толщина (px)
    //         'line-dasharray': [4, 2], // пунктир 4-2-4-2...
    //         'line-opacity': 0.9,
    //         'line-blur': 1, // лёгкая тень
    //     },
    // })
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
