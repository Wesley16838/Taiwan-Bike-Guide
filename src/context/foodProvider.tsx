import React, { createContext, useState, useContext } from "react";
import { FoodContextState } from "../types/context";
const contextDefaultValues: FoodContextState = {
    loading: false,
    food: {
        name:"",
        result: [],
        selected: {}
    },
    scenespot: {
        name:"",
        result: [],
        selected: {}
    },
    addFood: () => {},
    addScenespot: () => {},
    addLoading: () => {},
};
  
export const FoodContext = createContext<FoodContextState>(
    contextDefaultValues
);
  
export function useFood() {
    return useContext(FoodContext);
}

const FoodProvider = ({ children }: { children: React.ReactNode }) => {
    const [food, setFood] = useState(contextDefaultValues.food);
    const [scenespot, setScenespot] = useState(contextDefaultValues.scenespot);
    const [loading, setLoading] = useState<boolean>(contextDefaultValues.loading);
    const addFood = (name: string, data: []) => setFood({name, result: data});
    const addScenespot= (name: string, data: []) => setScenespot({name, result: data});
    const addLoading = (newLoading: boolean) => setLoading(newLoading);
    return (
        <FoodContext.Provider
            value={{
               loading,
               food,
               scenespot,
               addFood,
               addScenespot,
               addLoading,
            }}
        >
            {children}
        </FoodContext.Provider>
    );
};

export default FoodProvider;