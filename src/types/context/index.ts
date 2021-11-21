export type MapContextState = {
    userLocation: any,
    map: any,
    addMap: (newMap: any)=>void,
    addUserLocation: any,
}

export type BikeContextState = {
    bike: any,
    route: any,
    loading: boolean,
    addBike: (name: string, data: []) =>void,
    addRoute: (name: string, data: []) =>void,
    addLoading: (loading: boolean) => void;
}

export type FoodContextState = {
    food: any,
    scenespot: any,
    loading: boolean,
    addFood: (name: string, data: []) =>void,
    addScenespot: (name: string, data: []) =>void,
    addLoading: (loading: boolean) => void;
}