import React,{ createContext } from 'react';

export const AddNoteContext=createContext();

export const AddNoteProvider = ({children,value}) => {
    

    return ( 
        <AddNoteContext.Provider value={value}>
            {children}
        </AddNoteContext.Provider>
    );
}