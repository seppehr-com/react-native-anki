import React, { useEffect} from 'react';
import { UIManager,Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/components/StackNavigation';
import {gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {legacy_createStore,applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import persistedReducer  from './src/redux/reducers';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

//Define Redux Store
const Store = legacy_createStore(persistedReducer ,applyMiddleware(thunk));
const Persistor = persistStore(Store);

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

//Repair the Searchbar!
const App=gestureHandlerRootHOC(()=>{
  useEffect(()=>{
    SplashScreen.hide();
  },[]);
  
  return (
    <NavigationContainer>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={Persistor}>
            <StackNavigation />
          </PersistGate>
        </Provider>
    </NavigationContainer>
  );
});

export default App;