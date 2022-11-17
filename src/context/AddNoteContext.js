import React,{ createContext, useState } from 'react';
import {launchImageLibrary,launchCamera} from 'react-native-image-picker'
import { CameraPermission } from '../../modules/Permissions';

export const AddNoteContext=createContext();

export const AddNoteProvider = ({children,value}) => {
    const [inputSelection,setInputSelection]=useState({});

    const inputStates=(label)=>{
        let textInput,setTextInput;
        if(label==='front'){
            textInput=value.frontInput;
            setTextInput=value.setFrontInput;
        }
        else{
            textInput=value.backInput;
            setTextInput=value.setBackInput;
        }

        return {textInput,setTextInput};
    }

    const handleTextEdit=(tag,properties)=>{
        let {start,end,label} = inputSelection;
        const tagStart=`<${tag} ${properties?properties:''}>`,tagEnd=`</${tag}>`;

        if((start&&end)||(start===0)){
            let {textInput,setTextInput} = inputStates(label);

            //Replacement
            end+=tagStart.length;
            textInput=textInput.substring(0,start)+tagStart+textInput.substring(start);
            textInput=textInput.substring(0,end)+tagEnd+textInput.substring(end);

            //Set State
            setTextInput(textInput);
            return;
        }
    }

    const options = {
        mediaType	: 'photo',
        maxWidth:100,
        saveToPhotos:true,
    };

    const handleChooseFromGallery=()=>{
        let {label} = inputSelection;
        const {textInput,setTextInput} = inputStates(label);

        launchImageLibrary(options,callback=>{
            if(callback.assets){
              const [selectionItem]=callback.assets;
              //Normal Way
              setTextInput(textInput+`<img src="${selectionItem.uri}" width="300">`)
            }
        });
    }

    const handleChooseFromCamera=()=>{
        let {label} = inputSelection;
        const {textInput,setTextInput} = inputStates(label);

        CameraPermission((result)=>{
            if(result){
              launchCamera(options,callback=>{
                // console.log(callback)
                if(callback.assets){
                    const [selectionItem]=callback.assets;
                    //Normal Way
                    setTextInput(textInput+`<img src="${selectionItem.uri}" width="300">`)
                }
              });
            }
            else{
              alert('Access Denied!')
            }
        })
    }

    return ( 
        <AddNoteContext.Provider value={{...value,setInputSelection,handleTextEdit,handleChooseFromGallery,handleChooseFromCamera}}>
            {children}
        </AddNoteContext.Provider>
    );
}