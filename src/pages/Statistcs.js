import React, { useContext } from 'react';
import { View,Text,ScrollView,StyleSheet } from 'react-native';
import theme from '../../assets/theme';
import { ThemeContext } from '../context/ThemeContext';

const Statistcs = () => {
    //NightMode Colors!
    const {mode} = useContext(ThemeContext);

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