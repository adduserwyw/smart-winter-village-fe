import './src/components/configureRemoteControl';
import { ThemeProvider } from '@emotion/react';
import { NavigationContainer } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { theme } from './src/design-system/theme/theme';
import { Home } from './src/pages/Home';
import { Menu } from './src/components/Menu/Menu';
import { MenuProvider } from './src/components/Menu/MenuContext';
import styled from '@emotion/native';
import { useFonts } from './src/hooks/useFonts';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProgramInfo } from './src/modules/program/domain/programInfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServiceScreen from "./src/components/Services/ServiceScreen";
import { useTVPanEvent } from './src/components/PanEvent/useTVPanEvent';
import { SpatialNavigationDeviceTypeProvider } from 'react-tv-space-navigation';
import InfoPage from "./src/pages/InfoPage";
import VibeSetting from "./src/pages/VibeSetting";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
  Home: undefined;
    Vibe: undefined;
  Contact: undefined;
  Info: undefined;
  Guest: undefined;
};

export type RootStackParamList = {
  TabNavigator: undefined;
  ProgramDetail: { programInfo: ProgramInfo };
};

const RenderMenu = (props: BottomTabBarProps) => <Menu {...props} />;

const TabNavigator = () => {
  return (
    <MenuProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
        tabBar={RenderMenu}
        sceneContainerStyle={{
          marginLeft: theme.sizes.menu.closed,
          backgroundColor: theme.colors.background.main,
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Vibe" component={VibeSetting} />
          <Tab.Screen name="Info" component={InfoPage} />
        <Tab.Screen name="Guest" component={ServiceScreen} />
      </Tab.Navigator>
    </MenuProvider>
  );
};

function App() {
  useTVPanEvent();
  const { height, width } = useWindowDimensions();
  const areFontsLoaded = useFonts();

  if (!areFontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <SpatialNavigationDeviceTypeProvider>
          <Container width={width} height={height}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: theme.colors.background.main,
                },
              }}
              initialRouteName="TabNavigator"
            >
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
              {/*<Stack.Screen name="ProgramDetail" component={ProgramDetail} />*/}
            </Stack.Navigator>
          </Container>
        </SpatialNavigationDeviceTypeProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;

const Container = styled.View<{ width: number; height: number }>(({ width, height }) => ({
  width,
  height,
  flexDirection: 'row-reverse',
  backgroundColor: theme.colors.background.main,
}));
