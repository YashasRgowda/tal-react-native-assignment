import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import AppText from '@/components/ui/app-text';

interface SmartSummaryTabProps {
  whatWorkedWell: string[];
  overallTakeaways: string[];
}

function BulletItem({ text }: { text: string }) {
  return (
    <View style={styles.bulletRow}>
      <AppText style={styles.bullet}>◆</AppText>
      <AppText style={styles.bulletText}>{text}</AppText>
    </View>
  );
}

export default function SmartSummaryTab({
  whatWorkedWell,
  overallTakeaways,
}: SmartSummaryTabProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.sectionTitle}>What worked well</AppText>
      {whatWorkedWell.map((item, i) => (
        <BulletItem key={`well-${i}`} text={item} />
      ))}

      <View style={styles.sectionGap} />

      <AppText style={styles.sectionTitle}>Overall takeaways</AppText>
      {overallTakeaways.map((item, i) => (
        <BulletItem key={`takeaway-${i}`} text={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.l,
  },
  sectionTitle: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.l,
    color: colors.textPrimary,
    marginBottom: spacing.m,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.s,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 10,
    color: colors.primary,
    marginTop: 4,
  },
  bulletText: {
    flex: 1,
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.m,
    color: colors.textPrimary,
    lineHeight: typography.sizes.m * 1.55,
  },
  sectionGap: {
    height: spacing.l,
  },
});
