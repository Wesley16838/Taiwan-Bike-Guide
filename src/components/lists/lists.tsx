import { ListProps } from "../../types/components"
import styles from "./Lists.module.scss"
import sharedStyle from "../../styles/base/Styles.module.scss"
import Image from 'next/image'
import Link from "next/link"
import { UseMapContext } from "../../context/mapProvider"
import startIcon from "../../../public/images/start.png"
import endIcon from "../../../public/images/end.png"
import locationIcon from "../../../public/images/location_icon.svg"
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export const listItemStyleOne = (stationData: any, data: any, index: number) => {
    const { map, userLocation } = UseMapContext();
    const newObject = data.find((obj: any) => {
        return obj.StationUID === stationData.StationUID
    })
    const name = stationData.StationName['Zh_tw']
    let status = "";
    const position = stationData.StationPosition
    const indexNum = userLocation.latitute === '' ? index : index + 1
    switch (newObject.ServiceStatus){
        case 0:
            status = "停止營運"
            break;
        case 1:
            if(newObject.AvailableRentBikes === 0 && newObject.AvailableReturnBikes === 0){
                status = "不可借/還車"
            } else if(newObject.AvailableRentBikes === 0 && newObject.AvailableReturnBikes !== 0){
                status = "只可還車"
            } else if(newObject.AvailableRentBikes !== 0 && newObject.AvailableReturnBikes === 0){
                status = "只可借車"
            } else {
                status = "可借可還"
            }
            break;
        case 2:
            status = "暫停營運"
            break;
        default:
            status = "停止營運"
            break;
    }

    return(
        <div 
            className={styles['list-item--one']} 
            key={name} 
            onMouseEnter={() => map._markers[indexNum].togglePopup()} 
            onMouseLeave={() => map._markers[indexNum].togglePopup()}
            onClick={()=>{
                if(position!==undefined) {
                    map.flyTo({
                        center: [position.PositionLon, position.PositionLat],
                        zoom:15
                    });
                }
            }}
        >
            <p className={styles.title}>{name}</p>
            <div className={sharedStyle['flex-row--space']}>
                <div className={`${styles.status} ${newObject.AvailableRentBikes > 5 && styles['normal']} ${newObject.AvailableRentBikes <= 5 && newObject.AvailableRentBikes !== 0 ? styles['limited'] : ''} ${newObject.AvailableRentBikes === 0 ? styles['disabled'] : 0}`}>
                    <p>可租借</p>
                    <p>{newObject.AvailableRentBikes}</p>
                </div>
                <div className={`${styles.status} ${newObject.AvailableReturnBikes > 5 && styles['normal']} ${newObject.AvailableReturnBikes <= 5 && newObject.AvailableReturnBikes !== 0 ? styles['limited'] : ''} ${newObject.AvailableReturnBikes === 0 ? styles['disabled'] : 0}`}>
                    <p>可停車</p>
                    <p>{newObject.AvailableReturnBikes}</p>
                </div>
            </div>
            <div className={sharedStyle['flex-row--space']}>
                <div className={`${styles.notice} ${status==='可借可還' ? styles.normal:''} ${status==='只可借車' || status==='只可還車' ? styles.alert:''} ${newObject.ServiceStatus!==1 ? styles.disabled:''}`}>
                    {
                        status
                    }
                </div>
                <p className={styles.detail}>
                    距離{25}公尺
                </p>
            </div>
        </div>
    )
}

