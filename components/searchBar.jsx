import { GlobalContext } from '@/context/globalContext';
import { getForecastByCity, getWeatherByCity } from '@/utils/weather';
import Icon from '@expo/vector-icons/Ionicons';
import { useContext } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-root-toast';

const SearchBar = () => {
    const { state, setState } = useContext(GlobalContext);

    const getSearchedCityWeather = async () => {
        try {
            setState(prev => ({ ...prev, loading: true }));
            if (!state.search)
                return Toast.show('Type a city name to search', {
                    duration: Toast.durations.SHORT,
                });

            const weather = await getWeatherByCity(state.search);
            if (weather.message) {
                Toast.show(weather.message, {
                    duration: Toast.durations.SHORT,
                });
                return;
            }
            const forecast = await getForecastByCity(state.search);
            if (forecast.message) {
                Toast.show(forecast.message, {
                    duration: Toast.durations.SHORT,
                });
                return;
            }
            setState(prev => ({ ...prev, weather: weather, forecast: forecast }));

        } catch (error) {
            Toast.show(error.message, {
                duration: Toast.durations.SHORT,
            });
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search your city"
                style={styles.input}
                value={state.search}
                onChangeText={text => setState({ ...state, search: text })}
            />
            <TouchableOpacity
                style={styles.searchButton}
                onPress={getSearchedCityWeather}
                disabled={state.loading}
            >
                {state.loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Icon name="search" size={20} color="#fff" />
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    searchButton: {
        marginLeft: 10,
        backgroundColor: '#f95a2c',
        borderRadius: 25,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
});

export default SearchBar;
