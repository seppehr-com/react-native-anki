import React, { createRef, useEffect, useLayoutEffect, useState } from 'react';
import { Text, View ,StyleSheet, StatusBar, ScrollView, TextInput, Alert,ToastAndroid,Vibration, Button} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Decks from '../components/Home/Decks';
import New from '../components/Home/New';
import Modal from '../components/Modal';
import theme from '../../assets/theme';
import Database from '../../modules/Database';
import { useSelector } from 'react-redux';
import CustomButtonSheet, { FormControlBottomSheet } from '../components/CustomButtonSheet';
import { useIsFocused } from '@react-navigation/native';

MaterialCommunityIcons.loadFont();

//Create tables One!
const db= new Database();

const Home=({navigation})=> {
    //NightMode Colors!
    const {mode} = useSelector(selector => selector.nightMode);
    
    const [deckTextInput,setDeckTextInput] = useState('');
    const [decksList,setDecksList]=useState([]);

    //BottomSheet
    const sheetRef = createRef(null);
    const [sheetIndex,setSheetIndex]=useState(-1);

    //Refresh Page After Go Back
    const isVisible = useIsFocused();
    useEffect(()=>{
        db.getDecks(setDecksList);
    },[isVisible]);

    const handleCreateDeck=()=>{
        if(!deckTextInput
            ||deckTextInput.trim()==''){
            ToastAndroid.showWithGravityAndOffset(
                'Please enter a Title!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            Vibration.vibrate(100,false);
            return false;
        }

        db.insertDeck(deckTextInput.trim());
        db.getDecks(setDecksList);
        setDeckTextInput('');
        sheetRef.current.close()

        //Create message!
        ToastAndroid.showWithGravityAndOffset(
            'Successfully created!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    }

    const handleDeleteDeck=(id,rowRefs)=>{
        Alert.alert(
            "Delete this Deck!",
            "Are you sure ?!",
            [
              {
                text: "NO",
                style: "cancel"
              },
              {
                text: "YES",
                onPress: () => {
                    //Delete and reset the decks!
                    try{
                        rowRefs.delete(id);
                        db.deleteDeck(id);
                        db.getDecks(setDecksList);

                        //Create message!
                        ToastAndroid.showWithGravityAndOffset(
                            'Successfully deleted!',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        );
                    }catch(e){
                        
                    }
                }
              },
            ]
        );
    }
    
    return ( 
        <View style={[styles.container,theme.setBakground(mode,'background')]}>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Decks decks={decksList} handleDeleteDeck={handleDeleteDeck} />
            </ScrollView>

            <New onOpenModal={()=>setSheetIndex(0)} navigation={navigation} />

            <CustomButtonSheet
                ref={sheetRef}
                index={sheetIndex}
                setIndex={setSheetIndex}
                snapPoints={[210]}
            >
                <FormControlBottomSheet onPress={handleCreateDeck} sheetRef={sheetRef}>
                    <Text style={[styles.createTitle,theme.setColor(mode,'t1')]}>Create Deck</Text>
                    <TextInput style={[styles.createInput,{
                        borderBottomColor:theme.modeColor(mode,'t1'),
                        color:theme.modeColor(mode,'t1')
                        }]} 
                        placeholder='Title (e.g: Daily Words)' 
                        placeholderTextColor={theme.modeColor(mode,'t3')} 
                        value={deckTextInput} 
                        onChangeText={setDeckTextInput} 
                    />
                </FormControlBottomSheet>
            </CustomButtonSheet>
        </View>
     );
};

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
    },
    addButton:{
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
    },
    buttonsModal:{
        justifyContent:'flex-end',
    },
    createTitle:{
        ...theme.typo.h2,
    },
    createInput:{
        marginTop:20,
        borderBottomWidth:1,
        fontSize:18,
    },
});

export default Home;