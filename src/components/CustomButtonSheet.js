import { Pressable, StyleSheet, Text, View ,BackHandler} from 'react-native'
import React,{ useEffect } from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';
import theme from '../../assets/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const FormControlBottomSheet=({onPress,children})=>{
  return(
    <View style={styles.formContainer}>
      {children}

      <TouchableOpacity style={[styles.buttonWrapper,styles.formSubmit]} onPress={onPress} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

export const ImagePickerBottomSheet=({sheetRef,onGallery,onCamera})=>{
  const handleGallery=()=>{
    onGallery();
    sheetRef.current.close();
  }
  const handleCamera=()=>{
    onCamera();
    sheetRef.current.close();
  }

  return(
    <View style={styles.imagePickerContainer}>
      <TouchableOpacity style={styles.buttonWrapper} onPress={handleGallery} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Choose from Library</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonWrapper} onPress={handleCamera} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomButtonSheet=React.forwardRef((props,ref)=> {
  //NightMode
  const {mode} = useSelector(selector => selector.nightMode);

  //BackButton
  useEffect(() => {
    const backAction = () => {
        try{
          ref.current.close();
        }
        catch(e){
          //backHandler Error
        }
        return true;
    };

    if(props.index==0){
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
      
        return () => backHandler.remove();
    }
  }, [props.index]);

  return (
    <Pressable style={[styles.modal,props.index==0?styles.extraModal:{}]} onPress={()=>{
        ref.current.close()
      }}>
        <Pressable style={{height:props.snapPoints[0]+50}}>
          <BottomSheet
              ref={ref}
              index={props.index}
              snapPoints={props.snapPoints}
              onClose={()=>props.setIndex(-1)}
              backgroundStyle={theme.setBakground(mode,'background')}
              handleIndicatorStyle={theme.setBakground(mode,'t1')}
              style={{zIndex:2000}}
              enablePanDownToClose
              >
                {props.children}
          </BottomSheet>
        </Pressable>
      </Pressable>
  )
})

const styles = StyleSheet.create({
    modal:{
      position:'absolute',
      bottom:0,
      top:0,
      zIndex:1000,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent:'flex-end'
    },
    extraModal:{
        left:0,
        right:0,
    },
    imagePickerContainer: {
        flex: 1,
        justifyContent:'center',
        paddingHorizontal:15,
    },
    formContainer:{
      flex: 1,
      justifyContent:'center',
      marginTop:-30,
      paddingHorizontal:20,
    },
    buttonWrapper:{
      width:'100%',
      backgroundColor:theme.colors.statusBar,
      alignItems:'center',
      paddingVertical:15,
      marginBottom:15,
      borderRadius:10,
    },
    formSubmit:{
      marginTop:20,
      marginBottom:-15,
    },
    buttonText:{
      ...theme.typo.b1,
      color:'white'
    },
})