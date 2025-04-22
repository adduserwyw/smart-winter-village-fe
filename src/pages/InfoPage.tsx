import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {
    Feather,
    Ionicons,
    MaterialCommunityIcons
} from '@expo/vector-icons';

interface Amenity {
    id: string;
    title: string;
    description: string;
    hours: string;
    location: string;
    icon: {
        type: 'Feather' | 'Ionicons' | 'MaterialCommunityIcons';
        name: string;
    };
}

const amenities: Amenity[] = [
    {
        id: "sauna",
        title: "Lakeside Sauna",
        description:
            "Traditional wood-heated sauna with panoramic windows overlooking Lake Syväjärvi. Includes outdoor shower (summer) and ice swimming access.",
        hours: "Available during stay (advance booking recommended)",
        location: "Separate lakeside sauna building",
        icon: {
            type: "Feather",
            name: "sun"
        },
    },
    {
        id: "beach",
        title: "Private Beach & Water Equipment",
        description:
            "Sandy beach with kayaks, SUP boards, rowing boat, and swimming gear. Seasonal flotation vests and aqua jogging belts provided.",
        hours: "Daylight hours (summer)",
        location: "Shared lakeshore area",
        icon: {
            type: "Feather",
            name: "anchor"
        },
    },
    {
        id: "kitchen",
        title: "Fully Equipped Kitchen",
        description: "Modern kitchens with induction cooktops, air fryers, Nespresso machines, and full cookware.",
        hours: "Accessible 24/7",
        location: "In each cottage",
        icon: {
            type: "Feather",
            name: "coffee"
        },
    },
    {
        id: "fitness",
        title: "Fitness Area",
        description: "Exercise equipment for strength and cardio training.",
        hours: "Accessible 24/7",
        location: "Service building",
        icon: {
            type: "Feather",
            name: "activity"
        },
    },
    {
        id: "laundry",
        title: "Laundry Facilities",
        description: "Washers and dryers available for guest use.",
        hours: "Accessible 24/7",
        location: "Service building",
        icon: {
            type: "Feather",
            name: "wind"
        },
    },
    {
        id: "kota",
        title: "Outdoor Kota Kitchen",
        description: "Traditional Finnish grill hut for open-fire cooking.",
        hours: "Daylight hours",
        location: "Lakeside outdoor area",
        icon: {
            type: "MaterialCommunityIcons",
            name: "campfire"
        },
    },
    {
        id: "charging",
        title: "Electric Vehicle Charging",
        description: "2x Type2 (11kW) and 2x 16A super-schuko charging points.",
        hours: "24/7",
        location: "Illuminated parking area",
        icon: {
            type: "Feather",
            name: "zap"
        },
    },
    {
        id: "wifi",
        title: "High-Speed WiFi",
        description: "400M mesh network covering all cottages and common areas.",
        hours: "24/7",
        location: "Entire property",
        icon: {
            type: "Feather",
            name: "wifi"
        },
    },
    {
        id: "terraces",
        title: "Panoramic Terraces",
        description: "Private glass-railed terraces with heaters (select cottages).",
        hours: "Accessible anytime",
        location: "Attached to each cottage",
        icon: {
            type: "Feather",
            name: "droplet"
        },
    },
    {
        id: "ski",
        title: "Ski Lift Access",
        description: "Two complimentary lift tickets per stay included.",
        hours: "During Ukkohalla Ski Resort operations",
        location: "Adjacent ski slopes",
        icon: {
            type: "Ionicons",
            name: "snow-outline"
        },
    },
    {
        id: "entertainment",
        title: "In-Cottage Entertainment",
        description: "4K QLED Smart TVs with Netflix and Amazon Prime subscriptions.",
        hours: "Accessible anytime",
        location: "Living area of each cottage",
        icon: {
            type: "Feather",
            name: "tv"
        },
    },
    {
        id: "climate",
        title: "Air Conditioning/Heat Pump",
        description: "Climate control systems for year-round comfort.",
        hours: "24/7",
        location: "In each cottage",
        icon: {
            type: "Feather",
            name: "thermometer"
        },
    },
    {
        id: "service",
        title: "Shared Service Building",
        description: "Includes additional toilet, small kitchen, and coffee facilities.",
        hours: "Accessible 24/7",
        location: "Central property area",
        icon: {
            type: "Feather",
            name: "home"
        },
    },
    {
        id: "grill",
        title: "Weber Gas Grill",
        description: "Outdoor grilling station for communal use.",
        hours: "Daylight hours",
        location: "Lakeside outdoor area",
        icon: {
            type: "MaterialCommunityIcons",
            name: "grill"
        },
    },
    {
        id: "tickets",
        title: "Complimentary Ski Tickets",
        description: "Two daily lift passes included with winter bookings.",
        hours: "Ski resort operating hours",
        location: "Ukkohalla Ski Resort reception",
        icon: {
            type: "Ionicons",
            name: "ticket-outline"
        },
    },
];

