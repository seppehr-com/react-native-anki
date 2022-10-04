import React, { useState } from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

Entypo.loadFont();
FontAwesome.loadFont();

const LeftButton=({onPress,visible})=>{
    const [open,setOpen]=useState(false);
    const handleDrawer=()=>{
        if(!open){
            onPress.openDrawer();
            // setOpen(true);
            return;
        }
        onPress.closeDrawer();
        setOpen(false);
    }

    return (
        <TouchableOpacity style={[styles.button,{
            display:visible?'flex':'none',
        }]} onPress={handleDrawer}>
              <View style={styles.button}>
                  <Entypo name="menu" size={25} color={'white'} />
              </View>
        </TouchableOpacity>
    );
}

const RightButton=()=>{
    return (
        <TouchableOpacity  onPress={()=>{}} style={{marginRight:-15}}>
            <View style={styles.button}>
                <FontAwesome name="search" size={20} color={'white'} />
            </View>
        </TouchableOpacity>
    );
}


const PreviewButton=({onPress})=>{
    return (
        <TouchableOpacity onPress={onPress} style={{marginRight:5}}>
            <View style={styles.button}>
                <Entypo name="eye" size={20} color={'white'} />
            </View>
        </TouchableOpacity>
    ); 
}

const DoneButton=({onPress})=>{
    return (
        <TouchableOpacity onPress={onPress} style={{marginRight:-15}}>
            <View style={styles.button}>
                <FontAwesome name="check" size={20} color={'white'} />
            </View>
        </TouchableOpacity>
    ); 
}

const ModifyCard=({onDelete,onEdit,onShare})=>{
    return (
        <>
            <ShareButton onPress={onShare} />
            <EditButton onPress={onEdit} />
            <DeleteButton onPress={onDelete} />
        </>
    );
}

const ShareButton=({onPress})=>{
    return (
        <TouchableOpacity onPress={onPress} style={{marginRight:5}}>
            <View style={styles.button}>
                <Entypo name="share" size={20} color={'white'} />
            </View>
        </TouchableOpacity>
    ); 
}

const EditButton=({onPress})=>{
    return (
        <TouchableOpacity onPress={onPress} style={{marginRight:5}}>
            <View style={styles.button}>
                <FontAwesome name="pencil" size={20} color={'white'} />
            </View>
        </TouchableOpacity>
    ); 
}

const DeleteButton=({onPress})=>{
    return (
        <TouchableOpacity onPress={onPress} style={{marginRight:-15}}>
            <View style={styles.button}>
                <FontAwesome name="trash" size={20} color={'white'} />
            </View>
        </TouchableOpacity>
    ); 
}

const GoBackButton=({onPress})=>{
    return (
        <TouchableOpacity onPress={onPress} style={{marginRight:+15}}>
            <View style={styles.button}>
                <FontAwesome name="arrow-left" size={20} color={'white'} />
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

export {LeftButton,RightButton,DoneButton,PreviewButton,ModifyCard,GoBackButton,DeckTitle};