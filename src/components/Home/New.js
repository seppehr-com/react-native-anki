import React, { useRef, useState } from 'react';
import { Text, View ,StyleSheet, TouchableOpacity, Modal, Pressable, Animated} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import theme from '../../../assets/theme/index';
import Animation from '../../../modules/Animation';

MaterialCommunityIcons.loadFont();
const anim=new Animation();

const Button = ({onPress,style,icon}) =>{
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <MaterialCommunityIcons name={icon.name} size={icon.size} color={'white'} />
        </TouchableOpacity>
    );
}

export default New = ({onOpenModal,navigation}) =>{
    //NightMode Colors!
    const {mode} = useSelector(selector => selector.nightMode);

    const [visible,setVisible] = useState(false); 
    const fadeAnim=useRef(new Animated.Value(0)).current;

    const handlePress=()=>{
        if(!visible){
            anim.fadeIn(fadeAnim,setVisible);
            return true;
        }
        anim.fadeOut(fadeAnim,setVisible);
    }
    const handleOpenModal=()=>{
        handlePress();
        onOpenModal();
    }
    const handleAddNote=()=>{
        navigation.navigate('Add Note');
        handlePress();
    }
    return (
        <View style={styles.buttonWrapper}>
            {visible&& (
                <>
                <Animated.View style={[styles.childButtonsWrapper,{opacity:fadeAnim}]}>
                    <Text style={[styles.buttonTextSide,theme.setColor(mode,'t2')]}>Create Deck</Text>
                    <Button style={styles.childButton} icon={{
                        name:"folder-plus",
                        size:15,
                    }} 
                        onPress={handleOpenModal}
                    />
                </Animated.View>
                        
                <Animated.View style={[styles.childButtonsWrapper,{opacity:fadeAnim}]}>
                    <Text style={[styles.buttonTextSide,theme.setColor(mode,'t2')]}>Add Note</Text>
                    <Button style={styles.childButton} 
                        onPress={handleAddNote}
                        icon={{
                            name:"plus",
                            size:15,
                    }} />
                </Animated.View>
                </>
            )}
            <Button style={[styles.addButton]} onPress={handlePress} icon={{
                name:visible?"close":"plus",
                size:22,
            }} />
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    buttonWrapper:{
        position:'absolute',
        right:20,
        bottom:30,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        // zIndex:100,
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
        color:theme.colors.white
    },
});