interface Category {
    id: string;
    title: string;
    amenities: string[];
    icon: {
        type: 'Feather' | 'Ionicons' | 'MaterialCommunityIcons';
        name: string;
    };
}

const categories: Category[] = [
    {
        id: "wellness",
        title: "Wellness & Recreation",
        amenities: ["sauna", "beach", "fitness"],
        icon: {
            type: "Feather",
            name: "anchor"
        },
    },
    {
        id: "comfort",
        title: "Comfort & Convenience",
        amenities: ["kitchen", "laundry", "service", "climate"],
        icon: {
            type: "Feather",
            name: "home"
        },
    },
    {
        id: "outdoor",
        title: "Outdoor Activities",
        amenities: ["kota", "grill", "ski", "tickets", "terraces"],
        icon: {
            type: "Ionicons",
            name: "sunny-outline"
        },
    },
    {
        id: "tech",
        title: "Technology & Entertainment",
        amenities: ["wifi", "entertainment", "charging"],
        icon: {
            type: "Feather",
            name: "monitor"
        },
    },
];

// Helper function to render icons
const renderIcon = (icon: { type: 'Feather' | 'Ionicons' | 'MaterialCommunityIcons'; name: string }, style: any) => {
    switch (icon.type) {
        case 'Feather':
            return <Feather name={icon.name} style={style} />;
        case 'Ionicons':
            return <Ionicons name={icon.name} style={style} />;
        case 'MaterialCommunityIcons':
            return <MaterialCommunityIcons name={icon.name} style={style} />;
        default:
            return <Feather name="help-circle" style={style} />;
    }
};

