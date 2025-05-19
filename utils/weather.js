export const getWeatherByCity = async (city) => {
    try {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.EXPO_PUBLIC_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getForecastByCity = async (city) => {
    try {

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.EXPO_PUBLIC_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        const formatedData = data.list.filter(list => {
            const currDate = new Date();
            const weratherDate = new Date(list.dt_txt)

            // return weratherDate >= currDate && weratherDate.getDate() === currDate.getDate();
            return weratherDate.getDate() === currDate.getDate();

        })

        return formatedData;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getWeatherByCord = async (lat, lon) => {
    try {

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_API_KEY}`

        const res = await fetch(url);
        const data = await res.json();

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getForecastByCord = async (lat, lon) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_API_KEY}`
        const res = await fetch(url);
        const data = await res.json();

        const formatedData = data.list.filter(list => {
            const currDate = new Date();
            const weratherDate = new Date(list.dt_txt)
            // return weratherDate >= currDate && weratherDate.getDate() === currDate.getDate();
            return weratherDate.getDate() === currDate.getDate();
        })

        return formatedData;
    } catch (error) {
        throw new Error(error.message);
    }
}