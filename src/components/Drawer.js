import React, { createContext, useContext } from 'react';
import { View,Text,Dimensions,StyleSheet,Image, TouchableOpacity, Switch, TouchableNativeFeedback } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ThemeContext,ThemeProvider } from '../context/ThemeContext';
import theme from '../../assets/theme';
import DrawerLogo from '../../assets/images/drawer_logo.png'

FontAwesome.loadFont();

const width=Dimensions.get('window').width*0.7;

const NativeButton=({icon,title,onPress})=>{
    const {mode}=useContext(ThemeContext);

    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={styles.itemWrapper}>
                <FontAwesome name={icon} size={20} color={theme.colors[mode].icon} />
                <Text style={[styles.itemText,{
                    color:theme.colors[mode].t1
                    }]}>{title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const RenderDrawer=()=>{
    const {nightMode,toggleSwitch,mode}=useContext(ThemeContext);

    return ( 
        <View style={styles.drawerContainer}>
            <Image source={DrawerLogo} style={styles.drawerLogo} />

            <TouchableOpacity style={[styles.itemWrapper,styles.selectedItem]}>
                <FontAwesome name='list' size={20} color={theme.colors.statusBar} />
                <Text style={[styles.itemText,styles.selectedItemText]}>Decks</Text>
            </TouchableOpacity>

            <NativeButton title='Card browser' icon='search' />
            <NativeButton title='Statistcs' icon='bar-chart' />

            <View style={[styles.separatorLine,{
                backgroundColor:theme.colors[mode].t3
            }]} />

            <View style={styles.itemWrapper}>
                <FontAwesome name='moon-o' size={20} color={theme.colors[mode].icon} />
                <Text style={[styles.itemText,{
                    color:theme.colors[mode].t1
                    }]}>Night Mode</Text>
                <Switch 
                    style={styles.switch} 
                    trackColor={{ false: "#C9C9C9", true: "#767577" }}
                    thumbColor={nightMode ? theme.colors.statusBar : "#f4f3f4"}
                    value={nightMode} 
                    onValueChange={toggleSwitch}
                 />
            </View>

            <NativeButton title='Settings' icon='gear' />
            <NativeButton title='Help' icon='question-circle' />
            <NativeButton title='Support SimpleAnki' icon='support' onPress={()=>alert("Support")} />

        </View>
     );
}

export const Drawer = ({children,compRef}) => {
    const {mode}=useContext(ThemeContext);

    return ( 
        <DrawerLayout
            drawerWidth={width}
            drawerPosition={DrawerLayout.positions.Left}
            drawerType="front"
            drawerBackgroundColor={theme.colors[mode].background}
            renderNavigationView={()=><RenderDrawer />}
            edgeWidth={100}
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
        marginTop:10,
    },
    switch:{
        position:'absolute',
        right:10,
    },
});
 