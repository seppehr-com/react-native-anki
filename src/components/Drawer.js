import React, { useState } from 'react';
import { View,Text,Dimensions,StyleSheet,Image, TouchableOpacity, Switch } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import theme from '../../assets/theme';
import DrawerLogo from '../../assets/images/drawer_logo.png'

FontAwesome.loadFont();

const width=Dimensions.get('window').width*0.7;

const RenderDrawer=()=>{
    const [nightMode,setNightMode]=useState(false);
    const toggleSwitch = () => setNightMode(previousState => !previousState);

    return ( 
        <View style={styles.drawerContainer}>
            <Image source={DrawerLogo} style={styles.drawerLogo} />

            <TouchableOpacity style={[styles.itemWrapper,styles.selectedItem]}>
                <FontAwesome name='list' size={20} color={theme.colors.statusBar} />
                <Text style={[styles.itemText,styles.selectedItemText]}>Decks</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemWrapper}>
                <FontAwesome name='search' size={20} color={theme.colors.black} />
                <Text style={styles.itemText}>Card browser</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemWrapper}>
                <FontAwesome name='bar-chart' size={20} color={theme.colors.black} />
                <Text style={styles.itemText}>Statistcs</Text>
            </TouchableOpacity>

            <View style={styles.separatorLine} />

            <View style={styles.itemWrapper}>
                <FontAwesome name='moon-o' size={20} color={theme.colors.black} />
                <Text style={styles.itemText}>Night Mode</Text>
                <Switch 
                    style={styles.switch} 
                    value={nightMode} 
                    onValueChange={toggleSwitch}
                 />
            </View>
            <TouchableOpacity style={styles.itemWrapper}>
                <FontAwesome name='gear' size={20} color={theme.colors.black} />
                <Text style={styles.itemText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemWrapper}>
                <FontAwesome name='question-circle' size={20} color={theme.colors.black} />
                <Text style={styles.itemText}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemWrapper}>
                <FontAwesome name='support' size={20} color={theme.colors.black} />
                <Text style={styles.itemText}>Support SimpleAnki</Text>
            </TouchableOpacity>
        </View>
     );
}

const Drawer = ({children,compRef}) => {
    return ( 
        <DrawerLayout
            drawerWidth={width}
            drawerPosition={DrawerLayout.positions.Left}
            drawerType="front"
            drawerBackgroundColor={theme.colors.white}
            renderNavigationView={()=><RenderDrawer />}
            ref={compRef}>
                
            {children}
        </DrawerLayout>
     );
}

export default Drawer;

const styles=StyleSheet.create({
    drawerContainer:{
        flex:1,
    },
    drawerLogo:{
        width:'100%',
    },
    itemWrapper:{
        flexDirection:'row',
        marginTop:5,
        height:40,
        paddingHorizontal:15,
        alignItems:'center',
    },
    itemText:{
        ...theme.typo.h3,
        marginLeft:20,
        color:theme.colors.black,
    },
    selectedItem:{
        backgroundColor:theme.colors.midGray,
    },
    selectedItemText:{
        color:theme.colors.statusBar,
    },
    separatorLine:{
        height:1,
        backgroundColor:theme.colors.lightGray,
        marginTop:10,
    },
    switch:{
        position:'absolute',
        right:10,
    },
});
 