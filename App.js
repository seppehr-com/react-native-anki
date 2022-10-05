import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {LeftButton,RightButton} from './src/components/Header';
// import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from './src/context/ThemeContext';
import Home from './src/pages/Home';
import AddNote from './src/pages/AddNote';
import Cards from './src/pages/Cards';
import Drawer  from './src/components/Drawer';
import theme from './assets/theme/index';
import CardPreview from './src/pages/CardPreview';
import EditNote from './src/pages/EditNote';

const Stack=createNativeStackNavigator();


const App=gestureHandlerRootHOC(()=>{
  const [drawerRef,setDrawerRef]=useState();
  const [headerLeftVisible,setHeaderLeftVisible]=useState(true);
  const [title,setTitle]=useState('Simple Anki');
  
  return ( 
    <NavigationContainer>
      <ThemeProvider>
        <Drawer compRef={setDrawerRef}>
          <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor:theme.colors.header},
            headerTitleStyle:{color:theme.colors.white},
            headerTintColor: theme.colors.white,
            gestureDirection: 'horizontal',
            gestureEnabled: true,
          }}>
            <Stack.Screen name="Simple Anki" component={Home}
             options={{
              // headerLeft:()=><LeftButton onPress={drawerRef} visible={headerLeftVisible} />,
              title:title
            }} />
            <Stack.Screen name="Cards" component={Cards} options={({route})=>({
              title:route.params.item.title,
            })} />
            
            <Stack.Screen name="Card Preview" component={CardPreview}  />
            <Stack.Screen name="Add Note" component={AddNote} />
            <Stack.Screen name="Edit Note" component={EditNote} />
          </Stack.Navigator>
        </Drawer>
      </ThemeProvider>
    </NavigationContainer>
   );
});

export default App;