import { useFonts as useFontsLoader } from 'expo-font';

export const useFonts = (): { areFontsLoaded: boolean } => {
  const [fontsLoaded, fontError] = useFontsLoader({
    // 'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    // 'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    // 'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    // 'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return { areFontsLoaded: false };
  }

  return { areFontsLoaded: true };
};
