import { GlobalContext } from '@/context/globalContext';
import { useContext } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const Forecast = () => {
  const { state } = useContext(GlobalContext);
  return (
    <ScrollView horizontal={true} style={{ padding: 20, backgroundColor: '#f0f4f7' }}>
      {
        state.forecast ?
          state.forecast.map((data, index) => {
            const icon = data.weather[0]?.icon;
            const temp = (data.main.temp - 273.15).toFixed(2)

            return <View key={index} style={{
              margin: 5,
              backgroundColor: '#f95a2c',
              padding: 10,
              borderRadius: 10
            }}>

              <Image
                source={{ uri: ` https://openweathermap.org/img/wn/${icon}@4x.png` }}
                style={{ width: 100, height: 100 }}
              />
              <Text style={{ textAlign: 'center', fontWeight: '800' }}>{temp}°C</Text>
              <Text style={{ textAlign: 'center', fontWeight: '800' }}>{new Date(data.dt_txt).toLocaleTimeString()}</Text>
            </View>
          })
          :
          <Text style={{ fontSize: 20 }}>Forecast Loading...</Text>
      }
    </ScrollView>
  )
}

export default Forecast