export const listItemStyleTwo = (data: any, index: number) => {
    const { map, userLocation } = UseMapContext();
    const name = data.RouteName
    const city = data.City
    const town = data.Town
    const start = data.RoadSectionStart
    const end = data.RoadSectionEnd
    const direction = data.Direction
    const length = data.CyclingLength
    const coordinates = data.Geometry.substring(18, data.Geometry.length - 2).split(',').map((item: any) => {
        return item.split(' ')
    })
    const indexNum = userLocation.latitude === '' ? 0 : 1
    return(
        <div className={styles['list-item--two']} key={name} 
        onClick={()=> {
            const mapLayer = map.getLayer('route');

            if(typeof mapLayer !== 'undefined') {
                map._markers[indexNum].remove();
                map._markers[indexNum].remove();
                map.removeLayer('route').removeSource('route');
            }
            const el = document.createElement('div');
            el.className = 'marker';
            const marker1 = new mapboxgl.Marker(el)
            .setLngLat([coordinates[0][0], coordinates[0][1]])
            .addTo(map);
            const el2 = document.createElement('div');
            el2.className = 'marker';
            const marker2 = new mapboxgl.Marker(el2)
            .setLngLat([coordinates[coordinates.length-1][0], coordinates[coordinates.length-1][1]])
            .addTo(map);
            map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': coordinates
                    }
                }
            })
            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                'line-join': 'round',
                'line-cap': 'round'
                },
                'paint': {
                'line-color': '#E75578',
                'line-width': 6
                }
            });
            map.flyTo({
                center: coordinates[0],
                zoom:15
            });
        }}
        >
            <div className={styles['list-item--two--top']}>
                <div className={styles.title}>
                    {name}
                </div>
                <div className={styles.location}>
                    {city} {town}
                </div>
            </div>
            <div className={styles['list-item--two--bottom']}>
                <div className={styles['path-wrapper']}>
                    <div className={styles.path}>
                        <div className={styles['path-image']}>
                            <Image
                                src={startIcon}
                                alt="Logo"
                                layout="fill"
                                objectFit="cover"
                                priority={true}
                            />
                        </div>
                        {start ? start : '無起點'}
                    </div>
                    <div className={styles.path}>
                        <div className={styles['path-image']}>
                            <Image
                                src={endIcon}
                                alt="Logo"
                                layout="fill"
                                objectFit="fill"
                                priority={true}
                            />
                        </div>
                        {end ? end : '無終點'}
                    </div>
                </div>
                <div className={styles.info}>
                    {direction && <div className={styles.direction}>{direction}</div>}
                    <div  className={styles.length}>
                        全長<span>{length}公尺</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const listItemStyleThree = (data: any, index: number, onClick: any) => {
    const { map, userLocation } = UseMapContext();
    const name = data?.Name ? data.Name : data.RestaurantName
    const city = data.City
    const url = data?.WebsiteUrl ? data.WebsiteUrl : ""
    const className = data?.Class ? data.Class : ""
    const position = data.Position
    const indexNum = userLocation.latitute === '' ? index : index + 1
    return(
        <div 
            className={styles['list-item--three']} 
            key={name+index} 
            onMouseEnter={() => map._markers[indexNum].togglePopup()} 
            onMouseLeave={() => map._markers[indexNum].togglePopup()}
            onClick={()=>{
                if(position!==undefined) {
                    map.flyTo({
                        center: [position.PositionLon, position.PositionLat],
                        zoom:15
                    });
                }
                onClick(index)
            }}
        >
            <div className={styles['image-container']}>
                <Image 
                    src={data.Picture.PictureUrl1 === undefined ?  "/images/image_not_available.jpeg": data.Picture.PictureUrl1}
                    alt={data.Picture.PictureDescription1 === undefined ? "Picture" : data.Picture.PictureDescription1}    
                    layout={'fill'}
                    objectFit={'cover'}
                />
            </div>
            <div className={styles['bottom-section-container']}>
                <div className={sharedStyle['flex-row--space']}>
                    <div className={styles.title}>
                        {name}
                    </div>
                    <div className={styles.location}>
                        <Image
                            src={locationIcon}                            
                            width={13}
                            height={16}
                            alt={'location'}
                        />
                        {city}
                    </div>
                </div>
                <div className={sharedStyle['flex-row--space']}>
                    <div className={styles.class}>
                        {className ? className : "無分類"}
                    </div>
                    <div>
                    <Link href={url}>
                        <a target="_blank" rel="noopener noreferrer" className={`${url==='' && styles.disalbed}`}>
                            <Image
                                src={url===''? '/images/disabled_web.svg' : '/images/web.svg'}
                                width={26}
                                height={26}
                                alt={'url'}
                            />
                        </a>
                    </Link>
                    </div> 
                </div>
            </div>
        </div>
    )
}

// todo list => use stationData to loop not data
const Lists = ({data, stationData, type, onClick}: ListProps) => {
    const renderList = () => {
        if(type === 'bike'){
            if(data.length !==0 && stationData.length === 0){
                return <p className={styles.notice}>查無站點</p>
            } else if(data.length === 0 && stationData.length === 0){
                return <p className={styles.notice}>請先選擇城市和地區</p>
            } else {
                return (
                    stationData.map((station: any, index: number) => {
                        return(
                            listItemStyleOne(station, data, index)
                        )
                    })
                )
            }
        } else if(type === 'route'){
            if(data.length === 0) return <p className={styles.notice}>請先選擇城市</p>
            return (
                data.map((item: any, index: number) => {
                    return(
                        listItemStyleTwo(item, index)
                    )
                })
            )
        } else {
            if(data.length === 0) return <p className={styles.notice}>請先選擇城市和類別</p>
            return (
                data.map((item: any, index: number) => {
                    return(
                        listItemStyleThree(item, index, onClick)
                    )
                })
            )
        }
    }
    return(
        <div className={styles['lists-container']}>
            {
                renderList()
            }
        </div>
    )
}

export default Lists;