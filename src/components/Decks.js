import React from 'react';
import { Text, View,StyleSheet, Pressable, Alert } from 'react-native';
import theme from '../../assets/theme';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { gestureHandlerRootHOC,RectButton } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Database from '../../modules/Database';

FontAwesome.loadFont();

const db=new Database();

let rowRefs = new Map();

const Decks=gestureHandlerRootHOC(({navigation,decks,handleRefresh})=> {
    const handleDeleteDeck=(id)=>{
        Alert.alert(
            "Delete this Deck!",
            "Are you sure ?!",
            [
              {
                text: "NO",
                style: "cancel"
              },
              {
                text: "YES",
                onPress: () => {
                    //Delete and reset the decks!
                    db.deleteDeck(id);
                    handleRefresh();
                }
              },
            ]
        );
    }
    
    const renderSwipeDelete=(progress, dragX)=>{
        return(
            <RectButton style={styles.deleteItemWrapper}>
                <FontAwesome name='trash' color={'white'} size={20} />
            </RectButton>
        );
    }

    return ( 
        <View style={styles.container}>
            {decks.map((item,index)=>(
                <Swipeable 
                    key={index} 
                    ref={ref => {
                        if (ref && !rowRefs.get(index)) {
                          rowRefs.set(index, ref);
                        }
                    }}
                    renderRightActions={renderSwipeDelete} 
                    onSwipeableOpen={()=>{
                        [...rowRefs.entries()].forEach(([index, ref]) => {
                            ref.close();
                        });
                        handleDeleteDeck(item.id);
                    }}>

                    <Pressable style={styles.deckWrapper} onPress={()=>navigation.navigate('Cards',{id:item.id,item:item})}>
                        <Text style={styles.deckTitle}>{item.title}</Text>
                        <View style={styles.deckSide}>
                            <Text style={styles.deckCount}>{item.easy}</Text>
                            <Text style={styles.deckCount}>{item.again}</Text>
                            <Text style={styles.deckCount}>{item.good}</Text>
                        </View>
                    </Pressable>
                </Swipeable>
            ))}
        </View>
     );
});

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    deckWrapper:{
        flexDirection:'row',
        borderBottomWidth:1,
        backgroundColor:theme.colors.white,
        borderBottomColor:theme.colors.lightGray,
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:15,
        paddingVertical:10,
    },
    deckTitle:{
        ...theme.typo.h1,
        color:theme.colors.black,
    },
    deckSide:{
        flexDirection:'row',
    },
    deckCount:{
        ...theme.typo.b2,
        color:theme.colors.midGray,
        marginLeft:2,
    },
    deleteItemWrapper:{
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'flex-end',
        paddingRight:10,
        width:'100%',
    },
    deleteItemText:{
        
    },
});

export default Decks;