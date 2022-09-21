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
    const [frontInputSelection,setFrontInputSelection]=useState({});
    const [backInputSelection,setBackInputSelection]=useState({});
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
        <AddNoteProvider value={{decks,frontInput,backInput,setFrontInput,setBackInput,setFrontInputSelection,setBackInputSelection,setDeckInput}}>
            <AddNoteLayout />
        </AddNoteProvider>
     );
}

export default AddNote;