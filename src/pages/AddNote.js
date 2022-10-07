import React, { useEffect, useLayoutEffect, useState } from 'react';
import { DoneButton, PreviewButton } from '../components/Header';
import { AddNoteProvider } from '../context/AddNoteContext';
import AddNoteLayout from '../components/AddNote/AddNoteLayout';
import Database from '../../modules/Database';

const db=new Database();

const AddNote=({navigation,navigation: { setOptions}}) =>{
    const [decks,setDecks]=useState([]);
    const [frontInput,setFrontInput]=useState('');
    const [backInput,setBackInput]=useState('');
    const [deckInput,setDeckInput]=useState(null);

    useLayoutEffect(() => {
        setOptions({
          headerRight: () => (
            <>
                <PreviewButton onPress={handlePreview} />
                <DoneButton onPress={handleDonePress} />
            </>
          ),
        })
    });

    useEffect(()=>{
        db.getDecks((items)=>{
            setDecks(items);
            if(items.length>0) {
                setDeckInput(items[0].id);
            }
        });
    },[]);

    

    const handlePreview=()=>{
        if(!frontInput||!backInput){
            alert('Please enter the fields!');
            return false;
        }
        navigation.navigate('Card Preview',{
            frontText:frontInput,
            backText:backInput
        });
    }

    const handleDonePress=()=>{
        if(!frontInput||!backInput||!deckInput){
            alert('Please enter the fields!');
            return false;
        }

        db.insertNote(deckInput,frontInput,backInput);
        navigation.goBack();
    }

    return ( 
        <AddNoteProvider value={{decks,frontInput,backInput,setFrontInput,setBackInput,setDeckInput}}>
            <AddNoteLayout />
        </AddNoteProvider>
     );
}

export default AddNote;