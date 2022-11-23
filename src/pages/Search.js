import { Alert, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState ,useEffect} from 'react'
import { useSelector } from 'react-redux';
import theme from '../../assets/theme';
import { TextInput } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Database from '../../modules/Database';
import Decks from '../components/Home/Decks';

FontAwesome.loadFont();

const db= new Database();

const SearchBar=({setSearch})=>{
    //NightMode Colors!
    const {mode} = useSelector(selector => selector.nightMode);

    return (
        <View style={[styles.searchWrapper,{borderBottomColor:theme.modeColor(mode,'separator')}]}>
            <TextInput style={[styles.searchInput,theme.setColor(mode,'t1')]} placeholder='Search...' placeholderTextColor={theme.modeColor(mode,'t1')} onChangeText={setSearch}/>
            <TouchableOpacity style={styles.searchButton}>
                <FontAwesome name='search' color={theme.modeColor(mode,'icon')} size={18} />
            </TouchableOpacity>
        </View>
    )
}
const Search = ({navigation}) => {
    //NightMode Colors!
    const {mode} = useSelector(selector => selector.nightMode);
    const [decksList,setDecksList] =useState([]);
    const [search,setSearch]=useState(' ');

    useEffect(()=>{
        db.getDecks(setDecksList,search);
    },[search]);

    //temporarily
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
            <SearchBar setSearch={setSearch} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Decks decks={decksList} handleDeleteDeck={handleDeleteDeck} />
            </ScrollView>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    searchWrapper:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        borderBottomWidth:1,
    },
    searchInput:{
        ...theme.typo.b2,
        flex:1,
    },
    searchButton:{},
})