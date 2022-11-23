import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import theme from '../../../assets/theme'
import EmptyBox from '../../../assets/images/empty-box.png'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const EmptyLayout = () => {
  const {mode} = useSelector(selector => selector.nightMode);
  const navigation=useNavigation()

  return (
    <View style={[styles.container,theme.setBakground(mode,'background')]}>
      <View style={{opacity:0.6}}>
        <Image source={EmptyBox} style={styles.image} />
        <Text style={[styles.text,styles.title]}>Hmmm ...</Text>
        <Text style={styles.text}>There's no card here{"\n"}Go back and add new card.</Text>
      </View>
      <TouchableOpacity style={styles.buttonWrapper} onPress={()=>navigation.goBack()} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EmptyLayout

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        // opacity:0.5
    },
    image:{
        width:250,
        height:250,
    },
    text:{
        ...theme.typo.b1,
        color:'#738BAB',
        marginTop:10,
        textAlign: 'center'
    },
    title:{
        ...theme.typo.h1,
        fontSize:25
    },
    buttonWrapper:{
        backgroundColor:theme.colors.statusBar,
        alignItems:'center',
        paddingHorizontal:25,
        paddingVertical:10,
        marginTop:25,
        borderRadius:10,
    },
    buttonText:{
        ...theme.typo.b1,
        color:'white'
    },
})