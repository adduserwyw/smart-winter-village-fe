import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    Platform,
    SafeAreaView,
    StatusBar,
    Modal,
    ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ActionSheetIOS } from 'react-native';
import { Feather } from '@expo/vector-icons';
import config from '../../../config.js';

type ServiceCategory = 'room' | 'housekeeping' | 'concierge' | 'maintenance';
type ServiceRequest = {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'processing' | 'completed';
    time: string;
};

const ServiceScreen: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(null);
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [requestType, setRequestType] = useState('');
    const [requestDetails, setRequestDetails] = useState('');
    const [preferredTime, setPreferredTime] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    // Fetch service requests from API
    useEffect(() => {
        fetchServiceRequests();
    }, []);

    const fetchServiceRequests = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${config.apiUrl}/api/guest/services`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                // Check if the data has a 'requests' property that contains the array
                if (data && data.requests && Array.isArray(data.requests)) {
                    setRequests(data.requests);
                } else {
                    // If the response is directly an array
                    setRequests(Array.isArray(data) ? data : []);
                }
            } else {
                console.error('Failed to fetch service requests:', await response.text());
                // Set some default data in case of error
                setRequests([
                    {
                        id: 'default-1',
                        title: 'No requests available',
                        description: 'Try again later',
                        status: 'pending',
                        time: 'Now',
                    },
                ]);
            }
        } catch (error) {
            console.error('Error fetching service requests:', error);
            // Set some default data in case of error
            setRequests([
                {
                    id: 'default-1',
                    title: 'Connection error',
                    description: 'Check your network connection',
                    status: 'pending',
                    time: 'Now',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleServiceSelect = (category: ServiceCategory) => {
        setActiveCategory(category);
        setShowRequestForm(true);
    };

    const handleSubmitRequest = async () => {
        try {
            // Create request object matching the ServiceRequest type
            const newRequest: ServiceRequest = {
                id: `req-${Date.now()}`, // Generate temporary ID
                title: getCategoryTitle(activeCategory as ServiceCategory),
                description: requestDetails || `Request for ${getCategoryTitle(activeCategory as ServiceCategory).toLowerCase()} service`,
                status: 'pending',
                time: new Date().toLocaleString(),
            };

            // Send the request to the API
            const response = await fetch(`${config.apiUrl}/api/guest/service`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRequest),
            });

            if (response.ok) {
                // Reset form states
                setShowRequestForm(false);
                setActiveCategory(null);
                setRequestType('');
                setRequestDetails('');
                setPreferredTime('');

                // Refresh the service requests list
                fetchServiceRequests();
            } else {
                console.error('Failed to submit request:', await response.text());
            }
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };

    const getCategoryTitle = (category: ServiceCategory): string => {
        switch (category) {
            case 'room':
                return 'Room Service';
            case 'housekeeping':
                return 'Housekeeping';
            case 'concierge':
                return 'Concierge';
            case 'maintenance':
                return 'Maintenance';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return '#FFD700'; // yellow
            case 'processing':
                return '#4169E1'; // blue
            case 'completed':
                return '#32CD32'; // green
        }
    };

    const renderRequestForm = () => {
        const getOptionsForCategory = () => {
            switch (activeCategory) {
                case 'room':
                    return ['Breakfast', 'Lunch', 'Dinner', 'Beverages'];
                case 'housekeeping':
                    return ['Room cleaning', 'Extra towels', 'Bed linens', 'Toiletries'];
                case 'concierge':
                    return [
                        'Restaurant reservations',
                        'Transportation',
                        'Local attractions',
                        'General information',
                    ];
                case 'maintenance':
                    return ['Air conditioning', 'Plumbing', 'Electrical', 'TV/Internet'];
                default:
                    return [];
            }
        };

        return (
            <View style={styles.formContainer}>
                <View style={styles.formHeader}>
                    <Feather
                        name={getCategoryIcon(activeCategory as ServiceCategory)}
                        size={24}
                        color="#FFF"
                        style={styles.formIcon}
                    />
                    <Text style={styles.formHeaderText}>{getCategoryTitle(activeCategory as ServiceCategory)}</Text>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Request Type</Text>
                    <View style={styles.pickerContainer}>
                        {Platform.OS === 'ios' ? (
                            // Custom iOS implementation with touchable
                            <TouchableOpacity
                                style={styles.pickerTouchable}
                                onPress={() => {
                                    const options = getOptionsForCategory();
                                    ActionSheetIOS.showActionSheetWithOptions(
                                        {
                                            options: ['Cancel', ...options],
                                            cancelButtonIndex: 0,
                                            title: 'Select Request Type',
                                            tintColor: 'white',
                                            userInterfaceStyle: 'dark',
                                        },
                                        (buttonIndex) => {
                                            if (buttonIndex !== 0) {
                                                setRequestType(options[buttonIndex - 1]);
                                            }
                                        }
                                    );
                                }}
                            >
                                <Text style={styles.pickerText}>
                                    {requestType || 'Select a request type'}
                                </Text>
                                <Feather name="chevron-down" size={16} color="#FFF" />
                            </TouchableOpacity>
                        ) : (
                            // Android implementation
                            <Picker
                                selectedValue={requestType}
                                onValueChange={(itemValue) => setRequestType(itemValue)}
                                style={styles.picker}
                                dropdownIconColor="#FFF"
                                itemStyle={styles.pickerItem}
                                mode="dropdown"
                                backgroundColor="black"
                            >
                                <Picker.Item label="Select a request type" value="" />
                                {getOptionsForCategory().map((option) => (
                                    <Picker.Item
                                        key={option}
                                        label={option}
                                        value={option}
                                        color="#FFFFFF"
                                    />
                                ))}
                            </Picker>
                        )}
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Details</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Please provide any specific details about your request..."
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        multiline
                        numberOfLines={5}
                        value={requestDetails}
                        onChangeText={setRequestDetails}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Preferred Time</Text>
                    <View style={styles.timeInputContainer}>
                        <Feather name="clock" size={20} color="rgba(255, 255, 255, 0.7)" />
                        <TextInput
                            style={styles.timeInput}
                            placeholder="As soon as possible"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            value={preferredTime}
                            onChangeText={setPreferredTime}
                        />
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => {
                            setShowRequestForm(false);
                            setActiveCategory(null);
                        }}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmitRequest}>
                        <Feather name="bell" size={16} color="#FFF" />
                        <Text style={styles.buttonText}>Submit Request</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderServiceButtons = () => (
        <View style={styles.serviceGrid}>
            <ServiceButton
                title="Room Service"
                description="Food & beverages"
                icon="coffee"
                onPress={() => handleServiceSelect('room')}
            />
            <ServiceButton
                title="Housekeeping"
                description="Room cleaning & supplies"
                icon="wind"
                onPress={() => handleServiceSelect('housekeeping')}
            />
            <ServiceButton
                title="Concierge"
                description="Information & assistance"
                icon="bell"
                onPress={() => handleServiceSelect('concierge')}
            />
            <ServiceButton
                title="Maintenance"
                description="Repairs & technical issues"
                icon="tool"
                onPress={() => handleServiceSelect('maintenance')}
            />
        </View>
    );

    const renderRecentRequests = () => (
        <View style={styles.recentRequestsContainer}>
            <Text style={styles.sectionTitle}>Recent Requests</Text>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FFF" />
                    <Text style={styles.loadingText}>Loading your requests...</Text>
                </View>
            ) : requests.length === 0 ? (
                <View style={styles.emptyStateContainer}>
                    <Feather name="inbox" size={24} color="rgba(255, 255, 255, 0.5)" />
                    <Text style={styles.emptyStateText}>No service requests yet</Text>
                </View>
            ) : (
                [...requests]
                    .sort((a, b) => {
                        const dateA = new Date(a.time);
                        const dateB = new Date(b.time);
                        return dateB.getTime() - dateA.getTime();
                    })
                    .map((request) => (
                        <View key={request.id} style={styles.requestCard}>
                            <View style={styles.requestHeader}>
                                <View>
                                    <Text style={styles.requestTitle}>{request.title}</Text>
                                    <Text style={styles.requestDescription}>{request.description}</Text>
                                </View>
                                <View
                                    style={[
                                        styles.statusBadge,
                                        { backgroundColor: getStatusColor(request.status) + '33' },
                                    ]}
                                >
                                    <Text style={styles.statusText}>
                                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.requestFooter}>
                                <Text style={styles.requestTime}>{request.time}</Text>
                                <TouchableOpacity style={styles.detailsButton}>
                                    {/*<Text style={styles.detailsText}>Details</Text>*/}
                                    {/*<Feather name="chevron-right" size={12} color="rgba(255, 255, 255, 0.8)" />*/}
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
            )}
        </View>
    );

    const getCategoryIcon = (category: ServiceCategory): string => {
        switch (category) {
            case 'room':
                return 'coffee';
            case 'housekeeping':
                return 'wind';  // Using "wind" as a substitute for "sparkles"
            case 'concierge':
                return 'bell';
            case 'maintenance':
                return 'tool';
            default:
                return 'help-circle';
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.headerIconContainer}>
                    <View style={styles.iconCircle}>
                        <Feather name="users" size={32} color="#FFF" />
                    </View>
                </View>

                <Text style={styles.title}>Guest Services</Text>
                <Text style={styles.subtitle}>Request services or assistance during your stay</Text>

                {!showRequestForm ? (
                    <>
                        {renderServiceButtons()}
                        {requests.length > 0 && renderRecentRequests()}
                    </>
                ) : (
                    renderRequestForm()
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

interface ServiceButtonProps {
    title: string;
    description: string;
    icon: string;
    onPress: () => void;
}

const ServiceButton: React.FC<ServiceButtonProps> = ({ title, description, icon, onPress }) => {
    return (
        <TouchableOpacity style={styles.serviceButton} onPress={onPress}>
            <View style={styles.serviceIconContainer}>
                <Feather name={icon} size={20} color="#FFF" />
            </View>
            <Text style={styles.serviceTitle}>{title}</Text>
            <Text style={styles.serviceDescription}>{description}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#121212',
    },
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    contentContainer: {
        padding: 16,
    },
    headerIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FFF',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        marginBottom: 24,
    },
    serviceGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    serviceButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        padding: 16,
        width: '48%',
        marginBottom: 12,
    },
    serviceIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    serviceTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFF',
    },
    serviceDescription: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: 4,
    },
    recentRequestsContainer: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FFF',
        marginBottom: 12,
    },
    requestCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    requestHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    requestTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFF',
    },
    requestDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        color: '#FFF',
    },
    requestFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    requestTime: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
    },
    detailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
        marginRight: 4,
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        padding: 20,
    },
    formHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    formIcon: {
        marginRight: 8,
    },
    formHeaderText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FFF',
    },
    formGroup: {
        marginBottom: 16,
    },
    formLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FFF',
        marginBottom: 8,
    },
    pickerContainer: {
        // backgroundColor: 'rgba(0, 0, 0, 0.8)',
        // borderRadius: 8,
        overflow: 'hidden',
        // borderWidth: 1,
        // borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    picker: {
        color: '#FFF',
        height: 50,
        backgroundColor: 'transparent',
    },
    pickerItem: {
        color: '#FFF',
        // backgroundColor: 'black',
    },
    pickerTouchable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
    },
    pickerText: {
        color: '#FFF',
        fontSize: 16,
    },
    loadingContainer: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 12,
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
    },
    emptyStateContainer: {
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        marginTop: 12,
    },
    emptyStateText: {
        marginTop: 8,
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
    },
    textArea: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: 12,
        color: '#FFF',
        textAlignVertical: 'top',
        minHeight: 100,
    },
    timeInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    },
    timeInput: {
        flex: 1,
        marginLeft: 8,
        color: '#FFF',
        padding: Platform.OS === 'ios' ? 0 : 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        marginRight: 6,
    },
    submitButton: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 12,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: '500',
        marginLeft: 4,
    },
});

export default ServiceScreen;