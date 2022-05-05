/** 
 * Type of component's props
*/
export type LayoutProps = {
    children: React.ReactNode, 
    pageTitle?: string, 
    description?: string,
    previewImage?: string,
    siteName?: string,
}

export type LinkProps = {
    path: string,
    name: string,
}

export type CardProps = {
    title: string, 
    start: string, 
    end: string, 
    way: string, 
    distance: number, 
    onClick: () => void,
}

export type ButtonProps = {
    onClick: any,
    trigger: any;
}

export type DropDownProps = {
    data?: DataType,
    arrayData?: any,
    onClick: any,
    type?: string,
    defaultValue?: string,
    defaultLabel?: string,
    label?: string,
}

export type ListProps = {
    data: any;
    stationData?: any,
    type: string,
    onClick?: any
}

export type MapProps = {
    data: any,
    stationData?: any,
    center: any[],
    type: string,
    option?:any,
    userLocation?:any,
    onClick?: any,
}

export type SwitchProps = {
    isToggle: boolean,
    onToggle: any,
    data: string[],

}
 
export type ModalProps = {
    select: any,
    onClick: any,
    isShow: boolean,
}
/** 
 * Type for single param in the props
*/
export type DataType = {
    defaultValue: DataItemType;
    listing: DataItemType[];
}

export type DataItemType = {
    value: string;
    label: string;
}

export type ImageSize = {
    width: number;
    height: number;
}