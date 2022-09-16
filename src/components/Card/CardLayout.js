import React from 'react';
import { Text,View,StyleSheet, TouchableOpacity,Alert,ActivityIndicator } from 'react-native';


const CardLayout = () => {
    return ( 
        <View>

        </View> 
    );
}
 
export default CardLayout;

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