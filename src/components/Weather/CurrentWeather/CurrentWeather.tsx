import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, SunDim } from 'lucide-react-native';
import {fontFamilies} from "../../../design-system/theme/typography";
import {DefaultFocus, SpatialNavigationFocusableView, SpatialNavigationView} from "react-tv-space-navigation";

interface CurrentWeatherProps {
    temp: number;
    high: number;
    low: number;
    condition: string;
}


export default function CurrentWeather(props: CurrentWeatherProps) {
    return (
        <DefaultFocus>
            <SpatialNavigationView direction="vertical">
                <SpatialNavigationFocusableView>
                    <CurrentWeatherContent {...props} />
                </SpatialNavigationFocusableView>
            </SpatialNavigationView>
        </DefaultFocus>
    );
}

function CurrentWeatherContent({ temp, high, low, condition }: CurrentWeatherProps) {
    const [currentTime, setCurrentTime] = useState<string>("");
    const [currentDate, setCurrentDate] = useState<string>("")

    useEffect(() => {
        // Set initial time
        updateTimeAndDate();

        // Update time every minute
        const interval = setInterval(updateTimeAndDate, 60000)

        return () => clearInterval(interval);
    }, []);

    function updateTimeAndDate() {
        const now = new Date()
        // Format time (e.g., "10:30 AM")
        const timeFormatter = new Intl.DateTimeFormat("en-EU", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        setCurrentTime(timeFormatter.format(now))

        // Format date (e.g., "Tuesday, April 23")
        const dateFormatter = new Intl.DateTimeFormat("en-EU", {
            weekday: "long",
            month: "long",
            day: "numeric",
        })
        setCurrentDate(dateFormatter.format(now))
    }

    // Get weather icon based on condition
    const WeatherIcon = getWeatherIcon(condition);

    return (
        <View style={styles.container}>
            {/* Left side - Current time */}
            <View style={styles.dateAndTimeContainer}>
                <Text style={styles.timeText}>{currentTime}</Text>
            <Text style={styles.dateText}>{currentDate}</Text>
            </View>

            {/* Right side - Temperature and conditions */}
            <View style={styles.weatherContainer}>
                {/* Temperature with icon */}
                <View style={styles.tempIconContainer}>
                    <WeatherIcon width={40} height={40} style={styles.icon} color="#FFFFFF" />
                    <Text style={styles.tempText}>{temp}°</Text>
                </View>

                {/* Weather details section */}
                <View style={styles.detailsContainer}>
                    {/* Condition */}
                    <Text style={styles.conditionText}>{condition}</Text>

                    {/* High/Low */}
                    <View style={styles.highLowContainer}>
                        <View style={styles.inlineContainer}>
                            <Text style={styles.labelText}>H:</Text>
                            <Text style={styles.valueText}>{high}°</Text>
                        </View>
                        <View style={styles.inlineContainer}>
                            <Text style={styles.labelText}>L:</Text>
                            <Text style={styles.valueText}>{low}°</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

function getWeatherIcon(condition: string) {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes("rain")) return CloudRain;
    if (conditionLower.includes("drizzle")) return CloudDrizzle;
    if (conditionLower.includes("snow")) return CloudSnow;
    if (conditionLower.includes("thunder") || conditionLower.includes("lightning")) return CloudLightning;
    if (conditionLower.includes("fog") || conditionLower.includes("mist")) return CloudFog;
    if (conditionLower.includes("cloud") && conditionLower.includes("part")) return SunDim;
    if (conditionLower.includes("cloud")) return Cloud;
    if (conditionLower.includes("clear") || conditionLower.includes("sun")) return Sun;

    // Default icon
    return SunDim;
}

const styles = StyleSheet.create({
    container: {
        width: '100%',  // w-full
        maxWidth: 448,  // max-w-md (448px)
        alignSelf: 'center', // mx-auto
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 32,
    },
    dateAndTimeContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf:'center',
    },
    dateText: {
        alignSelf: 'center',
        fontSize: 14,
        fontWeight: '400',
        color: 'rgba(255, 255, 255, 0.7)',
        // marginBottom: 4,
        fontFamily: fontFamilies.inter.regular,
    },
    timeText: {
        fontSize: 48,
        fontWeight: '200',
        color: 'white',
    },
    weatherContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    tempIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        marginRight: 4,
    },
    tempText: {
        fontSize: 36,
        fontWeight: '200',
        color: '#FFFFFF',
    },
    detailsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    conditionText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FFFFFF',
        fontFamily: fontFamilies.inter.medium,
    },
    highLowContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 4,
    },
    inlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelText: {
        marginRight: 4,
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        fontFamily: fontFamilies.inter.regular,
    },
    valueText: {
        fontSize: 14,
        color: '#FFFFFF',
        fontFamily: fontFamilies.inter.regular,
    },
});