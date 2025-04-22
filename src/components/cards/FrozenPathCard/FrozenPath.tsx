import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

interface PathData {
    temperature: number;
    warning: boolean;
    timestamp: string;
}

const FrozenPath: React.FC = () => {
    const [pathData, setPathData] = useState<PathData>({
        temperature: 0,
        warning: false,
        timestamp: new Date().toISOString(),
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPathData();
    }, []);

    const fetchPathData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://74.178.120.220/api/temperature/ice-status');

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }

            const data = await response.json();
            setPathData(data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch path data:', err);
            setError('Could not load path data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Format the timestamp
    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            month: "short",
            day: "numeric",
        }).format(date);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
            <ScrollView style={styles.container}>
                <View style={styles.cardContainer}>
                    <LinearGradient
                        colors={pathData.warning
                            ? ['rgba(255, 255, 255, 0.05)', 'rgba(62, 34, 40, 0.5)']
                            : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={styles.gradientBackground}
                    >

                        <View style={styles.content}>
                            {loading ? (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="large" color="#60a5fa" />
                                    <Text style={styles.loadingText}>Loading path conditions...</Text>
                                </View>
                            ) : error ? (
                                <View style={styles.errorContainer}>
                                    <Feather name="alert-circle" size={24} color="#f87171" style={styles.errorIcon} />
                                    <Text style={styles.errorText}>{error}</Text>
                                    <TouchableOpacity style={styles.retryButton} onPress={fetchPathData}>
                                        <Text style={styles.retryButtonText}>Retry</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <>
                                    <View style={styles.header}>
                                        <View style={styles.titleContainer}>
                                            <View style={styles.iconCircle}>
                                                <Feather name="cloud-snow" size={20} color="#FFF" />
                                            </View>
                                            <View>
                                                <Text style={styles.title}>Frozen Path</Text>
                                                <Text style={styles.subtitle}>Path conditions</Text>
                                            </View>
                                        </View>

                                        <View style={[
                                            styles.statusBadge,
                                            { backgroundColor: pathData.warning ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)' }
                                        ]}>
                                            <Text style={[
                                                styles.statusText,
                                                { color: pathData.warning ? '#fca5a5' : '#86efac' }
                                            ]}>
                                                {pathData.warning ? 'Warning' : 'Clear'}
                                            </Text>
                                            {pathData.warning && (
                                                <Feather
                                                    name="alert-triangle"
                                                    size={12}
                                                    color="#fca5a5"
                                                    style={{ marginLeft: 4 }}
                                                />
                                            )}
                                        </View>
                                    </View>

                                    <View style={styles.temperatureSection}>
                                        <View style={styles.temperatureContainer}>
                                            <Feather name="thermometer" size={24} color="#93c5fd" style={{ marginRight: 8 }} />
                                            <Text style={styles.temperatureText}>{pathData.temperature}°</Text>
                                        </View>
                                        <View style={styles.updatedContainer}>
                                            <Text style={styles.updatedLabel}>Updated</Text>
                                            <Text style={styles.updatedTime}>{formatDate(pathData.timestamp)}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.optionsContainer}>
                                        <TouchableOpacity style={styles.optionButton}>
                                            <Text style={styles.optionText}>Path Details</Text>
                                            <Feather name="chevron-right" size={16} color="rgba(255, 255, 255, 0.6)" />
                                        </TouchableOpacity>
                                        {/*<TouchableOpacity style={styles.optionButton}>*/}
                                        {/*    <Text style={styles.optionText}>Safety Information</Text>*/}
                                        {/*    <Feather name="chevron-right" size={16} color="rgba(255, 255, 255, 0.6)" />*/}
                                        {/*</TouchableOpacity>*/}
                                    </View>
                                </>
                            )}
                        </View>
                    </LinearGradient>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        // flex: 1,
        // backgroundColor: '#1a2a3d',
    },
    container: {
        borderRadius: 24, // rounded-3xl
        width: '100%',
        // backgroundColor: '#1a2a3d',
    },
    cardContainer: {
        // margin: 16,
        borderRadius: 16,
        overflow: 'hidden',
    },
    gradientBackground: {
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    content: {
        padding: 16,
        zIndex: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#60a5fa',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        fontSize: 14,
        fontWeight: '500',
    },
    temperatureSection: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    temperatureContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    temperatureText: {
        fontSize: 24,
        fontWeight: '300',
        color: '#FFFFFF',
    },
    updatedContainer: {
        alignItems: 'flex-end',
    },
    updatedLabel: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
    },
    updatedTime: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    optionsContainer: {
        marginTop: 16,
        gap: 12,
    },
    optionButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    loadingContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 16,
        fontSize: 16,
    },
    errorContainer: {
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorIcon: {
        marginBottom: 12,
    },
    errorText: {
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 16,
    },
    retryButton: {
        backgroundColor: 'rgba(96, 165, 250, 0.3)',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontWeight: '500',
    },
});

export default FrozenPath;