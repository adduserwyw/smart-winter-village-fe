import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import config from '../../config.js';

type MusicMood = 'fun' | 'energetic' | 'romantic' | 'calm';

interface MoodButtonProps {
  mood: MusicMood;
  isSelected: boolean;
  isLoading: boolean;
  onClick: () => void;
  colors: { from: string; to: string };
}

function MoodButton({ mood, isSelected, isLoading, onClick, colors }: MoodButtonProps) {
  return (
      <TouchableOpacity
          onPress={onClick}
          disabled={isLoading}
          style={[
            styles.moodButton,
            isSelected && styles.selectedButton
          ]}
      >
        {/* Background color layer */}
        <View style={[
          styles.absoluteFill,
          { backgroundColor: colors.from }
        ]} />

        {/* Noise texture layer using Image background */}
        <View style={[styles.noiseTexture, {opacity: 0.1}]}>
          <Image
              source={{
                uri: 'data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#noiseFilter)"/></svg>'
              }}
              style={styles.noisePattern}
              resizeMode="repeat"
          />
        </View>

        {/* Content layer */}
        <View style={styles.moodButtonContentWrapper}>
          {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
          ) : (
              <View style={styles.moodButtonContent}>
                <Text style={styles.moodButtonText}>{mood.charAt(0).toUpperCase() + mood.slice(1)}</Text>
                <Text style={styles.moodButtonSubtext}>Tap to play</Text>
              </View>
          )}
        </View>
      </TouchableOpacity>
  );
}

export default function VibeSettingScreen() {
  const [selectedMood, setSelectedMood] = useState<MusicMood | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMusic, setCurrentMusic] = useState<string | null>(null);

  const generateMusic = async (mood: MusicMood) => {
    setSelectedMood(mood);
    setIsLoading(true);

    try {
      // API call to generate music
      const response = await fetch(`${config.apiUrl}/api/vibe/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood }),
      });

      const data = await response.json();
      // Assuming the API returns a music file URL or identifier
      setCurrentMusic(data.musicUrl || mood);
      setIsPlaying(true);
    } catch (error) {
      console.error('Failed to generate music:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = async () => {
    try {
      // API call to play/pause music
      // Commented out for now
      // await fetch('/music/playback', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ action: isPlaying ? 'pause' : 'play' }),
      // });

      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Failed to control playback:', error);
    }
  };

  // Audio visualization bars
  const renderVisualization = () => {
    if (!Array.from) {
      // Polyfill or fallback for environments where Array.from is not available
      return [];
    }

    try {
      return Array.from({ length: 30 }).map((_, i) => {
        const height = Math.max(15, Math.min(100, Math.random() * 100));
        const opacity = isPlaying ? 0.6 + Math.random() * 0.4 : 0.3;

        return (
            <View
                key={i}
                style={[
                  styles.visualizationBar,
                  {
                    height: `${height}%`,
                    opacity,
                  },
                  isPlaying && styles.pulsatingBar
                ]}
            />
        );
      });
    } catch (error) {
      console.error('Error rendering visualization:', error);
      return []; // Return empty array as fallback
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Feather name="music" size={24} color="#fff" />
          </View>
        </View>

        <Text style={styles.title}>Music Vibes</Text>
        <Text style={styles.subtitle}>Select a mood to generate music that matches your vibe</Text>

        <View style={styles.moodGrid}>
          <MoodButton
              mood="fun"
              isSelected={selectedMood === 'fun'}
              isLoading={isLoading && selectedMood === 'fun'}
              onClick={() => generateMusic('fun')}
              colors={{ from: '#F59E0B', to: '#F97316' }} // yellow to orange
          />
          <MoodButton
              mood="energetic"
              isSelected={selectedMood === 'energetic'}
              isLoading={isLoading && selectedMood === 'energetic'}
              onClick={() => generateMusic('energetic')}
              colors={{ from: '#F87171', to: '#EC4899' }} // red to pink
          />
          <MoodButton
              mood="romantic"
              isSelected={selectedMood === 'romantic'}
              isLoading={isLoading && selectedMood === 'romantic'}
              onClick={() => generateMusic('romantic')}
              colors={{ from: '#A78BFA', to: '#EC4899' }} // purple to pink
          />
          <MoodButton
              mood="calm"
              isSelected={selectedMood === 'calm'}
              isLoading={isLoading && selectedMood === 'calm'}
              onClick={() => generateMusic('calm')}
              colors={{ from: '#60A5FA', to: '#2DD4BF' }} // blue to teal
          />
        </View>

        {currentMusic && (
            <View style={styles.playerContainer}>
              <View style={styles.playerInfoRow}>
                <View>
                  <Text style={styles.playerTitle}>
                    {selectedMood?.charAt(0).toUpperCase() + selectedMood?.slice(1)} Vibes
                  </Text>
                  <Text style={styles.playerSubtitle}>AI Generated Music</Text>
                </View>

                <TouchableOpacity
                    onPress={togglePlayPause}
                    disabled={isLoading}
                    style={styles.playPauseButton}
                >
                  {isLoading ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                  ) : isPlaying ? (
                      <Feather name="pause" size={20} color="#fff" />
                  ) : (
                      <Feather name="play" size={20} color="#fff" />
                  )}
                </TouchableOpacity>
              </View>

              {/* Audio visualization */}
              <View style={styles.visualization}>
                {renderVisualization()}
              </View>
            </View>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#121212',
  },
  iconContainer: {
    alignItems: 'center',
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
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 24,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodButton: {
    height: 80,
    width: '48%', // Approximately half the width with spacing
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    position: 'relative',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  noiseTexture: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  noisePattern: {
    width: '100%',
    height: '100%',
  },
  moodButtonContentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  moodButtonContent: {
    alignItems: 'center',
  },
  moodButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  moodButtonSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  playerContainer: {
    marginTop: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  playerInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  playerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  playPauseButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  visualization: {
    marginTop: 16,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  visualizationBar: {
    width: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 2,
    marginHorizontal: 1,
  },
  pulsatingBar: {
  },
});