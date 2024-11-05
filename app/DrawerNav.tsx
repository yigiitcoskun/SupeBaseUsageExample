import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import List from "@/app/list";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import Homepage from "@/app/homepage";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Index from './index';

export default function DrawerNav({navigation, route}) {

    const Drawer = createDrawerNavigator();
    const {nickname, password, isSigned} = route.params;

    const logOut = () => {
        navigation.navigate("index");
    }

    const MyTheme = {
        dark: false,
        colors: {
            primary: '#007aff',
            background: 'rgb(242, 242, 242)',
            card: 'rgb(255, 255, 255)',
            text: 'rgb(28, 28, 30)',
            border: 'rgb(199, 199, 204)',
            notification: 'rgb(255, 69, 58)',
        },
    };



    console.log(isSigned);

    if(!isSigned){
        return (
            <View style={{justifyContent:'center', alignItems: 'center', flex:1}}><Text >Bu sayfaya erişiminiz yok</Text></View>
        )
    } else {

        return (
            <NavigationContainer independent='true' theme={MyTheme}>
                <Drawer.Navigator initialRouteName="Home">

                    <Drawer.Screen name="Home">
                        {props => <Homepage {...props} nickname={nickname} password={password}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name="Kullanıcı Listesi" component={List}/>
                    <Drawer.Screen name="Log Out" component={() => logOut()}/>

                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}
