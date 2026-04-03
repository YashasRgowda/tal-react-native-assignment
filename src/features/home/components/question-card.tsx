import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import AppText from '@/components/ui/app-text';
import { getCompanyLogo } from '@/utils/company-logos';
import { Question } from '../types';

const CARD_THEMES = {
  active: {
    bg: '#C8F75E',
    bottomBorder: '#8ABF26',
    badgeBg: '#5BA019',
    badgeBorder: '#4A8514',
    badgeBottomBorder: '#3A6A10',
    badgeText: '#FFFFFF',
    cardBorder: '#B0DD3A',
    expandBg: '#C8F75E',
    textColor: '#1A1A1A',
  },
  next: {
    bg: '#FEF08A',
    bottomBorder: '#E5C743',
    badgeBg: '#F5C518',
    badgeBorder: '#D4A817',
    badgeBottomBorder: '#B08A10',
    badgeText: '#5C3A00',
    cardBorder: '#F0DA5A',
    expandBg: '#FEF08A',
    textColor: '#1A1A1A',
  },
  default: {
    bg: '#F3F4F6',
    bottomBorder: '#D1D5DB',
    badgeBg: '#E5E7EB',
    badgeBorder: '#D1D5DB',
    badgeBottomBorder: '#B0B5BC',
    badgeText: '#6B7280',
    cardBorder: '#E5E7EB',
    expandBg: '#F3F4F6',
    textColor: '#1A1A1A',
  },
};

function getTheme(index: number) {
  if (index === 0) return CARD_THEMES.active;
  if (index === 1) return CARD_THEMES.next;
  return CARD_THEMES.default;
}

function getIndent(index: number): number {
  if (index === 0) return 0;
  if (index === 1) return 20;
  if (index === 2) return 36;
  return 48;
}

interface QuestionCardProps {
  question: Question;
  index: number;
  isSelected: boolean;
  onPress: () => void;
  onFeedbackPress: () => void;
}

