import React from 'react';
import { View,Text,ScrollView,StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import theme from '../../assets/theme';

const Statistcs = () => {
    //NightMode Colors!
    const {mode} = useSelector(selector => selector.nightMode);

    return ( 
        <ScrollView style={[styles.container,{
            backgroundColor:theme.colors[mode].background
            }]}>
        </ScrollView>
     );
}
 
export default Statistcs;

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    contentWrapper:{
        padding:20,
    },
    titleText:{
        ...theme.typo.h1,
    },
    bodyText:{
        ...theme.typo.b2,
        paddingVertical:10,
    },
});