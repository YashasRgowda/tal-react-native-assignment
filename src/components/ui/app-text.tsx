import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

/**
 * Themed Text wrapper. Uses Inter font and brand text color by default.
 * Accepts all standard RN Text props.
 */
export default function AppText({ style, ...props }: TextProps) {
  return <Text style={[styles.base, style]} {...props} />;
}

const styles = StyleSheet.create({
  base: {
    fontFamily: typography.fonts.inter.normal,
    color: colors.textPrimary,
  },
});
