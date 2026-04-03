import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Ionicons } from '@expo/vector-icons';
import AppText from '@/components/ui/app-text';

export default function StoreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="bag-outline" size={48} color={colors.textSecondary} style={styles.icon} />
        <AppText style={styles.title}>Store</AppText>
        <AppText style={styles.subtitle}>Coming soon</AppText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.screenPadding,
  },
  icon: {
    marginBottom: spacing.m,
  },
  title: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.xxl,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.m,
    color: colors.textSecondary,
  },
});
