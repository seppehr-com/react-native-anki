import React,{ createContext } from 'react';

export const CardContext=createContext();

export const CardProvider = ({children,value}) => {
    

    return ( 
        <CardContext.Provider value={value}>
            {children}
        </CardContext.Provider>
    );
}