import React, { useEffect, useState } from 'react';
import { UIManager,Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {legacy_createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './src/redux/reducers';
import { Provider } from 'react-redux';
import AddNote from './src/pages/AddNote';
import Cards from './src/pages/Cards';
import theme from './assets/theme/index';
import CardPreview from './src/pages/CardPreview';
import EditNote from './src/pages/EditNote';
import DrawerNavigation from './src/components/DrawerNavigation';
import SplashScreen from 'react-native-splash-screen';

//Define Redux Store
const Store = legacy_createStore(rootReducer,applyMiddleware(thunk));
const Stack=createNativeStackNavigator();


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
          <Stack.Navigator screenOptions={{
              headerStyle: {backgroundColor:theme.colors.header},
              headerTitleStyle:{color:theme.colors.white},
              headerTintColor: theme.colors.white,
              gestureDirection: 'horizontal',
              gestureEnabled: true,
              // animation:'slide_from_left',
              // presentation:'containedTransparentModal',
              orientation:'portrait'
            }}>
              <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{header:()=>{}}} />
              <Stack.Screen name="Cards" component={Cards} options={({route})=>({
                title:route.params.item.title,
              })} />
              
              <Stack.Screen name="Card Preview" component={CardPreview}  />
              <Stack.Screen name="Add Note" component={AddNote} />
              <Stack.Screen name="Edit Note" component={EditNote} />
          </Stack.Navigator>
        </Provider>
    </NavigationContainer>
  );
});

// const App=gestureHandlerRootHOC(()=>{
//   const [drawerRef,setDrawerRef]=useState();
//   const [title,setTitle]=useState('Simple Anki');

//   const config={
//     screens:{
//       Home:'Home',
//       Statistcs:'Statistcs',
//       Help:'Help',
//     }
//   };

//   return ( 
//     <NavigationContainer linking={{
//       prefixes:['anki://screen'],
//       config
//     }}>
//       <Provider store={Store}>
//         <Drawer compRef={setDrawerRef}>
//           <Stack.Navigator screenOptions={{
//             headerStyle: {backgroundColor:theme.colors.header},
//             headerTitleStyle:{color:theme.colors.white},
//             headerTintColor: theme.colors.white,
//             gestureDirection: 'horizontal',
//             gestureEnabled: true,
//           }}>
//             <Stack.Screen name="Home" component={Home}
//              options={{
//               // headerLeft:()=><LeftButton onPress={drawerRef} visible={headerLeftVisible} />,
//               title:title
//             }} />
//             <Stack.Screen name="Cards" component={Cards} options={({route})=>({
//               title:route.params.item.title,
//             })} />
            
//             <Stack.Screen name="Card Preview" component={CardPreview}  />
//             <Stack.Screen name="Add Note" component={AddNote} />
//             <Stack.Screen name="Edit Note" component={EditNote} />

//             <Stack.Screen name="Help" component={Help} />
//             <Stack.Screen name="Statistcs" component={Statistcs} />
//           </Stack.Navigator>
//         </Drawer>
//       </Provider>
//     </NavigationContainer>
//    );
// });

export default App;