import React, { useState } from 'react';
import { Text, View ,StyleSheet, StatusBar, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../assets/theme/index';

MaterialCommunityIcons.loadFont();

const Button = ({onPress,style,icon}) =>{
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <MaterialCommunityIcons name={icon.name} size={icon.size} color={'white'} />
        </TouchableOpacity>
    );
}

export default ButtonsWrapper = ({onOpenModal,navigation}) =>{
    const [addClick,setAddClick] = useState(false); 

    const handlePress=()=>{
        setAddClick(!addClick);
    }
    const handleOpenModal=()=>{
        onOpenModal();
        handlePress();
    }
    const handleAddNote=()=>{
        navigation.navigate('Add Note');
        handlePress();
    }
    return (
        <View style={styles.buttonWrapper}>
            <View 
                transparent
                style={[styles.buttonsModal,{
                    display:addClick?'flex':'none',
                }]}
                >
                <View style={styles.childButtonsWrapper}>
                    <Text style={styles.buttonTextSide}>Create Deck</Text>
                    <Button style={styles.childButton} icon={{
                        name:"folder-plus",
                        size:15,
                    }} 
                        onPress={handleOpenModal}
                    />
                </View>
                
                <View style={styles.childButtonsWrapper}>
                    <Text style={styles.buttonTextSide}>Add Note</Text>
                    <Button style={styles.childButton} 
                        onPress={handleAddNote}
                        icon={{
                            name:"plus",
                            size:15,
                    }} />
                </View>
            </View>
            <Button style={styles.addButton} onPress={handlePress} icon={{
                name:addClick?"close":"plus",
                size:22,
            }} />
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:theme.colors.white,
    },
    buttonWrapper:{
        position:'absolute',
        right:20,
        bottom:30,
        justifyContent:'flex-end',
        alignItems:'flex-end',
    },
    addButton:{
        backgroundColor:theme.colors.statusBar,
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        elevation:6,
    },
    childButtonsWrapper:{
        flexDirection:'row',
        marginBottom:20,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    childButton:{
        backgroundColor:theme.colors.statusBar,
        width:40,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        elevation:6,
        marginLeft:15,
    },
    buttonTextSide:{
        ...theme.typo.h2,
        color:theme.colors.darkGray
    },
    buttonsModal:{
        justifyContent:'flex-end',
    },
    createTitle:{
        ...theme.typo.h1,
        color:theme.colors.black
    },
    createInput:{
        marginTop:20,
        borderBottomWidth:2,
        borderBottomColor:theme.colors.black,
        fontSize:18,
    },
});