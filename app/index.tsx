import {Text, View, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Button} from "react-native";
import { useState} from "react";
import { createClient } from '@supabase/supabase-js';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from "@react-navigation/stack";





export default function Index({navigation}) {
    const supabaseUrl = 'your.supabase-url';
    const supabaseKey = 'your.supabase-key';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const Stack = createStackNavigator();

    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isSigned, setIsSigned] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [signupError, setSignupError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hidePass, setHidePass] = useState(true);

    const validationSchema = Yup.object().shape({
        nickname: Yup.string()
            .required('Nickname gerekli')
            .min(3, 'Nickname en az 3 karakter olmalıdır')
            .max(20, 'Nickname en fazla 20 karakter olmalıdır'),
        password: Yup.string()
            .required('Şifre gerekli')
            .min(6, 'Şifre en az 6 karakter olmalıdır'),
    });


    const signIn = async () => {
        setLoading(true);
        setErrors({});
        setLoginError(false);
        try {
            await validationSchema.validate({ nickname, password }, { abortEarly: false });
            const { data, error } = await fetchData();
            if (error) {
                throw error;
            }

            if (data.length > 0) {
                setIsSigned(true);
                navigation.navigate('Drawer', {nickname: nickname, isSigned: true, password: password});
            } else {
                setLoginError(true);
            }

        } catch (error) {
            const validationErrors = {};
            if (error.inner) {
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
            }
            setErrors(validationErrors);
        } finally {
            setLoading(false);
        }

    }
    const signUp = async () => {
        setLoading(true);
        setErrors({});
        setSignupError(false);
        try {
            await validationSchema.validate({ nickname, password }, { abortEarly: false });
            const {data: existingUser} = await fetchDataByNickname();
            if (existingUser.length > 0){
                setSignupError(true);
            } else {
                await insertData(nickname, password);
            }
        } catch (error) {
            const validationErrors = {};
            if (error.inner) {
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
            }
            setErrors(validationErrors);
        } finally {
            setLoading(false);
        }
    };
    const fetchDataByNickname = async () => {
        const { data, error } = await supabase
            .from('Deneme')
            .select('*')
            .eq('nickname', nickname);

        if (error) {
            console.error(error);
            return { data: null, error };
        }

        return { data, error: null };

    }

    const fetchData = async () => {
        const { data, error } = await supabase
            .from('Deneme')
            .select('*')
            .eq('nickname', nickname)
            .eq('password', password)

        ;
        if (error) {
            console.error(error);
            return { data: null, error };
        }

        return { data, error: null };
    };
    const insertData = async (nickname, password) => {
        const { data, error } = await supabase
            .from('Deneme')
            .insert([{ nickname, password }]);
        if (error) console.error(error);

    };



    return (
    <View style={styles.container}>
        <Text style={styles.loginText}>Log In</Text>
            <View style={styles.items}>
                <View>
                    {loginError && <Text style={styles.loginErrorText}>Kullanıcı Adı Veya Şifre Hatalı</Text>}
                    <TextInput
                        autoCapitalize="none"
                        placeholder="Nickname"
                        style={styles.input}
                        value={nickname}
                        onChangeText={(text) => setNickname(text)}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholderTextColor="#ddd"/>
                    <View style={styles.errorView}>
                        {errors.nickname && <Text style={styles.error}>{errors.nickname}</Text>}
                        {signupError && <Text style={styles.error}>Bu Kullanıcı Adı Kullanılmış</Text>}
                    </View>
                </View>
                <View>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="Password"
                        style={styles.input}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry = {hidePass}
                        placeholderTextColor="#ddd"/>
                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setHidePass(!hidePass)}>
                            <Text><Icon name={hidePass ? "eye-slash": "eye"} size={20} color="#000"/></Text>
                        </TouchableOpacity>
                    <View style={styles.errorView}>
                        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
                    </View>
                </View>
            </View>
        <TouchableOpacity style={styles.button} onPress={signIn} ><Text style={styles.buttonText}> Giriş Yap</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={signUp} ><Text style={styles.buttonText}> Kayıt Ol</Text></TouchableOpacity>


    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",

    },
    loginText: {
        textAlign: "center",
        fontSize: 35,
        fontWeight: 600,
        marginBottom: 60,
    },
    items: {

    },
    input: {
        padding: 20,
        marginHorizontal: 25,
        marginVertical: 10,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#ddd"
    },
    button: {
        backgroundColor: "turquoise",
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 25,
        borderRadius: 20,
        alignItems: "center",

    },
    buttonText:{
        fontSize: 15,
        fontWeight: 600,
    },
    eyeIcon: {
        position: "absolute",
        right: 40,
        top: 30,
    },
    errorView: {
        justifyContent: 'flex-end',
        alignItems: "flex-end",
        marginRight: 30,
    },
    error:{
        fontStyle: 'italic',
    },
    loginErrorText: {
        color: 'red',
        marginLeft: 30,
        fontStyle: 'italic',
    }

})
