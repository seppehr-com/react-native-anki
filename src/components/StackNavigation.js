import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AddNote from '../pages/AddNote';
import Cards from '../pages/Cards';
import theme from '../../assets/theme/index';
import CardPreview from '../pages/CardPreview';
import EditNote from '../pages/EditNote';
import DrawerNavigation from './DrawerNavigation';
import { StatusBar } from 'react-native';

const Stack=createNativeStackNavigator();

const StackNavigation = () => {
  const {mode} = useSelector(selector => selector.nightMode);
  
  return (
    <>
        <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor:theme.colors[mode].header},
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
        <StatusBar backgroundColor={theme.colors[mode].header} />
    </>
  )
}

export default StackNavigation