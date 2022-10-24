import React from 'react';
import { Text, View,StyleSheet, TouchableNativeFeedback } from 'react-native';
import theme from '../../../assets/theme';
import { gestureHandlerRootHOC,Swipeable,RectButton,TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

FontAwesome.loadFont();

let rowRefs = new Map();

const Decks=gestureHandlerRootHOC(({navigation,decks,handleDeleteDeck})=> {
    //NightMode Colors!
    const {mode} = useSelector(selector => selector.nightMode);

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
                        if (ref && !rowRefs.get(item.id)) {
                          rowRefs.set(item.id, ref);
                        }
                    }}
                    renderRightActions={renderSwipeDelete} 
                    onSwipeableOpen={()=>{
                        [...rowRefs.entries()].forEach(([id, ref]) => {
                            ref.close();
                        });
                        handleDeleteDeck(item.id);
                    }}>

                    <TouchableNativeFeedback  
                        onPress={()=>navigation.navigate('Cards',{id:item.id,item:item})}
                        background={TouchableNativeFeedback.Ripple(theme.colors[mode].pressButton, false)}
                        >
                        <View 
                            style={[styles.deckWrapper,{
                                backgroundColor:theme.colors[mode].background,
                                borderBottomColor:theme.colors[mode].t3
                            }]}>
                            <Text style={[styles.deckTitle,{
                                color:theme.colors[mode].t1
                                }]}>{item.title}</Text>
                            <View style={styles.deckSide}>
                                <Text style={styles.deckCount}>{item.easy}</Text>
                                <Text style={styles.deckCount}>{item.again}</Text>
                                <Text style={styles.deckCount}>{item.good}</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
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
        // borderBottomColor:theme.colors.lightGray,
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:15,
        paddingVertical:10,
    },
    deckTitle:{
        ...theme.typo.h2,
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