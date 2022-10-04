import React, { useState } from 'react';
import {View,Text,TouchableOpacity,StyleSheet, TouchableNativeFeedback} from 'react-native';
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



const PreviewButton=({onPress})=>{
    return (
        <NativeButton onPress={onPress} marginRight={10}>
            <Entypo name="eye" size={20} color={'white'} />
        </NativeButton>
    ); 
}

const DoneButton=({onPress})=>{
    return (
        <NativeButton onPress={onPress} marginRight={0}>
            <FontAwesome name="check" size={20} color={'white'} />
        </NativeButton>
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
        <NativeButton onPress={onPress} marginRight={10}>
                <Entypo name="share" size={20} color={'white'} />
        </NativeButton>
    ); 
}

const EditButton=({onPress})=>{
    return (
        <NativeButton onPress={onPress} marginRight={10}>
            <FontAwesome name="pencil" size={20} color={'white'} />
        </NativeButton>
    ); 
}

const DeleteButton=({onPress})=>{
    return (
        <NativeButton onPress={onPress} marginRight={0}>
            <FontAwesome name="trash" size={20} color={'white'} />
        </NativeButton>
    ); 
}

const NativeButton=({onPress,marginRight,children})=>{
    return (
        <TouchableNativeFeedback onPress={onPress} background={TouchableNativeFeedback.Ripple('', true)}>
            <View style={[styles.button,{padding:3,marginRight:marginRight}]}>
                {children}
            </View>
        </TouchableNativeFeedback>
    );
}

const styles=StyleSheet.create({
    button:{
        marginRight:10,
        alignSelf:'center',
        justifyContent:'center'
    },
});

export {LeftButton,DoneButton,PreviewButton,ModifyCard};