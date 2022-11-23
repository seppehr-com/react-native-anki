import React from 'react';
import { View,Text,Image ,StyleSheet, Switch, TouchableNativeFeedback, Alert, Linking, StatusBar} from 'react-native';
import {DrawerContentScrollView,DrawerItemList,DrawerItem} from '@react-navigation/drawer';
import DrawerLogo from '../../assets/images/drawer_logo.png';
import theme from '../../assets/theme';
import { useDispatch, useSelector } from 'react-redux';
import {toggleDarkMode } from '../redux/actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/Home';
import Help from '../pages/Help';
import Statistcs from '../pages/Statistcs';
import Search from '../pages/Search';


const Drawer = createDrawerNavigator();
FontAwesome.loadFont();

const DrawerLayout = (props) => {
    const {isDark,mode} = useSelector(selector => selector.nightMode);
    const dispatch=useDispatch();

    return ( 
            <DrawerContentScrollView style={[styles.container,theme.setBakground(mode,'background')]} {...props}>
                <View style={styles.drawerBody}>
                    <Image source={DrawerLogo} style={styles.drawerLogo} />
                    <DrawerItemList {...props} />
                </View>

                <View style={[styles.drawerFooter,{
                    borderTopColor:theme.modeColor(mode,'separator')
                }]}>
                    <View style={styles.itemWrapper}>
                        <FontAwesome name='moon-o' size={20} color={theme.modeColor(mode,'icon')} />
                        <Text style={[styles.itemText,theme.setColor(mode,'t1')]}>Night Mode</Text>
                        <Switch 
                            style={styles.switch} 
                            trackColor={{ false: "#C9C9C9", true: "#767577" }}
                            thumbColor={isDark ? theme.colors.statusBar : "#f4f3f4"}
                            value={isDark} 
                            onValueChange={()=>dispatch(toggleDarkMode())}
                        />
                    </View>
                    <NativeButton title='Settings' icon='gear' size={20} onPress={()=>Linking.openSettings()} />
                    <NativeButton title='Support React Anki' icon='support' size={18} onPress={()=>Alert.alert("Support","You can also log the problem to us if you've seen something!",[
                        {text:'Cancel',style:'cancel'},
                        {text:'Send Email',onPress:()=>Linking.openURL('mailto:smdpr78@gmail.com')},
                    ])} />
                </View>
            </DrawerContentScrollView>
     );
}

const DrawerNavigation=()=>{
    const {mode} = useSelector(selector => selector.nightMode);

    return (
        <>
          <Drawer.Navigator initialRouteName='Home' screenOptions={{
              headerStyle: {backgroundColor:theme.modeColor(mode,'header')},
              headerTitleStyle:{color:theme.colors.white},
              headerTintColor: theme.colors.white,
              drawerItemStyle: {
                borderRadius: 0,
                width: '100%',
                // paddingLeft:15,
                marginLeft: 0,
                marginVertical:0,
              },
              drawerLabelStyle:{
                ...theme.typo.h3,
                marginLeft:-10,
              },
              drawerActiveTintColor:theme.modeColor(mode,'t1'),
              drawerInactiveTintColor:theme.modeColor(mode,'t1'),
              swipeEdgeWidth:200,
            }} 
            drawerContent={(props)=><DrawerLayout {...props} />}>
              <Drawer.Screen name="Home" component={Home} options={{
                drawerIcon:(props)=><FontAwesome name='list' color={theme.modeColor(mode,'icon')} size={20} style={styles.labelIconStyle}  />,
                drawerLabel:'Decks',
                title:'React Anki',
              }}/>
              <Drawer.Screen name="Deck browser" component={Search} options={{
                 drawerIcon:(props)=><FontAwesome name='search' color={theme.modeColor(mode,'icon')} size={18} style={styles.labelIconStyle} />,
              }} />
              <Drawer.Screen name="Statistcs" component={Statistcs} options={{
                 drawerIcon:(props)=><FontAwesome name='bar-chart' color={theme.modeColor(mode,'icon')} size={18} style={styles.labelIconStyle} />,
              }} />
              <Drawer.Screen name="Help" component={Help} options={{
                 drawerIcon:(props)=><FontAwesome name='question-circle' color={theme.modeColor(mode,'icon')} size={20} style={styles.labelIconStyle}  />,
              }} />
          </Drawer.Navigator>
          <StatusBar backgroundColor={theme.modeColor(mode,'header')} />
        </>
    );
  }

const NativeButton=({icon,title,size,onPress})=>{
    const {nightMode} = useSelector(s=>s);
    const {mode} =nightMode;

    //Disabled custom press button
    //theme.modeColor(mode,'pressButton')

    return (
        <TouchableNativeFeedback 
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple('', false)}>
            <View style={styles.itemWrapper}>
                <FontAwesome name={icon} size={size} color={theme.modeColor(mode,'icon')} />
                <Text style={[styles.itemText,theme.setColor(mode,'t1')]}>{title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}
 
export default DrawerNavigation;

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    drawerBody:{
        flex:1,
        marginTop:-5,
    },
    drawerFooter:{
        borderTopWidth:1,
        paddingVertical:10,
    },
    drawerLogo:{
        width:'100%',
    },
    itemWrapper:{
        flexDirection:'row',
        height:55,
        paddingHorizontal:20,
        alignItems:'center',
    },
    itemText:{
        ...theme.typo.h3,
        marginLeft:20,
    },
    labelIconStyle:{
        marginLeft:10,
    },
    switch:{
        position:'absolute',
        right:10,
    },
});