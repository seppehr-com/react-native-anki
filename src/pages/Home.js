import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View ,StyleSheet, StatusBar, ScrollView, TextInput, Alert,ToastAndroid,Vibration} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Decks from '../components/Home/Decks';
import New from '../components/Home/New';
import Modal from '../components/Modal';
import theme from '../../assets/theme';
import Database from '../../modules/Database';
import { useSelector } from 'react-redux';

MaterialCommunityIcons.loadFont();

//Create tables One!
const db= new Database();

const Home=({navigation})=> {
    //NightMode Colors!
    const {mode} = useSelector(selector => selector.nightMode);
    
    const [visibleModal,setVisibleModal] = useState(false);
    const [deckTextInput,setDeckTextInput] = useState('');
    const [decksList,setDecksList]=useState([]);

    //SearchInput
    const [search,setSearch]=useState('');

    // useLayoutEffect(()=>{
    //     navigation.setOptions({
    //         // headerLeft:()=><LeftButton onPress={drawerRef} visible={true} />,
    //         headerSearchBarOptions:{
    //             headerIconColor:'white',
    //             textColor:'white',
    //             hintTextColor:'white',
    //             obscureBackground:false,
    //             shouldShowHintSearchIcon:false,
    //             placeholder:'Search',
    //             barTintColor:theme.colors.header,
    //             onChangeText: (event) => setSearch(event.nativeEvent.text),
    //             // onFocus:()=>{
    //             //   setTitle(null);
    //             //   setHeaderLeftVisible(false);
    //             // },
    //             // onClose:(route)=>{
    //             //   setTitle(route.name);
    //             //   setHeaderLeftVisible(true);
    //             // },
    //           },
    //     });
    // },[navigation]);

    useEffect(()=>{
        db.getDecks(setDecksList,search);
    },[decksList,search]);

    const handleCreateDeck=()=>{
        if(!deckTextInput){
            ToastAndroid.showWithGravityAndOffset(
                'Please enter a Title!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            Vibration.vibrate(500,false);
            return false;
        }

        db.insertDeck(deckTextInput);
        db.getDecks(setDecksList);
        setDeckTextInput('');

        //Create message!
        ToastAndroid.showWithGravityAndOffset(
            'Successfully created!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    }

    const handleDeleteDeck=(id)=>{
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
                    db.deleteDeck(id);
                    db.getDecks(setDecksList);
                }
              },
            ]
        );
    }
    
    return ( 
        <View style={[styles.container,{
            backgroundColor:theme.colors[mode].background
            }]}>
            <StatusBar backgroundColor="#0288D1" />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Decks navigation={navigation} decks={decksList} handleDeleteDeck={handleDeleteDeck} />
            </ScrollView>

            <Modal visible={visibleModal} setVisible={setVisibleModal} onPress={handleCreateDeck}>
                <Text style={[styles.createTitle,{color:theme.colors[mode].t1}]}>Create Deck</Text>
                <TextInput style={[styles.createInput,{
                    borderBottomColor:theme.colors[mode].t1,
                    color:theme.colors[mode].t1
                    }]} onChangeText={setDeckTextInput} />
            </Modal>
            <New onOpenModal={()=>setVisibleModal(true)} navigation={navigation} />
        </View>
     );
};

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
        color:theme.colors.darkGray
    },
    buttonsModal:{
        justifyContent:'flex-end',
    },
    createTitle:{
        ...theme.typo.h2,
        color:theme.colors.black
    },
    createInput:{
        marginTop:20,
        borderBottomWidth:1,
        borderBottomColor:theme.colors.black,
        fontSize:18,
        color:theme.colors.black,
    },
});

export default Home;