import {createContext, useContext} from "react";

export const AppContext = createContext(null)

export function useAppContext(){
    return useContext(AppContext)
}

export const BreadContext = createContext(null)
export function useBreadContext(){
    return useContext(BreadContext)
}