import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { DoneButton, PreviewButton } from '../components/Header';
import { AddNoteProvider } from '../context/AddNoteContext';
import AddNoteLayout from '../components/AddNote/AddNoteLayout';
import Database from '../../modules/Database';

const db=new Database();

const EditNote=({navigation,navigation: { setOptions},route}) =>{
    const {id,deckId,frontText,backText} = route.params;

    const [decks,setDecks]=useState([]);
    const [frontInput,setFrontInput]=useState(frontText);
    const [backInput,setBackInput]=useState(backText);
    const [deckInput,setDeckInput]=useState(deckId);

    useLayoutEffect(() => {
        setOptions({
          headerRight: () => (
            <DoneButton onPress={handleDonePress} />
          ),
        })
    });

    useEffect(()=>{
        db.getDecks(setDecks);
    },[]);

    const handleDonePress=()=>{
        if(!frontInput||!backInput||!deckInput){
            ToastAndroid.showWithGravityAndOffset(
                'Please enter the fields!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return false;
        }

        //Update query
        db.updateNote(id,deckInput,frontInput,backInput);

        //Needs to refresh page after goBack() function!
        ToastAndroid.showWithGravityAndOffset(
            'Successfully edited!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
        navigation.goBack();
    }

    return ( 
        <AddNoteProvider value={{decks,frontInput,backInput,deckInput,setFrontInput,setBackInput,setDeckInput}}>
            <AddNoteLayout />
        </AddNoteProvider>
     );
}

export default EditNote;