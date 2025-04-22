import {useEffect, useState} from 'react';
import styled from '@emotion/native';
import {
  DefaultFocus,
  SpatialNavigationScrollView,
} from 'react-tv-space-navigation';
import { Page } from '../components/Page';
import { Typography } from '../design-system/components/Typography';
import {LinearGradient} from "expo-linear-gradient";
import { BottomArrow, TopArrow } from '../design-system/components/Arrows';
import {ActivityIndicator, StyleSheet, View,Text} from 'react-native';

import TabGroup from '../components/TabGroup';
import AuroraForecast from "../components/cards/AuroraCard/AuroraCard";
import CurrentWeather from "../components/Weather/CurrentWeather/CurrentWeather";
import WeatherScreen from "../components/Weather/WeatherScreen";

import config from '../../config.js';

export const Home = () => {
  const [activeTab, setActiveTab] = useState<"weather" | "aurora">("weather");
  const [auroraData, setAuroraData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetchAuroraData(),
      fetchWeatherData()
    ])
        .then(() => setLoading(false))
        .catch(err => {
          console.error('Error fetching data:', err);
          setError('Failed to fetch data');
          setLoading(false);
        });
  }, []);

  const fetchAuroraData = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/aurora/forecast`);

      if (!response.ok) {
        throw new Error(`Aurora API error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAuroraData(data.aurora);
      return data;
    } catch (err) {
      console.error('Error fetching aurora data:', err);
      setError(prev => prev || 'Failed to fetch aurora data');
      throw err;
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch('http://74.178.120.220/api/weather/current');

      if (!response.ok) {
        throw new Error(`Weather API error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Weather API Response:", data);
      setWeatherData(data.weather || data); // Adjust based on actual API structure
      return data;
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(prev => prev || 'Failed to fetch weather data');
      throw err;
    }
  };

  if (loading) {
    return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading data...</Text>
        </View>
    );
  }

  if (error) {
    return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
    );
  }


  return (
       <Page>
         <LinearGradient
             colors={['#1E3A8A', '#1E40AF', '#3B82F6']} // from-blue-900, via-blue-700, to-blue-500
             style={styles.backgroundGradient}
             start={{ x: 0, y: 0 }}
             end={{ x: 0, y: 1 }}
         >
      <DefaultFocus>
        <SpatialNavigationScrollView
          offsetFromStart={140}
          ascendingArrow={<BottomArrow />}
          ascendingArrowContainerStyle={styles.bottomArrowContainer}
          descendingArrow={<TopArrow />}
          descendingArrowContainerStyle={styles.topArrowContainer}
        >
          <View style={styles.weatherWrapper}>
            <CurrentWeather
                temp={weatherData.temp}
                high={weatherData.high}
                low={weatherData.low}
                condition={weatherData.condition}
            />
          </View>
          {/*Tab Group*/}
          <View style={styles.tabContainer}>
            <TabGroup activeTab={activeTab} onChange={setActiveTab} />
          </View>
          {/* Conditional content based on active tab */}
          <View style={styles.contentContainer}>
            {activeTab === "weather" ? (
                    <WeatherScreen />
            ) : (
                // Aurora content
                <View style={styles.auroraContainer}>
                  <AuroraForecast
                      kpIndex={auroraData.kpIndex}
                      visibility={auroraData.visibility}
                      bestTime={auroraData.bestTime}
                      location={auroraData.location}
                      forecast={auroraData.forecast}
                  />
                 </View>
            )}
          </View>
            {/*<SmartVillage />*/}
          {/*<Box padding="$10">*/}
          {/*  <ProgramListWithTitle title="Popular" />*/}
          {/*  <Spacer gap="$6" />*/}
          {/*  <ProgramListWithTitle title="Classics" />*/}
          {/*  <Spacer gap="$6" />*/}
          {/*  <ProgramListWithTitle title="Watch again" />*/}
          {/*  <Spacer gap="$6" />*/}
          {/*  <ProgramListWithTitle title="You may also like..." />*/}
          {/*  <Spacer gap="$6" />*/}
          {/*  <ProgramListWithTitleAndVariableSizes*/}
          {/*    listSize={10}*/}
          {/*    title="Our selection"*/}
          {/*  ></ProgramListWithTitleAndVariableSizes>*/}
          {/*  <Spacer gap="$6" />*/}
          {/*  <ProgramListWithTitleAndVariableSizes*/}
          {/*    listSize={100}*/}
          {/*    title="Oscar Winners"*/}
          {/*  ></ProgramListWithTitleAndVariableSizes>*/}
          {/*  <Spacer gap="$6" />*/}
          {/*  <ProgramListWithTitleAndVariableSizes title="Child section"></ProgramListWithTitleAndVariableSizes>*/}
          {/*</Box>*/}
        </SpatialNavigationScrollView>
      </DefaultFocus>
         </LinearGradient>
    </Page>
  );
};

const TitleContainer = styled.View(({ theme }) => ({ padding: theme.spacings.$1, backgroundColor: theme.colors.background.main }));

const Title = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.primary.main,
}));

const styles = StyleSheet.create({
  topArrowContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
    left: 0,
  },
  bottomArrowContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -15,
    left: 0,
  },
  tabContainer: {
    marginTop: 16, // mt-8
  },
  contentContainer: {
    padding: 4,
    paddingHorizontal:16,
    width: '100%',
  },
  backgroundGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  weatherWrapper: {
    marginTop: 16, // mt-8
    width: '100%',     // equivalent to w-full
    maxWidth: 448,     // equivalent to max-w-md (448px)
    marginHorizontal: 'auto',  // equivalent to mx-auto
  },
  auroraContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // bg-white/10
    borderRadius: 24, // rounded-3xl
    padding: 16, // p-4
    marginBottom: 12, // mb-8
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
