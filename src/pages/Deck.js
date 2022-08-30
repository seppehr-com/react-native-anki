import React, { useContext, useState } from 'react';
import { Text,View,StyleSheet, TouchableOpacity } from 'react-native';
import {notes} from '../../assets/data/default';
import theme from '../../assets/theme';

const Card=()=>{
    const [visible]=useContext(VisibleContext);
    const [card]=useContext(CardContext);

    return (
        <View style={styles.cardWrapper}>
            <View style={styles.frontWrapper}>
                <Text style={styles.cardText}>{card.frontText}</Text>
            </View>
            <View style={[styles.backWrapper,{
                display:visible?'flex':'none'
            }]}>
                <Text style={styles.cardText}>{card.backText}</Text>
            </View>
        </View>
    );
}

const Button=()=>{
    const [visible,setVisible]=useContext(VisibleContext);
    const [card,setCard]=useContext(CardContext);

    const handleShowBack=()=>{
        setVisible(true);
    }

    function handleNextCard(status){
        setCard(nextCard(card));
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
                <TouchableOpacity style={styles.againButton} onPress={()=>handleNextCard('again')}>
                    <Text style={styles.buttonText}>AGAIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.goodButton} onPress={()=>handleNextCard('good')}>
                    <Text style={styles.buttonText}>GOOD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.easyButton} onPress={()=>handleNextCard('easy')}>
                    <Text style={styles.buttonText}>EASY</Text>
                </TouchableOpacity>
                </>
            )}
        </View>
    );
}

function Deck({route}) {
    const {id}=route.params;

    const [visible,setVisible]=useState(false);
    const [card,setCard]=useState(getCard());

    function getCard(){
        const cards=notes.filter((note)=>note.deckId==id);
        return cards[0];
    }

    if(getCard()!=undefined)
        return ( 
            <View style={styles.container}>
                <View style={styles.answersCounter}>
                    <Text style={styles.easyCounter}>0</Text>
                    <Text style={styles.againCounter}>0</Text>
                    <Text style={styles.goodCounter}>0</Text>
                </View>

                <VisibleContext.Provider value={[visible,setVisible]}>
                    <CardContext.Provider value={[card,setCard]}>
                        <Card />
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

function nextCard(card){
    const newCard=notes.find((note)=>note.deckId==card.deckId&&note.id>card.id);
    if(newCard==undefined)
        return notes.find((note)=>note.deckId==card.deckId);
    return newCard;
}

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

export default Deck;