import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

type LogoSize = 'small' | 'medium' | 'large';

const SIZE_MAP: Record<LogoSize, { ready: number; ai: number; radius: number; px: number; py: number }> = {
  small: { ready: 20, ai: 14, radius: 5, px: 5, py: 2 },
  medium: { ready: 28, ai: 20, radius: 6, px: 6, py: 2 },
  large: { ready: 40, ai: 28, radius: 8, px: 8, py: 3 },
};

interface ReadyLogoProps {
  size?: LogoSize;
}

export default function ReadyLogo({ size = 'medium' }: ReadyLogoProps) {
  const s = SIZE_MAP[size];
  return (
    <View style={styles.container}>
      <Text style={[styles.ready, { fontSize: s.ready }]}>Ready</Text>
      <View
        style={[
          styles.aiBadge,
          { borderRadius: s.radius, paddingHorizontal: s.px, paddingVertical: s.py },
        ]}
      >
        <Text style={[styles.ai, { fontSize: s.ai }]}>ai</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ready: {
    fontFamily: typography.fonts.inter.bold,
    color: colors.primary,
    letterSpacing: -0.5,
  },
  aiBadge: {
    backgroundColor: colors.textPrimary,
    marginLeft: spacing.xxxs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ai: {
    fontFamily: typography.fonts.inter.bold,
    color: colors.textInverse,
    letterSpacing: -0.3,
  },
});
