import React, { Component, useEffect, useRef, useState, useContext } from 'react'
import bike from "../../../public/images/bicycle.svg"
import parking from "../../../public/images/parking.svg"
import location from "../../../public/images/location_icon.svg"
import locationLight from "../../../public/images/location_light.svg"
import phone from "../../../public/images/phone.svg"
import { postcal } from '../../constants'
import { useMapContext } from "../../context/mapProvider";
import { MapProps } from "../../types/components";
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

const Map = ({data, stationData, center, type, option}: MapProps) => {
    const { map, addMap } = useMapContext()
    const [maps, setMaps] = useState(null)

    useEffect(() => {
        const loadMap = () => {
            const map = new mapboxgl.Map({
                container: "my-map",
                style: "mapbox://styles/mapbox/streets-v11",
                center: center.length === 0 ? [121.565427, 25.032964] : center,
                zoom: 13
            })
            if(center.length !== 0 && type === 'bike') {
                stationData.forEach((item: any) => {
                    const name = item.StationName['Zh_tw']
                    const rentNum = data.filter((obj: any) => obj.StationUID === item.StationUID)[0].AvailableRentBikes
                    const returnNum = data.filter((obj: any) => obj.StationUID === item.StationUID)[0].AvailableReturnBikes
                    const itemPosition = item.StationPosition
                    const el = document.createElement('div');
                    el.className = 'marker';
                    el.innerHTML = `<p style="margin: 0px; position: relative; top: -10px; left: -1px; font-weight: bold;">${option === 'rent' ? rentNum : returnNum}</p>`
                    const marker = new mapboxgl.Marker(el)
                    .setLngLat([itemPosition.PositionLon, itemPosition.PositionLat])
                    .setPopup(new mapboxgl.Popup()
                        .setHTML(
                            `
                                <div class="pop-up-container">
                                    <h3 style="margin: 0px">${name}</h3>
                                    <div style="display: flex; flex-direction: row;  align-items: center; justify-content: space-between;">
                                        <div
                                        style="
                                                display: flex;
                                                flex-direction: row;
                                                align-items: center;
                                                justify-content: space-between;
                                            "
                                        >
                                            <div
                                                style="
                                                    display: flex;
                                                    flex-direction: row;
                                                    align-items: center;
                                                    padding: 8px 12px;
                                                    height: 28px;
                                                    border-radius: 4px;
                                                    border: solid 1px #007F77;
                                                    margin-right: 10px;
                                                "
                                            >
                                                <img src="${bike.src}" width="18" height="18"/>
                                                <p style="margin: 0px 5px;">${rentNum}</p>
                                            </div>
                                            <div
                                                style="
                                                    display: flex;
                                                    flex-direction: row;
                                                    align-items: center;
                                                    padding: 8px 12px;
                                                    height: 28px;
                                                    border-radius: 4px;
                                                    border: solid 1px #007F77;
                                                "
                                            >
                                                <img src="${parking.src}" width="18" height="18"/>
                                                <p style="margin: 0px 5px;">${returnNum}</p>
                                            </div>
                                        </div>
                                        <div
                                            style="
                                                display: flex;
                                                flex-direction:row;
                                                align-items: center;
                                                justify-content: center;
                                            "
                                        >
                                            <img src="${location.src}" width="18" height="18"/>
                                            <p style="margin: 0px 0px 0px 10px">距離25公尺</p>
                                        </div>
                                    </div>
                                </div>
                            `
                        )
                    )
                    .addTo(map);
                    const markerDiv = marker.getElement();
                    markerDiv.addEventListener('onclick', () => marker.togglePopup());
                })
                setMaps(map)
                addMap(map)
            } else if (center.length !== 0 && type === 'route'){
                setMaps(map)
                addMap(map)
            } else if (center.length !== 0 && type === 'food'){
                
                data.forEach((item: any) => {
                    const name = item?.RestaurantName ? item.RestaurantName : item.Name
                    const address = item.Address !== undefined ? item.Address : postcal.get(item.ZipCode)
                    const phonenumber = item?.Phone ? item.Phone : '--'
                    const itemPosition = item.Position
                    const marker = new mapboxgl.Marker()
                    .setLngLat([itemPosition.PositionLon, itemPosition.PositionLat])
                    .setPopup(new mapboxgl.Popup()
                        .setHTML(
                            `
                            <div
                                style="width: 100%; height: 100%; display: flex; justify-content: center; flex-direction: column; padding: 5px 10px;"
                            >
                                <h3 style="margin: 0px 0px 6px 0px">${name}</h3>
                                <p style="margin: 0px ; color: #9A9A9A; display: flex; flex-direction: row; align-items: center";><img style="margin-right: 4px" src="${locationLight.src}" width="18" height="18"/> ${item.Address !== undefined ? address : address[0]}</p>
                                <p style="margin: 0px ; color: #9A9A9A; display: flex; flex-direction: row; align-items: center";><img style="margin-right: 4px" src="${phone.src}" width="18" height="18"/>${phonenumber}</p>
                            </div>
                            `
                        )
                    )
                    .addTo(map);
                    const markerDiv = marker.getElement();
                    markerDiv.addEventListener('onclick', () => marker.togglePopup());
                })
                setMaps(map)
                addMap(map)
            }
        }
        loadMap()
    }, [center, option])

    return(
        <div id="my-map" style={{ height: 'calc(100vh - 88px)', width: 'calc(100vw - 425px)', left: '425px'}}/>
    )
}

export default Map;