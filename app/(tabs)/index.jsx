import Forecast from '@/components/forecast';
import SearchBar from '@/components/searchBar';
import WeatherCard from '@/components/weatherCard';
import { ScrollView, View } from 'react-native';



const HomeScreen = () => {


    return (
        <View style={{ flex: 1 }}>
            <SearchBar />
            <ScrollView>
                <WeatherCard />
                <Forecast />
            </ScrollView>
        </View>
    )
}

export default HomeScreen
