import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import {LeftButton,RightButton} from './src/components/Header';
import theme from './assets/theme/index';
import AddNote from './src/pages/AddNote';
import Cards from './src/pages/Cards';

const Stack=createNativeStackNavigator();

function App() {
  return ( 
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
         headerStyle: {backgroundColor:theme.colors.header},
         headerTitleStyle:{color:theme.colors.white},
      }}>
        <Stack.Screen name="Simple Anki" component={Home} options={{
          headerLeft:()=><LeftButton />,
          headerRight:()=><RightButton />,
        }} />
        <Stack.Screen name="Cards" component={Cards} options={({route})=>({
          title:route.params.item.title,
        })} />
        
        <Stack.Screen name="Add Note" component={AddNote} options={{title:null}} />
      </Stack.Navigator>
    </NavigationContainer>
   );
}

export default App;