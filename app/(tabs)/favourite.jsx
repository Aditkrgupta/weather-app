import { GlobalContext } from '@/context/globalContext';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Favourite = () => {
    const { state, setState } = useContext(GlobalContext);

    const removeFromFavourites = (city) => {
        setState(prev => ({
            ...prev,
            favouriteCities: prev.favouriteCities.filter(item => item !== city),
        }));
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={state.favouriteCities}
                keyExtractor={(item) => item}
                contentContainerStyle={
                    state.favouriteCities.length === 0 && styles.emptyContainer
                }
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.cityText}>{item.name}</Text>
                        <Text style={styles.cityText}>{item.temp}°C</Text>
                        <TouchableOpacity onPress={() => removeFromFavourites(item)}>
                            <Icon name="trash-outline" size={24} color="#f55" />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No favourite cities yet.</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6f8',
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 3,
    },
    cityText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },
    emptyText: {
        fontSize: 22,
        fontWeight: '500',
        color: '#888',
        textAlign: 'center',
        marginTop: 50,
    },
    emptyContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default Favourite;
