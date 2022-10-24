import React, { createContext, useContext, useState } from 'react';
import { View,Text,Dimensions,StyleSheet,Image, TouchableOpacity, Switch, TouchableNativeFeedback, Alert, Linking } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import {useSelector,useDispatch} from 'react-redux';
import { setActive } from '../redux/actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../context/ThemeContext';
import theme from '../../assets/theme';
import DrawerLogo from '../../assets/images/drawer_logo.png';

FontAwesome.loadFont();

const width=Dimensions.get('window').width*0.7;

const NativeButton=({icon,title,onPress})=>{
    const {mode}=useContext(ThemeContext);
    const {activeMenu} = useSelector(s=>s);
    const dispatch = useDispatch();

    const style=activeMenu==title?styles[`${mode}SelectedItem`]:{};

    return (
        <TouchableNativeFeedback 
            onPress={()=>{
                onPress();
                dispatch(setActive(title));
            }}
            background={TouchableNativeFeedback.Ripple(theme.colors[mode].pressButton, false)}>
            <View style={[styles.itemWrapper,style]}>
                <FontAwesome name={icon} size={20} color={theme.colors[mode].icon} />
                <Text style={[styles.itemText,{
                    color:theme.colors[mode].t1
                    }]}>{title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const RenderDrawer=({drawer})=>{
    const {nightMode,toggleSwitch,mode}=useContext(ThemeContext);

    return ( 
        <View style={styles.drawerContainer}>
            <Image source={DrawerLogo} style={styles.drawerLogo} />

            <NativeButton title='Decks' icon='list' onPress={()=>{
                drawer.closeDrawer();
                Linking.openURL("anki://screen/Home") 
            }} />

            {/* <NativeButton title='Card browser' icon='search' onPress={()=>drawer.closeDrawer()} /> */}
            
            <NativeButton title='Statistcs' icon='bar-chart' onPress={()=>{
                drawer.closeDrawer();
                Linking.openURL("anki://screen/Statistcs") 
            }} />

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

            <NativeButton title='Settings' icon='gear' onPress={()=>Linking.openSettings()} />

            <NativeButton title='Help' icon='question-circle' onPress={()=>{
                drawer.closeDrawer();
                Linking.openURL("anki://screen/Help");
            } }/>

            <NativeButton title='Support SimpleAnki' icon='support' onPress={()=>Alert.alert("Support","You can also log the problem to us if you've seen something!",[
                {text:'Cancel',style:'cancel'},
                {text:'Send Email',onPress:()=>Linking.openURL('mailto:smdpr78@gmail.com')},
            ])} />

            <View style={styles.versionWrapper}>
                <Text style={[styles.versionText,{
                    color:theme.colors[mode].t1
                }]}>Version:</Text>
                <Text style={[styles.versionText,{
                    color:theme.colors[mode].t2
                }]}> 1.0.3</Text>
            </View>

        </View>
     );
}

export const Drawer = ({children,compRef}) => {
    const {mode}=useContext(ThemeContext);
    const [dref,setDref]=useState();

    return ( 
        <DrawerLayout
            drawerWidth={width}
            drawerPosition={DrawerLayout.positions.Left}
            drawerType="front"
            drawerBackgroundColor={theme.colors[mode].background}
            renderNavigationView={()=><RenderDrawer drawer={dref} />}
            edgeWidth={100}
            ref={setDref}>
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
        height:45,
        paddingHorizontal:15,
        alignItems:'center',
    },
    itemText:{
        ...theme.typo.h3,
        marginLeft:20,
        color:theme.colors.black,
    },
    lightSelectedItem:{
        backgroundColor:theme.colors.midGray,
    },
    darkSelectedItem:{
        backgroundColor:theme.colors.darkGray,
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
    versionWrapper:{
        flexDirection:'row',
        position:'absolute',
        bottom:15,
        left:15,
    },
    versionText:{
        ...theme.typo.h3,
        marginRight:15,
    },
});
 