import { getForecastByCord, getWeatherByCord } from '@/utils/weather';
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { createContext, useEffect, useState } from "react";
import Toast from 'react-native-root-toast';

export const GlobalContext = createContext({
    state: {
        search: '',
        weather: null,
        forecast: null,
        lat: null,
        lon: null,
        favouriteCities: [],
        loading: false,

    },
    setState: () => { }
})

export const GlobalProvider = ({ children }) => {

    const [state, setState] = useState({
        search: '',
        weather: null,
        lat: null,
        lon: null,
        forecast: null,
        favouriteCities: [],
        loading: false
    })


    useEffect(() => {
        const getLocation = async () => {
            let { status } = await requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Toast.show('Unable to get Loaction.', {
                    duration: Toast.durations.SHORT,
                });
            }

            let loc = await getCurrentPositionAsync({});

            setState(prev => ({ ...prev, lat: loc.coords.latitude, lon: loc.coords.longitude }))
        }
        getLocation();
    }, [])

    const getCordinatesWeather = async () => {
        try {
            setState({ ...state, loading: true })
            const weather = await getWeatherByCord(state.lat, state.lon)
            if (weather.message) {
                return Toast.show(error.message, {
                    duration: Toast.durations.SHORT,
                });
            }
            const forecast = await getForecastByCord(state.lat, state.lon)
            if (forecast.message) {
                return Toast.show(forecast.message, {
                    duration: Toast.durations.SHORT,
                });
            }
            setState(prev => ({ ...prev, weather: weather, forecast: forecast }))

        } catch (error) {
            Toast.show(error.message, {
                duration: Toast.durations.SHORT,
            });
        }
        finally {
            setState(prev => ({ ...prev, loading: false }))
        }
    }

    useEffect(() => {
        if (state.lat !== null && state.lon !== null && !state.search)
            getCordinatesWeather();
    }, [state.lat, state.lon])

    return <GlobalContext.Provider value={{ state, setState }} >
        {children}
    </GlobalContext.Provider>
}