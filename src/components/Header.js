import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

Entypo.loadFont();
FontAwesome.loadFont();

const LeftButton=()=>{
    return (
      <TouchableOpacity style={styles.button}>
            <View style={styles.button}>
                <Entypo name="menu" size={25} color={'white'} />
            </View>
      </TouchableOpacity>
    );
}

const RightButton=()=>{
    return (
        <TouchableOpacity onPress={()=>alert('clicked')} style={{marginRight:-15}}>
            <View style={styles.button}>
                <FontAwesome name="gear" size={25} color={'white'} />
            </View>
        </TouchableOpacity>
    );   
}

const DeckTitle=()=>{
    return (
        <View>
           <Text> Deck Title</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    button:{
        marginRight:10,
        alignSelf:'center',
        justifyContent:'center'
    },
});

export {LeftButton,RightButton,DeckTitle};