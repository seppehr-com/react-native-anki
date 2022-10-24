import React, { useContext } from 'react';
import { View,Text,ScrollView,StyleSheet } from 'react-native';
import theme from '../../assets/theme';
import { ThemeContext } from '../context/ThemeContext';

const Help = () => {
    //NightMode Colors!
    const {mode} = useContext(ThemeContext);

    return ( 
        <ScrollView style={[styles.container,{
            backgroundColor:theme.colors[mode].background
            }]}>
            <View style={styles.contentWrapper}>
                <Text style={[styles.titleText,{
                    color:theme.colors[mode].t2,
                }]}>What is the Anki?</Text>
                <Text style={[styles.bodyText,{
                    color:theme.colors[mode].t2,
                }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

                <Text style={[styles.titleText,{
                    color:theme.colors[mode].t2,
                }]}>How do we use the Anki?</Text>
                <Text style={[styles.bodyText,{
                    color:theme.colors[mode].t2,
                }]}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Text>
                
                <Text style={[styles.titleText,{
                    color:theme.colors[mode].t2,
                }]}>Where does Anki come from?</Text>
                <Text style={[styles.bodyText,{
                    color:theme.colors[mode].t2,
                }]}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Text>
            </View>
        </ScrollView>
     );
}
 
export default Help;

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