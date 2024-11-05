import { createDrawerNavigator } from '@react-navigation/drawer';
import List from './list'
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";


export default function Homepage({nickname, password}){

    return (
        <View style={styles.container}>
            <Text>merhaba {nickname}, şifreniz {password}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    }
})

