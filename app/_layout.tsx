// app/RootLayout.tsx
import React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import Index from './index';
import {createStackNavigator} from "@react-navigation/stack";
import DrawerNav from "@/app/DrawerNav";



const Stack = createStackNavigator();

export default function RootLayout() {
    return (
        <NavigationContainer independent='true'>
            <Stack.Navigator initialRouteName="index" screenOptions={{headerShown: false}}>
                <Stack.Screen name="index" component={Index} />
                <Stack.Screen name="Drawer" component={DrawerNav} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
