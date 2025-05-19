import { GlobalContext } from '@/context/globalContext';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

const WeatherCard = () => {
    const { state, setState } = useContext(GlobalContext);
    const name = state.weather?.name;
    const weather = state.weather?.main;
    const sys = state.weather?.sys;
    const icon = state.weather?.weather[0]?.icon;

    const handleAddToFavourites = () => {
        setState(prev => {
            if (!prev.favouriteCities.includes(name)) {
                return { ...prev, favouriteCities: [...prev.favouriteCities, { name, temp: ((weather?.temp ?? 0) - 273.15).toFixed(1) }] };
            }
            return prev;
        });
    };

    if (state.loading || state.weather === null) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }}
                    style={styles.weatherIcon}
                />
                <Text style={{ fontWeight: '700', textTransform: 'capitalize' }}>{state.weather.weather[0].description}</Text>
                <Text style={styles.cityName}>{name}</Text>
                <Text style={styles.temp}>{((weather?.temp ?? 0) - 273.15).toFixed(1)}°C</Text>
                <Text style={styles.feelsLike}>
                    Feels like: {((weather?.feels_like ?? 0) - 273.15).toFixed(1)}°C
                </Text>
                <View style={styles.row}>
                    <Text style={styles.sunText}>
                        🌅 Sunrise: {new Date(sys?.sunrise * 1000).toLocaleTimeString()}
                    </Text>
                    <Text style={styles.sunText}>
                        🌇 Sunset: {new Date(sys?.sunset * 1000).toLocaleTimeString()}
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleAddToFavourites}>
                    <Ionicons name={state.favouriteCities.some(city => city.name === name) ? 'heart' : 'heart-outline'} size={20} color={'#f95a2c'} />
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexGrow: 1,
        backgroundColor: '#f0f4f7',
        paddingVertical: 30,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: '100%',
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 30,
    },
    weatherIcon: {
        width: 150,
        height: 150,
    },
    cityName: {
        fontSize: 36,
        fontWeight: '700',
        color: '#333',
        marginTop: 10,
    },
    temp: {
        fontSize: 28,
        fontWeight: '600',
        color: '#f95a2c',
        marginVertical: 5,
    },
    feelsLike: {
        fontSize: 18,
        color: '#555',
        marginBottom: 10,
    },
    row: {
        marginTop: 15,
    },
    sunText: {
        fontSize: 16,
        color: '#444',
        marginVertical: 2,
    },
    button: {
        marginLeft: 'auto',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        // backgroundColor: '#f95a2c',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        // shadowColor: '#f95a2c',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f7',
        minHeight: 300
    },
    loadingText: {
        fontSize: 36,
        fontWeight: '600',
        color: '#999',
    },
});

export default WeatherCard;
