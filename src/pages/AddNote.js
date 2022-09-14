import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text,View,StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import theme from '../../assets/theme';
import { DoneButton, GoBackButton } from '../components/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown'
import Database from '../../modules/Database';


Entypo.loadFont();
MaterialCommunityIcons.loadFont();
FontAwesome.loadFont();

const db=new Database();

const Button=({name})=>{
    return(
        <TouchableOpacity style={styles.textEditorButton}>
            <FontAwesome name={name} size={20} color={'black'} />
        </TouchableOpacity>
    );
}


const AddNote=({navigation,navigation: { setOptions}}) =>{
    const [decks,setDecks]=useState([]);
    const [frontInput,setFrontInput]=useState('');
    const [backInput,setBackInput]=useState('');
    const [deckInput,setDeckInput]=useState(null);

    useLayoutEffect(() => {
        setOptions({
          headerRight: () => (
            <DoneButton onPress={handleDonePress} />
          ),
          headerLeft: () => (
            <GoBackButton onPress={()=>navigation.goBack()} />
          ),
        })
    });

    useEffect(()=>{
        db.getDecks(setDecks);
    },[]);

    const handleDonePress=()=>{
        if(!frontInput||!backInput||!deckInput){
            alert('Please enter the fields!');
            return false;
        }

        db.insertNote(deckInput,frontInput,backInput);
        navigation.goBack();
    }

    const decksArray=decks.map(item=>item.title);

    return ( 
        <View style={styles.container}>
            <ScrollView style={{padding:15}}>
                <View style={styles.dropDownGroup}>
                    <Text style={styles.labelTitle}>Type:</Text>
                    <View style={styles.dropDownWrapper}>
                        <Text style={[styles.dropDownText,{position:'relative',marginLeft:10}]}>Basic</Text>
                        <Entypo name="chevron-small-down" size={25} color={'black'} />
                    </View>
                </View>
                <View style={styles.dropDownGroup}>
                    <Text style={styles.labelTitle}>Deck:</Text>
                    <SelectDropdown
                        data={decks}
                        // defaultValue={decks.length>0?decks[0].title:null}
                        onSelect={(selectedItem) => {
                            setDeckInput(selectedItem.id)
                            // console.log(selectedItem.id)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem.title
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item.title
                        }}
                        buttonStyle={styles.dropDownWrapper}
                        buttonTextStyle={styles.dropDownText}
                        renderDropdownIcon={()=>(
                            <View style={{position:'absolute',right:0,}}>
                                <Entypo name="chevron-small-down" size={25} color={'black'} />
                            </View>
                        )}
                        rowTextStyle={{position:'absolute',left:0}}
                    />
                </View>

                <View style={styles.textBoxGroup}>
                    <View style={styles.textBoxLabel}>
                        <Text style={styles.labelTitle}>Front</Text>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="attachment" size={20} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <TextInput style={styles.textBox} multiline onChangeText={setFrontInput} />
                </View>
                <View style={styles.textBoxGroup}>
                <View style={styles.textBoxLabel}>
                        <Text style={styles.labelTitle}>Back</Text>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="attachment" size={20} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <TextInput style={styles.textBox} multiline onChangeText={setBackInput} />
                </View>

                <View style={{marginTop:15}}>
                    <View style={styles.extraBoxWrapper}>
                        <Text style={styles.extraBoxTitle}>Tags:</Text>
                    </View>

                    <View style={styles.extraBoxWrapper}>
                        <Text style={styles.extraBoxTitle}>Cards:  Card1</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.textEditorWrapper}>
                <Button name={'bold'} />
                <Button name={'italic'} />
                <Button name={'underline'} />
                <Button name={'text-width'} />
                <Button name={'align-left'} />
                <Button name={'align-center'} />
                <Button name={'align-right'} />
            </View>
        </View>
     );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:theme.colors.white,
    },
    dropDownGroup:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:15
    },
    labelTitle:{
        ...theme.typo.h2,
        color:theme.colors.black
    },
    dropDownWrapper:{
        flex:1,
        marginLeft:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:theme.colors.white,
    },
    dropDownText:{
        fontFamily:'OpenSans-Regular',
        fontSize:18,
        color:theme.colors.black,
        position:'absolute',
    },
    textBoxGroup:{
        marginTop:15,
    },
    textBoxLabel:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    textBox:{
        color:'black',
        borderBottomColor:theme.colors.black,
        borderBottomWidth:1,
        fontSize:18,
    },
    extraBoxWrapper:{
        marginTop:10,
        backgroundColor:theme.colors.midGray,
        paddingVertical:6,
        paddingHorizontal:10,
        borderRadius:5,
    },
    extraBoxTitle:{
        ...theme.typo.b2,
        fontSize:16,
        color:theme.colors.black
    },
    textEditorWrapper:{
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:theme.colors.midGray,
        height:45,
        width:'100%',
    },
    textEditorButton:{
        
    },
});

export default AddNote;