const InfoPage: React.FC = () => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>("wellness");
    const [expandedAmenity, setExpandedAmenity] = useState<string | null>(null);

    const toggleCategory = (categoryId: string): void => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    const toggleAmenity = (amenityId: string): void => {
        setExpandedAmenity(expandedAmenity === amenityId ? null : amenityId);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconCircle}>
                    <Feather name="home" style={{ fontSize: 32, color: 'white' }} />
                </View>
            </View>

            <Text style={styles.title}>Hotel Amenities</Text>
            <Text style={styles.subtitle}>Explore our premium facilities and services</Text>

            {/* Categories and Amenities */}
            <View style={styles.categoriesContainer}>
                {categories.map((category) => (
                    <View key={category.id} style={styles.categoryCard}>
                        <TouchableOpacity
                            onPress={() => toggleCategory(category.id)}
                            style={styles.categoryButton}
                        >
                            <View style={styles.categoryTitleContainer}>
                                <View style={styles.categoryIconCircle}>
                                    {renderIcon(category.icon, { fontSize: 20, color: 'white' })}
                                </View>
                                <Text style={styles.categoryTitle}>{category.title}</Text>
                            </View>
                            {expandedCategory === category.id ? (
                                <Feather name="chevron-up" style={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.7)' }} />
                            ) : (
                                <Feather name="chevron-down" style={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.7)' }} />
                            )}
                        </TouchableOpacity>

                        {expandedCategory === category.id && (
                            <View style={styles.amenitiesContainer}>
                                {category.amenities.map((amenityId) => {
                                    const amenity = amenities.find((a) => a.id === amenityId);
                                    if (!amenity) return null;

                                    return (
                                        <View key={amenity.id} style={styles.amenityCard}>
                                            <TouchableOpacity
                                                onPress={() => toggleAmenity(amenity.id)}
                                                style={styles.amenityButton}
                                            >
                                                <View style={styles.amenityTitleContainer}>
                                                    {renderIcon(amenity.icon, { fontSize: 16, color: 'rgba(255, 255, 255, 0.7)', marginRight: 8 })}
                                                    <Text style={styles.amenityTitle}>{amenity.title}</Text>
                                                </View>
                                                {expandedAmenity === amenity.id ? (
                                                    <Feather name="chevron-up" style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.7)' }} />
                                                ) : (
                                                    <Feather name="chevron-down" style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.7)' }} />
                                                )}
                                            </TouchableOpacity>

                                            {expandedAmenity === amenity.id && (
                                                <View style={styles.amenityDetails}>
                                                    <Text style={styles.amenityDescription}>{amenity.description}</Text>
                                                    <View style={styles.detailsContainer}>
                                                        <View style={styles.detailRow}>
                                                            <Text style={styles.detailLabel}>Hours</Text>
                                                            <Text style={styles.detailValue}>{amenity.hours}</Text>
                                                        </View>
                                                        <View style={styles.detailRow}>
                                                            <Text style={styles.detailLabel}>Location</Text>
                                                            <Text style={styles.detailValue}>{amenity.location}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )}
                                        </View>
                                    );
                                })}
                            </View>
                        )}
                    </View>
                ))}
            </View>

            {/* Contact Information */}
            <View style={styles.contactCard}>
                <Text style={styles.contactTitle}>Contact Information</Text>
                <View style={styles.contactsContainer}>
                    <View style={styles.contactPerson}>
                        <Text style={styles.contactName}>Maria Aarinen</Text>
                        <View style={styles.contactDetail}>
                            <Feather name="phone" style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.7)', marginRight: 8 }} />
                            <Text style={styles.contactText}>+358 50 404 0373</Text>
                        </View>
                        <View style={styles.contactDetail}>
                            <Feather name="mail" style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.7)', marginRight: 8 }} />
                            <Text style={styles.contactText}>maarinen4@gmail.com</Text>
                        </View>
                    </View>

                    <View style={styles.contactPerson}>
                        <Text style={styles.contactName}>Mika Aarinen</Text>
                        <View style={styles.contactDetail}>
                            <Feather name="phone" style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.7)', marginRight: 8 }} />
                            <Text style={styles.contactText}>+358 50 536 0370</Text>
                        </View>
                        <View style={styles.contactDetail}>
                            <Feather name="mail" style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.7)', marginRight: 8 }} />
                            <Text style={styles.contactText}>maarinen1@live.com</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#121212',
    },
    header: {
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
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        marginBottom: 24,
    },
    categoriesContainer: {
        marginBottom: 24,
    },
    categoryCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
    },
    categoryButton: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    categoryTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    categoryTitle: {
        fontWeight: '500',
        color: 'white',
    },
    amenitiesContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    amenityCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        marginBottom: 12,
        overflow: 'hidden',
    },
    amenityButton: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    amenityTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amenityTitle: {
        color: 'white',
    },
    amenityDetails: {
        paddingHorizontal: 12,
        paddingBottom: 12,
        paddingTop: 4,
    },
    amenityDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 12,
    },
    detailsContainer: {
        marginTop: 8,
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.6)',
        width: 80,
    },
    detailValue: {
        fontSize: 12,
        color: 'white',
        flex: 1,
    },
    contactCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        padding: 16,
        marginTop: 8,
    },
    contactTitle: {
        fontWeight: '500',
        color: 'white',
        marginBottom: 12,
    },
    contactsContainer: {
        gap: 16,
    },
    contactPerson: {
        marginBottom: 8,
    },
    contactName: {
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
        marginBottom: 8,
    },
    contactDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    contactText: {
        fontSize: 14,
        color: 'white',
    },
});

export default InfoPage;