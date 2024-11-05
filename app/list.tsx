import {useEffect, useState} from "react";
import {View, StyleSheet, Text, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import {createClient} from "@supabase/supabase-js";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function List({navigation}){
    const [data, setData] = useState(null);
    const { nickname, password } = useLocalSearchParams();
    const supabaseUrl = 'your.supabase-url';
    const supabaseKey = 'your.supabase-key';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const handleDelete = async (item) => {
        const {data, error} = await supabase
            .from('Deneme')
            .delete()
            .eq('id', item.id)
        if (error) {
            console.error(error);
        } else {
            fetchData();
        }

    }


    const _renderItem = ({item}) =>  {
        return (
            <View style={styles.renderItem}>
                <Text style={styles.listText}>{item.nickname} </Text>
                <TouchableOpacity onPress={() => handleDelete(item)}><Text><Icon name='trash' size={20} /></Text></TouchableOpacity>
            </View>
        )
    }

    const fetchData = async () => {
        try {
            const {data, error} = await supabase
                .from('Deneme')
                .select('*')
            ;
            setData(data);
        } catch (error) {
            console.error(error);
        }

    }
    useEffect(() => {
        fetchData();
    }, []);
    return(
      <View style={styles.container}>
          <FlatList
              style={styles.list}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={_renderItem}
          />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        padding: 15,
        margin: 10,

    },
    renderItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        padding: 30,
        backgroundColor: 'rgb(242, 242, 242)',
        borderWidth: 3,
        borderColor: '#007aff',
        borderRadius: 20
    },
    listText: {
        fontSize: 20,
        textTransform: 'capitalize',
        fontWeight: 600,
    }
})

