import React from 'react';
import { Modal as ReactModal , View,Text,StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../../assets/theme';

function Modal({children,style,visible,onPress,onClose}) {
    return ( 
        <ReactModal
                transparent
                visible={visible}
            >
            <View style={styles.modal}>
                <View style={styles.contentWrapper}>
                    {children}
                    <View style={styles.buttonsWrapper}>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onPress}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ReactModal>
     );
}

const styles=StyleSheet.create({
    modal:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    contentWrapper:{
        backgroundColor:theme.colors.white,
        width:'80%',
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