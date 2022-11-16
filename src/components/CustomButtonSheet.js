import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';
import theme from '../../assets/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ImagePickerBottomSheet=({onGallery,onCamera})=>{
  return(
    <View style={styles.imagePickerContainer}>
      <TouchableOpacity style={styles.buttonWrapper} onPress={onGallery} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Choose from Library</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonWrapper} onPress={onCamera} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomButtonSheet=React.forwardRef((props,ref)=> {
  //NightMode
  const {mode} = useSelector(selector => selector.nightMode);

  return (
    <Pressable style={[styles.modal,props.index===0?styles.extraModal:{}]} onPress={()=>{
        ref.current.close()
      }}>
        <BottomSheet
            ref={ref}
            index={props.index}
            snapPoints={props.snapPoints}
            onClose={()=>props.setIndex(-1)}
            backgroundStyle={{backgroundColor:theme.colors[mode].background}}
            handleIndicatorStyle={{backgroundColor:theme.colors[mode].t1}}
            enablePanDownToClose
            >
              {props.children}
        </BottomSheet>
     </Pressable>
  )
})

const styles = StyleSheet.create({
    modal:{
      position:'absolute',
      bottom:0,
      top:0,
      backgroundColor: 'rgba(0,0,0,0.4)'
    },
    extraModal:{
        left:0,
        right:0,
    },
    imagePickerContainer: {
        flex: 1,
        // alignItems: 'center',
        justifyContent:'center',
        paddingHorizontal:15,
    },
    buttonWrapper:{
      width:'100%',
      backgroundColor:theme.colors.statusBar,
      alignItems:'center',
      paddingVertical:15,
      marginBottom:15,
      borderRadius:35,
    },
    buttonText:{
      ...theme.typo.b1,
      color:'white'
    },
})