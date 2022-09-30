import React,{useState, createContext } from 'react';

export const ThemeContext=createContext();

export const ThemeProvider = ({children}) => {
    const [nightMode,setNightMode]=useState(false);
    const [mode,setMode]=useState('light');
    
    const toggleSwitch = () => {
        setNightMode(previousState => !previousState);
        setMode(previousState=>previousState==='light'?'dark':'light');
    }

    return ( 
        <ThemeContext.Provider value={{nightMode,toggleSwitch,mode}}>
            {children}
        </ThemeContext.Provider>
    );
}