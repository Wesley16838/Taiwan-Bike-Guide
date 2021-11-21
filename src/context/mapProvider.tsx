import React, { createContext, useState, useContext } from "react";
import { MapContextState } from "../types/context";
const contextDefaultValues: MapContextState = {
    userLocation: {
        latitude:'',
        longitude: ''
    },
    map: null,
    addMap: () => {},
    addUserLocation: () => {},
};
  
export const MapContext = createContext<MapContextState>(
    contextDefaultValues
);
  
export function UseMapContext() {
    return useContext(MapContext);
}

const MapProvider = ({ children }: { children: React.ReactNode }) => {
    const [userLocation, setUserLocation] = useState(contextDefaultValues.userLocation);
    const addUserLocation = (newLocation: any) => setUserLocation(newLocation);

    const [map, setMap] = useState(contextDefaultValues.map);
    const addMap = (newMap: any) => setMap(newMap);

    return (
        <MapContext.Provider
            value={{
                userLocation,
                map,
                addMap,
                addUserLocation,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};

export default MapProvider;