import React, { useEffect, useRef } from 'react';
import { Modal as ReactModal , View,Text,StyleSheet, TouchableOpacity, Pressable, Animated } from 'react-native';
import theme from '../../assets/theme';

function Modal({children,style,visible,setVisible,onPress}) {
    const fadeAnim=useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        if(visible){
            Animated.timing(fadeAnim,{
                toValue:1,
                duration:400,
                useNativeDriver:true,
            }).start();   
        }
    },[visible]);

    const onClose=()=>{
        Animated.timing(fadeAnim,{
            toValue:0,
            duration:400,
            useNativeDriver:true,
        }).start();
        setTimeout(()=>{
            setVisible(false);
        },400);
    };

    return ( 
        <ReactModal
                transparent
                visible={visible}
            >
            <Pressable style={styles.modal} onPress={onClose}>
                <Animated.View style={[styles.contentWrapper,{opacity:fadeAnim}]}>
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
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    contentWrapper:{
        backgroundColor:theme.colors.white,
        marginHorizontal:20,
        paddingVertical:15,
        paddingHorizontal:20,
        elevation:10,
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
        ...theme.typo.h2,
        color:theme.colors.darkGray,
    },
});

export default Modal;