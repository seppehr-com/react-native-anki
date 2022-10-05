import React,{ createContext, useState } from 'react';

export const AddNoteContext=createContext();

export const AddNoteProvider = ({children,value}) => {
    const [inputSelection,setInputSelection]=useState({});

    const handleTextEdit=(tag,properties)=>{
        let {start,end,label} = inputSelection;
        const tagStart=`<${tag} ${properties?properties:''}>`,tagEnd=`</${tag}>`;
        let textInput,setTextInput;

        if((start&&end)||(start===0)){
            if(label==='front'){
                textInput=value.frontInput;
                setTextInput=value.setFrontInput;
            }
            else{
                textInput=value.backInput;
                setTextInput=value.setBackInput;
            }

            //Replacement
            end+=tagStart.length;
            textInput=textInput.substring(0,start)+tagStart+textInput.substring(start);
            textInput=textInput.substring(0,end)+tagEnd+textInput.substring(end);

            //Set State
            setTextInput(textInput);
            return;
        }
    }

    return ( 
        <AddNoteContext.Provider value={{...value,setInputSelection,handleTextEdit}}>
            {children}
        </AddNoteContext.Provider>
    );
}