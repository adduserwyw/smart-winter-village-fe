import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image as RNImage } from 'react-native';
import {fontFamilies} from "../../../design-system/theme/typography";

interface HourlyForecastItem {
    time: string;
    temp: number;
    icon: string;
}

interface HourlyForecastProps {
    forecast: HourlyForecastItem[];
}

export default function HourlyForecast({ forecast }: HourlyForecastProps) {
    const getDefaultIconUrl = () => {
        return 'https://openweathermap.org/img/wn/01d@2x.png'; // Default to clear sky icon
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hourly Forecast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {forecast.map((item, index) => (
                    <View key={index} style={styles.hourItem}>
                        <Text style={styles.timeText}>{item.time}</Text>
                        <RNImage
                            source={{ uri: item.icon || getDefaultIconUrl() }}
                            style={styles.weatherIcon}
                            resizeMode="contain"
                        />
                        {/*<Text style={styles.iconText}>{item.icon}</Text>*/}
                        <Text style={styles.tempText}>{item.temp}°</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginLeft: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 12,
        color: 'white',
        fontFamily: fontFamilies.inter.medium,
    },
    scrollContainer: {
        gap: 16,
        paddingBottom: 0,
    },
    hourItem: {
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 50,
    },
    timeText: {
        fontSize: 12,
        color: 'white',
        fontFamily: fontFamilies.inter.regular,
    },
    // iconText: {
    //     fontSize: 18,
    //     marginVertical: 4,
    //     color: 'white',
    //     fontFamily: fontFamilies.inter.regular,
    // },
    weatherIcon: {
        width: 40,
        height: 40,
        // marginVertical: 8,
    },
    tempText: {
        fontSize: 12,
        fontWeight: '500',
        color: 'white',
        fontFamily: fontFamilies.inter.regular,
    },
});