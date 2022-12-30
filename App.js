import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';

const Stack = createNativeStackNavigator();

export default class App extends React.Component{
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none"  screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        
      </Stack.Navigator>
      </NavigationContainer>
      );
  }
}




