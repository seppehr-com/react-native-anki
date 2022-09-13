import React from 'react';
import { Text, View,StyleSheet, Pressable } from 'react-native';
import theme from '../../assets/theme';

const Decks=({navigation,decks})=> {
    return ( 
        <View style={styles.container}>
            {decks.map((item,index)=>(
                <Pressable key={index} style={styles.deckWrapper} onPress={()=>navigation.navigate('Cards',{id:item.id,item:item})}>
                    <Text style={styles.deckTitle}>{item.title}</Text>
                    <View style={styles.deckSide}>
                        <Text style={styles.deckCount}>{item.easy}</Text>
                        <Text style={styles.deckCount}>{item.again}</Text>
                        <Text style={styles.deckCount}>{item.good}</Text>
                    </View>
                </Pressable>
            ))}
        </View>
     );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    deckWrapper:{
        flexDirection:'row',
        borderBottomWidth:1,
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
});

export default Decks;