import React, { createContext, useState, useContext } from "react";
import { MapContextState } from "../types/context";
const contextDefaultValues: MapContextState = {
    map: null,
    addMap: () => {},
};
  
export const MapContext = createContext<MapContextState>(
    contextDefaultValues
);
  
export function useMap() {
    return useContext(MapContext);
}

const MapProvider = ({ children }: { children: React.ReactNode }) => {
    const [map, setMap] = useState(contextDefaultValues.map);
    const addMap = (newMap: any) => setMap(newMap);

    return (
        <MapContext.Provider
            value={{
                map,
                addMap,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};

export default MapProvider;