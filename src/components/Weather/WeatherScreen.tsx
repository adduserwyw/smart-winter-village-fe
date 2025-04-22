import HourlyForecast from "./HourlyForecast/HourlyForecast";
import {ActivityIndicator, StyleSheet, View,Text} from "react-native";
import DailyForecast from "./DailyForecast/DailyForecast";
import {DefaultFocus, SpatialNavigationFocusableView, SpatialNavigationView} from "react-tv-space-navigation";
import {useEffect, useState} from "react";
import FrozenPath from "../cards/FrozenPathCard/FrozenPath";
import config from '../../../config.js';



export default function WeatherScreen() {
    const [hourlyData, setHourlyData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([
            fetchHourlyWeather(),
            fetchDailyWeather()
        ])
            .then(() => setLoading(false))
            .catch(err => {
                console.error('Error fetching weather data:', err);
                setError('Failed to fetch weather data');
                setLoading(false);
            });
    }, []);


    const fetchHourlyWeather = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/api/weather/hourly`);

            if (!response.ok) {
                throw new Error(`Hourly weather API error! Status: ${response.status}`);
            }

            const data = await response.json();
            setHourlyData(data.hourly || data || []);
            return data;
        } catch (err) {
            console.error('Error fetching hourly weather data:', err);
            setError(prev => prev || 'Failed to fetch hourly weather data');
            throw err;
        }
    };

    const fetchDailyWeather = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/api/weather/daily`);

            if (!response.ok) {
                throw new Error(`Daily weather API error! Status: ${response.status}`);
            }

            const data = await response.json();
            setDailyData(data.daily || data || []);
            return data;
        } catch (err) {
            console.error('Error fetching daily weather data:', err);
            setError(prev => prev || 'Failed to fetch daily weather data');
            throw err;
        }
    };

    const getWeatherIcon = (condition) => {
        // Map condition strings to emoji icons
        const iconMap = {
            'sunny': '☀️',
            'clear': '☀️',
            'partly cloudy': '🌤️',
            'cloudy': '☁️',
            'overcast': '⛅',
            'rain': '🌧️',
            'showers': '🌦️',
            'thunderstorm': '⛈️',
            'snow': '❄️',
            'fog': '🌫️',
            'night': '🌙'
        };
        // If the condition is not in our map or undefined, return a default icon
        if (!condition || !iconMap[condition.toLowerCase()]) return '☀️';

        return iconMap[condition.toLowerCase()];
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                {/*<Text>Loading weather data...</Text>*/}
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <DefaultFocus>
            <SpatialNavigationView direction="vertical">
                <SpatialNavigationFocusableView>
        <View style={styles.hourlyWeatherContainer}>
            <HourlyForecast forecast={hourlyData} />
        </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.dailyWeatherContainer}>
                            <DailyForecast forecast={dailyData} />
                        </View>
                        <View style={styles.frozenPathContainer}>
                            <FrozenPath/>
                        </View>
                    </View>
                </SpatialNavigationFocusableView>
            </SpatialNavigationView>
        </DefaultFocus>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    hourlyWeatherContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // bg-white/10
        borderRadius: 24, // rounded-3xl
        padding: 4,
        width: '100%',
    },
    rowContainer: {
        flexDirection: 'row',
        width: '99%',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    dailyWeatherContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 24,
        padding: 8,
        width: '50%',
    },
    frozenPathContainer: {
        marginHorizontal:12,
        width: '50%',
    }
});
