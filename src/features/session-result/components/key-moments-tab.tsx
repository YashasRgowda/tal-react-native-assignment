import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import AppText from '@/components/ui/app-text';
import { KeyMoment } from '../types';

interface KeyMomentsTabProps {
  keyMoments: KeyMoment[];
  audioDurationSeconds: number;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function KeyMomentsTab({
  keyMoments,
  audioDurationSeconds,
}: KeyMomentsTabProps) {
  const duration = formatDuration(audioDurationSeconds);

  return (
    <View style={styles.container}>
      {/* Mock audio player */}
      <View style={styles.audioPlayer}>
        <AppText style={styles.audioTitle}>Mock Interview</AppText>
        <View style={styles.audioControls}>
          <TouchableOpacity
            style={styles.playButton}
            accessibilityLabel="Play mock interview recording"
            accessibilityRole="button"
          >
            <Ionicons name="play" size={18} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </View>
        <View style={styles.audioTimestamps}>
          <AppText style={styles.audioTime}>00:00</AppText>
          <AppText style={styles.audioTime}>{duration}</AppText>
        </View>
      </View>

      {/* Key moments list */}
      <View style={styles.momentsList}>
        {keyMoments.map((moment, i) => (
          <View key={i} style={styles.momentItem}>
            <AppText
              style={[
                styles.momentTimestamp,
                moment.type === 'negative' && styles.momentTimestampNegative,
              ]}
            >
              {moment.timestamp}
            </AppText>
            <AppText style={styles.momentDescription}>{moment.description}</AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.l,
  },
  audioPlayer: {
    backgroundColor: palette.orange10,
    borderRadius: spacing.cardRadius,
    padding: spacing.cardPadding,
    marginBottom: spacing.l,
  },
  audioTitle: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.m,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  audioControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 6,
    backgroundColor: palette.orange30,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    width: '30%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  audioTimestamps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xxs,
  },
  audioTime: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  momentsList: {
    gap: spacing.l,
  },
  momentItem: {
    gap: spacing.xxs,
  },
  momentTimestamp: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.m,
    color: colors.primary,
  },
  momentTimestampNegative: {
    color: colors.error,
  },
  momentDescription: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.m,
    color: colors.textPrimary,
    lineHeight: typography.sizes.m * 1.5,
  },
});
