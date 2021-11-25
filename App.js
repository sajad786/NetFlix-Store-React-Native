import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Home,
  Edit,
  Add
} from './screens';



const Stack = createNativeStackNavigator();



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        presentation:"card"
      }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: '#04fc75',
            },
            title: 'Netflix App Collection',
            headerTitleStyle: {
              color: '#00b7c2',
              textAlign: 'center',
            },
          }}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            headerStyle: {
              backgroundColor: '#04fc75',
            },
            title: 'Netflix App Collection',
            headerTitleStyle: {
              color: '#00b7c2',
              textAlign: 'center',
            },
          }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerStyle: {
              backgroundColor: '#04fc75',
            },
            title: 'Netflix App Collection',
            headerTitleStyle: {
              color: '#00b7c2',
              textAlign: 'center',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
