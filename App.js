import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Test from './screens/test';


const Stack = createNativeStackNavigator();

export default class App extends React.Component{
  render(){
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Test" headerMode="none"  screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
      </NavigationContainer>
      );
  }
}






