import React, { useEffect, useRef , useContext } from 'react';
import { Modal as ReactModal , View,Text,StyleSheet, TouchableOpacity, Pressable, Animated } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import theme from '../../assets/theme';
import Animation from '../../modules/Animation';

const anim=new Animation();

function Modal({children,visible,setVisible,onPress}) {
    //NightMode Colors!
    const {mode} = useContext(ThemeContext);

    const fadeAnim=useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        if(visible) 
            anim.fadeIn(fadeAnim,setVisible);
    },[visible]);

    const onClose=()=> anim.fadeOut(fadeAnim,setVisible);

    return ( 
        <ReactModal
                transparent
                visible={visible}
            >
            <Pressable style={styles.modal} onPress={onClose}>
                <Animated.View style={[styles.contentWrapper,{
                    opacity:fadeAnim,
                    backgroundColor:theme.colors[mode].background
                    }]}>
                    {children}
                    <View style={styles.buttonsWrapper}>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>{
                            onClose();
                            onPress();
                        }}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Pressable>
        </ReactModal>
     );
}

const styles=StyleSheet.create({
    modal:{
        flex: 1, 
        justifyContent: 'center', 
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    contentWrapper:{
        backgroundColor:theme.colors.white,
        marginHorizontal:20,
        paddingVertical:15,
        paddingHorizontal:20,
        elevation:10,
        borderRadius:15,
    },
    buttonsWrapper:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        marginTop:25,
    },
    button:{
        marginLeft:15,
    },
    buttonText:{
        ...theme.typo.h3,
        color:theme.colors.darkGray,
    },
});

export default Modal;