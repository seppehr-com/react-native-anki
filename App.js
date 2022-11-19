import React, { useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/components/StackNavigation';
import {gestureHandlerRootHOC } from 'react-native-gesture-handler';
import store, { persistor } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';


//Repair the Searchbar!
const App=gestureHandlerRootHOC(()=>{
  useEffect(()=>{
    //Extra timout for the SplashScreen
    let splashTimout=setTimeout(()=>SplashScreen.hide(),500);
    return () => {
      clearTimeout(splashTimout);
    };
  },[]);
  
  return (
    <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StackNavigation />
          </PersistGate>
        </Provider>
    </NavigationContainer>
  );
});

export default App;