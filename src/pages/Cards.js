import React, { useContext, useEffect, useState } from 'react';
import { Text,View,StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../../assets/theme';
import Database from '../../modules/Database';

const db= new Database();

const SingleCard=()=>{
    const [visible]=useContext(VisibleContext);
    const [cards,counter]=useContext(CardContext);

    const currentCard=cards[counter];

    return (
        <View style={styles.cardWrapper}>
            <View style={styles.frontWrapper}>
                <Text style={styles.cardText}>{currentCard.frontText}</Text>
            </View>
            <View style={[styles.backWrapper,{
                display:visible?'flex':'none'
            }]}>
                <Text style={styles.cardText}>{currentCard.backText}</Text>
            </View>
        </View>
    );
}

const Button=()=>{
    const [visible,setVisible]=useContext(VisibleContext);
    const [cards,counter,deckId,setCards,setCounter]=useContext(CardContext);

    const currentCard=cards[counter];

    const handleShowBack=()=>{
        setVisible(true);
    }

    const handleNextCard=(score)=>{
        db.updateScore(currentCard.id,currentCard.score+score);

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

    return(
        <View style={styles.buttonsWrapper}>
            {!visible && (
                <TouchableOpacity style={styles.showAnswerButtonWrapper} onPress={handleShowBack}>
                    <Text style={styles.showAnswerButtonText}>SHOW ANSWER</Text>
                </TouchableOpacity>
            )}
            {visible && (
                <>
                <TouchableOpacity style={styles.againButton} onPress={()=>handleNextCard(-1)}>
                    <Text style={styles.buttonText}>AGAIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.goodButton} onPress={()=>handleNextCard(1)}>
                    <Text style={styles.buttonText}>GOOD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.easyButton} onPress={()=>handleNextCard(2)}>
                    <Text style={styles.buttonText}>EASY</Text>
                </TouchableOpacity>
                </>
            )}
        </View>
    );
}

function Cards({route}) {
    const deckId=route.params.id;

    const [visible,setVisible]=useState(false);
    const [cards,setCards]=useState();
    const [counter,setCounter]=useState(0);

    useEffect(()=>{
        db.getNotes(setCards,deckId);
    },[]);

    if(cards)
        return ( 
            <View style={styles.container}>
                <View style={styles.answersCounter}>
                    <Text style={styles.easyCounter}>0</Text>
                    <Text style={styles.againCounter}>0</Text>
                    <Text style={styles.goodCounter}>0</Text>
                </View>

                <VisibleContext.Provider value={[visible,setVisible]}>
                    <CardContext.Provider value={[cards,counter,deckId,setCards,setCounter]}>
                        <SingleCard />
                        <Button />
                    </CardContext.Provider>
                </VisibleContext.Provider>
            </View>
        );
     else
        return (
            <View style={[styles.container,{
                justifyContent:'center',
                alignItems:'center',
            }]}>
                <Text style={{...theme.typo.b1,color:theme.colors.darkGray}}>There is no note here!</Text>
            </View>
        )
}

const VisibleContext=React.createContext();
const CardContext=React.createContext();

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:theme.colors.white,
    },
    answersCounter:{
        height:30,
        backgroundColor:'#B3E5FC',
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:16,
    },
    easyCounter:{
        ...theme.typo.h2,
        color:theme.colors.easy,
    },
    againCounter:{
        ...theme.typo.h2,
        color:theme.colors.again,
        marginLeft:5,
    },
    goodCounter:{
        ...theme.typo.h2,
        color:theme.colors.good,
        marginLeft:5,
    },
    cardWrapper:{
        paddingHorizontal:20,
        alignItems:'center',
    },
    frontWrapper:{
        paddingVertical:15,
    },
    backWrapper:{
        paddingVertical:15,
        width:'100%',
        borderTopWidth:1,
        borderColor:theme.colors.midGray,
        alignItems:'center'
    },
    cardText:{
        ...theme.typo.h1,
        color:theme.colors.black,
    },
    buttonsWrapper:{
        position:'absolute',
        bottom:0,
        flexDirection:'row',
    },
    showAnswerButtonWrapper:{
        backgroundColor:'#465A65',
        flex:1,
        height:45,
        justifyContent:'center',
        alignItems:'center',
    },
    showAnswerButtonText:{
        ...theme.typo.h2,
        color:theme.colors.white
    },
    againButton:{
        backgroundColor:theme.colors.again,
        flex:1,
        height:45,
        justifyContent:'center',
        alignItems:'center',
    },
    goodButton:{
        backgroundColor:theme.colors.good,
        flex:1,
        height:45,
        justifyContent:'center',
        alignItems:'center',
    },
    easyButton:{
        backgroundColor:'#03A9F5',
        flex:1,
        height:45,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonText:{
        ...theme.typo.b1,
        color:theme.colors.white
    },
});

export default Cards;