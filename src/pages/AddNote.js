import React from 'react';
import { Text,View,StyleSheet } from 'react-native';
import theme from '../../assets/theme';


function AddNote({navigation}) {
    return ( 
        <View style={styles.container}>
            <Text style={{...theme.typo.b1,color:theme.colors.darkGray}}>ADD NOTE!</Text>
        </View>
     );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:theme.colors.white,
        justifyContent:'center',
        alignItems:'center',
    }
});

export default AddNote;