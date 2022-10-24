import React, { useState } from 'react';
import { UIManager,Platform, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {gestureHandlerRootHOC } from 'react-native-gesture-handler';
// import {LeftButton,RightButton} from './src/components/Header';
// import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from './src/context/ThemeContext';
import {legacy_createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './src/redux/reducers';
import { Provider } from 'react-redux';
import Home from './src/pages/Home';
import AddNote from './src/pages/AddNote';
import Cards from './src/pages/Cards';
import Drawer  from './src/components/Drawer';
import theme from './assets/theme/index';
import CardPreview from './src/pages/CardPreview';
import EditNote from './src/pages/EditNote';
import Help from './src/pages/Help';
import Statistcs from './src/pages/Statistcs';

//Define Redux Store
const Store = legacy_createStore(rootReducer,applyMiddleware(thunk));
const Stack=createNativeStackNavigator();

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App=gestureHandlerRootHOC(()=>{
  const [drawerRef,setDrawerRef]=useState();
  const [headerLeftVisible,setHeaderLeftVisible]=useState(true);
  const [title,setTitle]=useState('Simple Anki');

  const config={
    screens:{
      Home:'Home',
      Statistcs:'Statistcs',
      Help:'Help',
    }
  };

  return ( 
    <NavigationContainer linking={{
      prefixes:['anki://screen'],
      config
    }}>
      <ThemeProvider>
        <Provider store={Store}>
        <Drawer compRef={setDrawerRef}>
          <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor:theme.colors.header},
            headerTitleStyle:{color:theme.colors.white},
            headerTintColor: theme.colors.white,
            gestureDirection: 'horizontal',
            gestureEnabled: true,
          }}>
            <Stack.Screen name="Home" component={Home}
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

            <Stack.Screen name="Help" component={Help} />
            <Stack.Screen name="Statistcs" component={Statistcs} />
          </Stack.Navigator>
        </Drawer>
        </Provider>
      </ThemeProvider>
    </NavigationContainer>
   );
});

export default App;