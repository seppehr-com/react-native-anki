import React, { useEffect, useLayoutEffect, useState } from 'react';
import { DoneButton, GoBackButton } from '../components/Header';
import { AddNoteProvider } from '../context/AddNoteContext';
import AddNoteLayout from '../components/AddNote/AddNoteLayout';
import Database from '../../modules/Database';

const db=new Database();

const AddNote=({navigation,navigation: { setOptions}}) =>{
    const [decks,setDecks]=useState([]);
    const [frontInput,setFrontInput]=useState('');
    const [backInput,setBackInput]=useState('');
    const [inputSelection,setInputSelection]=useState({});
    const [deckInput,setDeckInput]=useState(null);

    useLayoutEffect(() => {
        setOptions({
          headerRight: () => (
            <DoneButton onPress={handleDonePress} />
          ),
          headerLeft: () => (
            <GoBackButton onPress={()=>navigation.goBack()} />
          ),
        })
    });

    useEffect(()=>{
        db.getDecks(setDecks);
    },[]);

    const handleTextEdit=(tag,properties)=>{
        let {start,end,label} = inputSelection;
        const tagStart=`<${tag} ${properties?properties:''}>`,tagEnd=`</${tag}>`;
        let textInput,setTextInput;

        if(start&&end){
            if(label==='front'){
                textInput=frontInput;
                setTextInput=setFrontInput;
            }
            else{
                textInput=backInput;
                setTextInput=setBackInput;
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

    const handleDonePress=()=>{
        if(!frontInput||!backInput||!deckInput){
            alert('Please enter the fields!');
            return false;
        }

        db.insertNote(deckInput,frontInput,backInput);
        navigation.goBack();
    }

    const decksArray=decks.map(item=>item.title);

    return ( 
        <AddNoteProvider value={{decks,frontInput,backInput,setFrontInput,setBackInput,setInputSelection,setDeckInput,handleTextEdit}}>
            <AddNoteLayout />
        </AddNoteProvider>
     );
}

export default AddNote;