import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeApp from './screens/HomeApp';


const Stack = createNativeStackNavigator();

export default class App extends React.Component{
  render(){
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="HomeApp" headerMode="none"  screenOptions={{ headerShown: false}}>
        <Stack.Screen name="HomeApp" component={HomeApp} />
      </Stack.Navigator>
      </NavigationContainer>
      );
  }
}






