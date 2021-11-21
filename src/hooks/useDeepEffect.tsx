import { useEffect, useRef } from "react";
import _ from 'lodash';
import isEqual from 'lodash/isEqual';

export function useDeepEffect(effectFunc: any, deps: any){
    const isFirst = useRef(true)
    const prevDep = useRef(deps)

    useEffect(() => {
        const isSame = prevDep.current.every((obj: any, index: any) => isEqual(obj, deps[index]));

        if(isFirst.current || !isSame){
            effectFunc()
        }
        isFirst.current = false
        prevDep.current = deps
    }, deps)
}