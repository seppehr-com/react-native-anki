import React, {useEffect, useLayoutEffect, useState } from 'react';
import {View,Alert } from 'react-native';
import { DeleteButton, GoBackButton } from '../components/Header';
import Database from '../../modules/Database';
import { CardProvider } from '../context/CardContext';
import CardLayout from '../components/Card/CardLayout';

const db= new Database();

function Cards({navigation,navigation:{setOptions},route}) {
    const deckId=route.params.id;

    const [visible,setVisible]=useState(false);
    const [cards,setCards]=useState();
    const [counter,setCounter]=useState(0);

    //Status Counts
    const [easy,setEasy]=useState(0);
    const [again,setAgain]=useState(0);
    const [good,setGood]=useState(0);

    useLayoutEffect(() => {
        setOptions({
          headerRight: () => (
            Array.isArray(cards)?<DeleteButton onPress={handleDeleteCard} />:<View />
          ),
          headerLeft: () => (
            <GoBackButton onPress={()=>navigation.goBack()} />
          ),
        })
    });

    useEffect(()=>{
        db.getNotes(setCards,deckId);
    },[]);

    //Status Counts Update
    useEffect(()=>{
        db.getStatusCount(deckId,'easy',setEasy);
        db.getStatusCount(deckId,'again',setAgain);
        db.getStatusCount(deckId,'good',setGood);
    },[counter]);

    const handleDeleteCard=()=>{
        if(!cards){
            alert('There is no card to delete!');
            return false;
        }

        Alert.alert(
            "Delete this Card!",
            "Are you sure ?!",
            [
              {
                text: "NO",
                style: "cancel"
              },
              {
                text: "YES",
                onPress: () => {
                    //Delete and reset the cards!
                    db.deleteNote(cards[counter].id);
                    db.getNotes(setCards,deckId);
                    setCounter(0);
                }
              },
            ]
        );
    }

    const handleShowBack=()=>{
        setVisible(true);
    }

    const handleNextCard=(score,status)=>{
        const currentCard=cards[counter];

        db.updateScore(currentCard.id,currentCard.score+score,status);

        if(cards[counter+1]){
             //There are more cards
            setCounter(counter+1);
        }
        else{ 
            //The Last Card
            db.getNotes(setCards,deckId);
            setCounter(0);
        }
        setVisible(false);
    }

    return ( 
        <CardProvider value={{visible,cards,counter,easy,good,again,handleShowBack,handleNextCard}}>
            <CardLayout />
        </CardProvider>
    );
}

export default Cards;