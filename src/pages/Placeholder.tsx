import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Settings } from 'lucide-react-native';

export default function Placeholder() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.mainContent}>
            <View style={styles.iconContainer}>
              <Settings width={48} height={48} color="white" />
            </View>

            <Text style={styles.title}>Under Construction</Text>

            <Text style={styles.description}>
              We're making something wonderful and can't wait to share it with you.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Please check back soon.</Text>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  content: {
    width: '100%',
    maxWidth: 768,
    alignItems: 'center',
  },
  mainContent: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: -0.5,
    color: 'white',
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    color: '#bbbbbb',
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 560,
  },
  footer: {
    paddingTop: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#bbbbbb',
    textAlign: 'center',
  }
});