import React, { useEffect } from 'react';
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

const Stack=createNativeStackNavigator();


const App=gestureHandlerRootHOC(()=>{
  let drawerRef;

  // useEffect(()=>{
  //   SplashScreen.hide();
  // },[]);

  return ( 
    <NavigationContainer>
      <ThemeProvider>
        <Drawer compRef={drawer=>drawerRef=drawer}>
          <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor:theme.colors.header},
            headerTitleStyle:{color:theme.colors.white},
            gestureDirection: 'horizontal',
            gestureEnabled: true,
          }}>
            <Stack.Screen name="Simple Anki" component={Home} options={{
              headerLeft:()=><LeftButton onPress={drawerRef} />,
              headerRight:()=><RightButton />,
            }} />
            <Stack.Screen name="Cards" component={Cards} options={({route})=>({
              title:route.params.item.title,
            })} />
            
            <Stack.Screen name="Add Note" component={AddNote} options={{title:null}} />
          </Stack.Navigator>
        </Drawer>
      </ThemeProvider>
    </NavigationContainer>
   );
});

export default App;