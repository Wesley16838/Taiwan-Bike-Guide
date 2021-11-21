import React, { createContext, useState, useContext } from "react";
import { BikeContextState } from "../types/context";
const contextDefaultValues: BikeContextState = {
    loading: false,
    bike: {
        name:"",
        result: []
    },
    route: {
        name:"",
        result: []
    },
    addBike: () => {},
    addRoute: () => {},
    addLoading: () => {},
};
  
export const BikeContext = createContext<BikeContextState>(
    contextDefaultValues
);
  
export function useBike() {
    return useContext(BikeContext);
}

const MapProvider = ({ children }: { children: React.ReactNode }) => {
    const [bike, setBike] = useState(contextDefaultValues.bike);
    const [route, setRoute] = useState(contextDefaultValues.route);
    const [loading, setLoading] = useState<boolean>(contextDefaultValues.loading);
    const addBike = (name: string, data: []) => setBike({name, result: data});
    const addRoute= (name: string, data: []) => setRoute({name, result: data});
    const addLoading = (newLoading: boolean) => setLoading(newLoading);
    return (
        <BikeContext.Provider
            value={{
               loading,
               bike,
               route,
               addBike,
               addRoute,
               addLoading,
            }}
        >
            {children}
        </BikeContext.Provider>
    );
};

export default MapProvider;