export default function QuestionCard({
  question,
  index,
  isSelected,
  onPress,
  onFeedbackPress,
}: QuestionCardProps) {
  const theme = getTheme(index);
  const indent = getIndent(index);

  const handlePress = () => {
    Haptics.selectionAsync();
    onPress();
  };

  return (
    <View style={[styles.wrapper, { marginLeft: indent }]}>
      {/* 3D pill card — outer shadow layer creates the "bottom edge" depth */}
      <View
        style={[
          styles.cardShadowLayer,
          {
            backgroundColor: theme.bottomBorder,
            shadowColor: theme.bottomBorder,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.card,
            {
              backgroundColor: theme.bg,
              borderColor: theme.cardBorder,
            },
          ]}
          onPress={handlePress}
          activeOpacity={0.9}
          accessibilityLabel={`Question ${question.questionNumber} by ${question.companyName}`}
          accessibilityRole="button"
        >
          {/* Company logo */}
          <View style={styles.logoCircle}>
            <Image
              source={getCompanyLogo(question.companyLogoUrl)}
              style={styles.logo}
              contentFit="contain"
              cachePolicy="memory-disk"
            />
          </View>

          {/* Company name */}
          <AppText style={styles.companyName} numberOfLines={1}>
            {question.companyName}
          </AppText>

          {/* 3D number badge */}
          <View
            style={[
              styles.badgeOuter,
              {
                backgroundColor: theme.badgeBottomBorder,
              },
            ]}
          >
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: theme.badgeBg,
                  borderColor: theme.badgeBorder,
                },
              ]}
            >
              <AppText style={[styles.badgeText, { color: theme.badgeText }]}>
                {question.questionNumber}
              </AppText>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* START label for first card when collapsed */}
      {index === 0 && !isSelected && (
        <TouchableOpacity
          style={styles.startButton}
          onPress={handlePress}
          accessibilityLabel="Start question 1"
          accessibilityRole="button"
        >
          <AppText style={styles.startText}>START</AppText>
        </TouchableOpacity>
      )}

      {/* Expanded detail panel */}
      {isSelected && (
        <View style={[styles.expandPanel, { backgroundColor: theme.expandBg }]}>
          <AppText style={[styles.questionText, { color: theme.textColor }]}>
            {question.text}
          </AppText>

          <View style={styles.meta}>
            <View style={styles.metaLogoWrapper}>
              <Image
                source={getCompanyLogo(question.companyLogoUrl)}
                style={styles.metaLogo}
                contentFit="contain"
                cachePolicy="memory-disk"
              />
            </View>
            <AppText style={styles.metaText}>Asked by {question.companyName}</AppText>
            <View style={styles.metaDot} />
            <Ionicons name="time-outline" size={13} color={colors.textSecondary} />
            <AppText style={styles.durationText}>{question.durationMinutes} mins</AppText>
          </View>

          {/* FEEDBACK button — outlined with 3D shadow */}
          <View style={styles.feedbackShadow}>
            <TouchableOpacity
              style={styles.feedbackButton}
              onPress={onFeedbackPress}
              activeOpacity={0.88}
              accessibilityLabel="View feedback for this question"
              accessibilityRole="button"
            >
              <AppText style={styles.feedbackButtonText}>FEEDBACK</AppText>
            </TouchableOpacity>
          </View>

          {/* AI VS AI button — dark filled with 3D shadow */}
          <View style={styles.aiShadow}>
            <TouchableOpacity
              style={styles.aiButton}
              activeOpacity={0.85}
              accessibilityLabel="AI VS AI listen mode"
              accessibilityRole="button"
            >
              <Ionicons name="headset" size={18} color={palette.white} />
              <AppText style={styles.aiButtonText}>AI VS AI (LISTEN)</AppText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const PILL_HEIGHT = 64;
const BADGE_SIZE = 50;
const SHADOW_DEPTH = 4;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.s,
  },

  /* 3D pill — the shadow layer peeks below the card to create a thick bottom edge */
  cardShadowLayer: {
    borderRadius: 50,
    paddingBottom: SHADOW_DEPTH,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1.5,
    paddingLeft: spacing.s,
    paddingRight: 4,
    height: PILL_HEIGHT,
    gap: spacing.xs,
  },

  /* Company logo */
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  logo: {
    width: 26,
    height: 26,
  },

  companyName: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.m,
    color: colors.textPrimary,
    flex: 1,
  },

  /* 3D number badge — outer layer creates the bottom edge / depth ring */
  badgeOuter: {
    width: BADGE_SIZE,
    height: BADGE_SIZE + SHADOW_DEPTH,
    borderRadius: BADGE_SIZE / 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  },
  badge: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  badgeText: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.xl,
  },

  /* START label */
  startButton: {
    alignSelf: 'flex-end',
    paddingRight: spacing.m,
    paddingTop: spacing.xxs,
  },
  startText: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.s,
    color: colors.success,
    letterSpacing: 1.5,
  },

  /* Expansion panel */
  expandPanel: {
    borderRadius: 24,
    padding: spacing.cardPadding,
    paddingTop: spacing.m,
    gap: spacing.m,
    marginTop: spacing.xs,
  },
  questionText: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.l,
    lineHeight: typography.sizes.l * 1.5,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  metaLogoWrapper: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  metaLogo: {
    width: 16,
    height: 16,
  },
  metaText: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: typography.sizes.s,
    color: colors.textSecondary,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.textSecondary,
    marginHorizontal: 2,
  },
  durationText: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.s,
    color: colors.textSecondary,
  },

  /* FEEDBACK — 3D outline button */
  feedbackShadow: {
    borderRadius: spacing.buttonRadius,
    paddingBottom: SHADOW_DEPTH,
    backgroundColor: '#1A8F3C',
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  feedbackButton: {
    height: 48,
    borderRadius: spacing.buttonRadius,
    borderWidth: 2,
    borderColor: colors.success,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackButtonText: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.m,
    color: colors.success,
    letterSpacing: 1.5,
  },

  /* AI VS AI — 3D dark button */
  aiShadow: {
    borderRadius: spacing.buttonRadius,
    paddingBottom: SHADOW_DEPTH,
    backgroundColor: '#26241C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 5,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: '#3D3A2E',
    borderRadius: spacing.buttonRadius,
    height: 48,
  },
  aiButtonText: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.m,
    color: palette.white,
    letterSpacing: 0.5,
  },
});
