import React from 'react';
import { View, Text, StyleSheet,Image as RNImage } from 'react-native';
import {fontFamilies} from "../../../design-system/theme/typography";

interface DailyForecastItem {
    day: string;
    high: number;
    low: number;
    icon: string;
}

interface DailyForecastProps {
    forecast: DailyForecastItem[];
}

export default function DailyForecast({ forecast }: DailyForecastProps) {

    const limitedForecast = forecast.slice(0, 3);
    const getDefaultIconUrl = () => {
        return 'https://openweathermap.org/img/wn/01d@2x.png'; // Default to clear sky icon
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>3-Day Forecast</Text>
            <View style={styles.forecastList}>
                {limitedForecast.map((item, index) => (
                    <View key={index} style={styles.forecastItem}>
                        <Text style={styles.dayText}>{item.day}</Text>
                        <RNImage
                            source={{ uri: item.icon || getDefaultIconUrl()}}
                            style={styles.weatherIcon}
                            resizeMode="contain"
                        />
                        {/*<Text style={styles.iconText}>{item.icon}</Text>*/}
                        <View style={styles.tempContainer}>
                            <Text style={styles.lowText}>{item.low}°</Text>
                            <View style={styles.tempBar}>
                                <View
                                    style={[
                                        styles.tempBarFill,
                                        {
                                            width: `${((item.high - item.low) / 10) * 100}%`,
                                            marginLeft: `${((item.low - 5) / 25) * 100}%`,
                                        }
                                    ]}
                                />
                            </View>
                            <Text style={styles.highText}>{item.high}°</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical:4,
        width: '100%',
        height:'40%',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        color: 'white',
        fontFamily: fontFamilies.inter.medium,
    },
    forecastList: {
        gap: 24,
    },
    forecastItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dayText: {
        width: 64,
        fontSize: 12,
        color: 'white',
        fontFamily: fontFamilies.inter.regular,
    },
    // iconText: {
    //     fontSize: 18,
    //     color: 'white',
    // },
    weatherIcon: {
        width: 24,
        height: 24,
        // marginVertical: 8,
    },
    tempContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    lowText: {
        width: 32,
        textAlign: 'right',
        fontSize: 12,
        color: 'white',
        fontFamily: fontFamilies.inter.regular,
    },
    tempBar: {
        width: 96,
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 2,
        overflow: 'hidden',
        marginTop: 2,
    },
    tempBarFill: {
        height: 4,
        backgroundColor: 'white',
        borderRadius: 2,
    },
    highText: {
        width: 32,
        fontSize: 12,
        color: 'white',
        fontFamily: fontFamilies.inter.regular,
    },
});