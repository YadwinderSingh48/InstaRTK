import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './screens/Home'
import Bookmarked from './screens/Bookmarked'
import Login from './screens/Login'

const AppNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen 
              options={{headerShown:false}}
              name='Login'
              component={Login}
          />
          <Stack.Screen 
              options={{headerShown:false}}
              name='Home'
              component={Home}
          />
          <Stack.Screen 
              options={{headerShown:false}}
              name='Bookmarked'
              component={Bookmarked}
          />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator