import React, { useRef, useState } from 'react';
import { Text, View ,StyleSheet, TouchableOpacity, Modal, Pressable, Animated} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../assets/theme/index';
import Animation from '../../modules/Animation';

MaterialCommunityIcons.loadFont();
const anim=new Animation();

const Button = ({onPress,style,icon}) =>{
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <MaterialCommunityIcons name={icon.name} size={icon.size} color={'white'} />
        </TouchableOpacity>
    );
}

export default ButtonsWrapper = ({onOpenModal,navigation}) =>{
    const [visible,setVisible] = useState(false); 
    const fadeAnim=useRef(new Animated.Value(0)).current;

    const handlePress=()=>{
        if(!visible){
            anim.fadeIn(fadeAnim,400,setVisible);
            return true;
        }
        anim.fadeOut(fadeAnim,300,setVisible);
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
            <Modal 
                transparent
                visible={visible}
                >
                <Pressable style={styles.modalBackground} onPress={handlePress}>
                    <Animated.View style={[styles.childButtonsWrapper,{opacity:fadeAnim}]}>
                        <Text style={styles.buttonTextSide}>Create Deck</Text>
                        <Button style={styles.childButton} icon={{
                            name:"folder-plus",
                            size:15,
                        }} 
                            onPress={handleOpenModal}
                        />
                    </Animated.View>
                    
                    <Animated.View style={[styles.childButtonsWrapper,{opacity:fadeAnim}]}>
                        <Text style={styles.buttonTextSide}>Add Note</Text>
                        <Button style={styles.childButton} 
                            onPress={handleAddNote}
                            icon={{
                                name:"plus",
                                size:15,
                        }} />
                    </Animated.View>
                    <Button style={[styles.addButton,{position:'absolute',right:20,bottom:30}]} onPress={handlePress} icon={{
                        name:"close",
                        size:22,
                    }} />
                </Pressable>
            </Modal>
            <Button style={[styles.addButton,{display:visible?'none':'flex'}]} onPress={handlePress} icon={{
                name:"plus",
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
        zIndex:100,
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
    modalBackground:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.4)',
        justifyContent:'flex-end',
        paddingRight:20,
        paddingBottom:80,
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