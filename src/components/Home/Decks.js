import React from 'react';
import { Text, View,StyleSheet, TouchableNativeFeedback } from 'react-native';
import theme from '../../../assets/theme';
import { gestureHandlerRootHOC,Swipeable,RectButton,TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

FontAwesome.loadFont();

let rowRefs = new Map();

const Decks=gestureHandlerRootHOC(({decks,handleDeleteDeck})=> {
    //NightMode Colors!
    const {mode} = useSelector(selector => selector.nightMode);

    const navigation=useNavigation();

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
                        let ref=rowRefs.get(item.id);
                        ref.close();

                        handleDeleteDeck(item.id,rowRefs);
                    }}>

                    <TouchableNativeFeedback  
                        onPress={()=>navigation.navigate('Cards',{id:item.id,item:item})}
                        onLongPress={()=>console.log('LongPress')}
                        background={TouchableNativeFeedback.Ripple(theme.modeColor(mode,'pressButton'), false)}
                        >
                        <View 
                            style={[styles.deckWrapper,{
                                backgroundColor:theme.modeColor(mode,'background'),
                                borderBottomColor:theme.modeColor(mode,'separator')
                            }]}>
                            <Text numberOfLines={1} style={[styles.deckTitle,theme.setColor(mode,'t1')]}>{item.title}</Text>
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
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:15,
        paddingVertical:10,
    },
    deckTitle:{
        ...theme.typo.h2,
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