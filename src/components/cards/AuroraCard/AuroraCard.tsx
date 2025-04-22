import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {fontFamilies} from "../../../design-system/theme/typography";
import {DefaultFocus, SpatialNavigationFocusableView, SpatialNavigationView} from "react-tv-space-navigation";

interface AuroraForecastProps {
    kpIndex: number;
    visibility: string;
    bestTime: string;
    location: string;
    forecast: {
        time: string;
        intensity: number;
    }[];
}

export default function AuroraForecast(props: AuroraForecastProps) {
    return (
        <DefaultFocus>
            <SpatialNavigationView direction="vertical">
                <SpatialNavigationFocusableView>
                    <AuroraForecastContent {...props} />
                </SpatialNavigationFocusableView>
            </SpatialNavigationView>
        </DefaultFocus>
    );
}

function AuroraForecastContent({ kpIndex, visibility, bestTime, location, forecast }: AuroraForecastProps) {
    // KP index ranges from 0-9, with 5+ being good for aurora viewing
    const kpColor =
        kpIndex >= 7 ? '#10B981' : // green-500
            kpIndex >= 5 ? '#34D399' : // green-400
                kpIndex >= 3 ? '#FBBF24' : // yellow-400
                    '#F87171'; // red-400

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Aurora Forecast</Text>
                <Text style={styles.locationText}>{location}</Text>
            </View>

            {/* Current KP Index */}
            <View style={styles.kpContainer}>
                <View>
                    <Text style={styles.labelText}>Current KP Index</Text>
                    <View style={styles.kpIndexContainer}>
                        <View style={[styles.kpCircle, { backgroundColor: kpColor }]}>
                            <Text style={styles.kpValue}>{kpIndex}</Text>
                        </View>
                        <View>
                            <Text style={styles.kpDescription}>{getKpDescription(kpIndex)}</Text>
                            <Text style={styles.visibilityText}>{visibility}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bestViewingContainer}>
                    <Text style={styles.labelText}>Best Viewing</Text>
                    <Text style={styles.bestTimeText}>{bestTime}</Text>
                </View>
            </View>

            {/* Hourly forecast */}
            <View style={styles.forecastContainer}>
                <Text style={styles.labelText}>24-Hour Forecast</Text>
                <View style={styles.hourlyContainer}>
                    {forecast.map((item, index) => (
                        <View key={index} style={styles.hourlyItem}>
                            <Text style={styles.timeText}>{item.time}</Text>
                            <AuroraIntensityIndicator intensity={item.intensity} />
                        </View>
                    ))}
                </View>
            </View>

            {/* Viewing tips */}
            <View style={styles.tipsContainer}>
                <Text style={styles.tipsText}>
                    For best viewing, find a location away from city lights with clear skies and a good view of the northern
                    horizon.
                </Text>
            </View>
        </View>
    );
}

function AuroraIntensityIndicator({ intensity }: { intensity: number }) {
    // Intensity from 0-10
    const height = 60;
    const fillHeight = (intensity / 10) * height;

    // Get color based on intensity
    const getColor = (intensity: number) => {
        if (intensity >= 7) return ['#34D399', '#10B981']; // green-300 to green-400
        if (intensity >= 4) return ['#34D399', '#FBBF24']; // green-300 to yellow-400
        return ['#FBBF24', '#F87171']; // yellow-400 to red-400
    };

    const colors = getColor(intensity);

    return (
        <View style={styles.intensityContainer}>
            <View
                style={[
                    styles.intensityFill,
                    {
                        height: fillHeight,
                        backgroundColor: colors[1],
                    }
                ]}
            />
        </View>
    );
}

function getKpDescription(kpIndex: number): string {
    if (kpIndex >= 7) return "Excellent";
    if (kpIndex >= 5) return "Good";
    if (kpIndex >= 3) return "Possible";
    return "Unlikely";
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        fontFamily: fontFamilies.inter.medium,
        color: 'white',
    },
    locationText: {
        fontSize: 12,
        opacity: 0.7,
        fontFamily: fontFamilies.inter.regular,
        color: 'white',
    },
    kpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    labelText: {
        fontSize: 12,
        opacity: 0.7,
        marginBottom: 4,
        fontFamily: fontFamilies.inter.regular,
        color: 'white',
    },
    kpIndexContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    kpCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    kpValue: {
        fontWeight: '600',
        color: 'white',
    },
    kpDescription: {
        fontWeight: '500',
        color: 'white',
    },
    visibilityText: {
        fontSize: 12,
        opacity: 0.7,
        fontFamily: fontFamilies.inter.regular,
        color: 'white',
    },
    bestViewingContainer: {
        alignItems: 'flex-end',
    },
    bestTimeText: {
        fontWeight: '500',
        color: 'white',
    },
    forecastContainer: {
        marginTop: 4,
    },
    hourlyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    hourlyItem: {
        alignItems: 'center',
    },
    timeText: {
        fontSize: 12,
        marginBottom: 4,
        fontFamily: fontFamilies.inter.regular,
        color: 'white',
    },
    intensityContainer: {
        width: 24,
        height: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    intensityFill: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderRadius: 12,
    },
    tipsContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 12,
    },
    tipsText: {
        fontSize: 12,
        fontFamily: fontFamilies.inter.regular,
        color: 'white',
    },
});