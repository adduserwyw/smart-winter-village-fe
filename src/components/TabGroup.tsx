import React, {forwardRef} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import { useFocusAnimation } from '../design-system/helpers/useFocusAnimation';
import {
    DefaultFocus,
    SpatialNavigationFocusableView,
    SpatialNavigationRoot,
    SpatialNavigationView
} from "react-tv-space-navigation";
import styled from "@emotion/native";
import {scaledPixels} from "../design-system/helpers/scaledPixels";

interface TabGroupContentProps {
    activeTab: "weather" | "aurora";
    onChange: (tab: "weather" | "aurora") => void;
    onSelect?: () => void;
}

export default function TabGroup({ activeTab, onChange }: TabGroupContentProps) {
    return (
            <DefaultFocus>
                    <SpatialNavigationView direction="horizontal">
                    <TabGroupContent
                        activeTab={activeTab}
                        onChange={onChange}
                    />
                        </SpatialNavigationView>
            </DefaultFocus>
    );
}

const TabGroupContent = forwardRef<View, TabGroupContentProps & { isFocused?: boolean; label?: string }>(
    (props, ref) => {
        const { isFocused, label, activeTab, onChange } = props;
        const anim = useFocusAnimation(isFocused);
        return (
            <Container style={anim} isFocused={isFocused} ref={ref}>
                <View style={styles.container}>
                    <View style={styles.buttonsContainer}>
                    <TabButton
                        isActive={activeTab === "weather"}
                        onPress={() => onChange("weather")}
                        onSelect={() => onChange("weather")}
                    >
                        Weather
                    </TabButton>
                    <TabButton
                        isActive={activeTab === "aurora"}
                        onPress={() => onChange("aurora")}
                        onSelect={() => onChange("aurora")}
                    >
                        Aurora
                    </TabButton>
                    </View>
                </View>
            </Container>
        );
    }
);

interface TabButtonProps {
    children: React.ReactNode;
    isActive: boolean;
    onPress: () => void;
    onSelect: () => void;
}

function TabButton({ children, isActive, onPress, onSelect }: TabButtonProps) {
    // Use the focus animation hook to enhance visual feedback
    // const { animatedStyle, handleFocus, handleBlur } = useFocusAnimation();
    return (
        <SpatialNavigationFocusableView onSelect={onSelect}>
            {({ isFocused}) => (
                <Container
                    onPress={onPress}
                    style={[
                        styles.button,
                        isActive ? styles.activeButton : null,
                        isFocused && styles.focusedButton,
                    ]}
                >
                    <Text style={[
                        styles.buttonText,
                        isActive ? styles.activeButtonText : null,
                        isFocused && styles.focusedButtonText,
                    ]}>
                        {children}
                    </Text>
                </Container>
            )}
        </SpatialNavigationFocusableView>
    );
}

const Container = styled(Animated.View)<{ isFocused: boolean }>(({ isFocused, theme }) => ({
    alignSelf: 'baseline', // backgroundColor: isFocused ? 'white' : 'black',
    padding: theme.spacings.$4,
    borderRadius: scaledPixels(12),
    cursor: 'pointer',
    width: '100%',
}));

let screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: '99%',
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 25,
        padding: 4,
    },
    buttonsContainer: {
        marginLeft: 8,
        flexDirection: 'row',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: screenWidth / 5,
        borderRadius: 25,
    },
    activeButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    focusedButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderColor: 'white',
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.7)',
    },
    activeButtonText: {
        color: 'white',
    },
    focusedButtonText: {
        color: 'white',
        fontWeight: '700',
    },
});