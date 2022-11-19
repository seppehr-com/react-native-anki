import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Search = () => {
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

    // useEffect(()=>{
    //     db.getDecks(setDecksList,search);
    // },[decksList,search]);
    return (
        <View>
        <Text>Search</Text>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({})