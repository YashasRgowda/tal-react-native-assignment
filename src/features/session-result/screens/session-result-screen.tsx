import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import AppText from '@/components/ui/app-text';
import SmartSummaryTab from '../components/smart-summary-tab';
import KeyMomentsTab from '../components/key-moments-tab';
import { HomeStackParamList } from '@/navigation/types';
import sessionResultData from '@/mock-data/session-result.json';
import { getCompanyLogo } from '@/utils/company-logos';
import { SessionResult } from '../types';

type Props = NativeStackScreenProps<HomeStackParamList, 'SessionResult'>;
type Tab = 'smart-summary' | 'key-moments';

const sessionResult = sessionResultData as SessionResult;

const AVATAR_LEFT = require('../../../../assets/feedback_icon1.gif');
const AVATAR_RIGHT = require('../../../../assets/feedback_icon2.gif');

export default function SessionResultScreen({ navigation, route }: Props) {
  const { questionText, companyName, companyLogoUrl } = route.params;
  const [activeTab, setActiveTab] = useState<Tab>('smart-summary');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

        {/* Avatars */}
        <View style={styles.avatarsRow}>
          <View style={[styles.avatarCircle, styles.avatarLeft]}>
            <Image
              source={AVATAR_LEFT}
              style={styles.avatarImage}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          </View>
          <View style={[styles.avatarCircle, styles.avatarRight]}>
            <Image
              source={AVATAR_RIGHT}
              style={styles.avatarImage}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          </View>
        </View>

        {/* Green question card — close button sits at its top-right corner */}
        <View style={styles.questionCard}>
          {/* Close button — positioned relative to the green card */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Close session result"
            accessibilityRole="button"
          >
            <Ionicons name="close" size={18} color={colors.textPrimary} />
          </TouchableOpacity>

          <AppText style={styles.questionText}>{questionText}</AppText>

          <View style={styles.questionMeta}>
            <View style={styles.questionLogoWrapper}>
              <Image
                source={getCompanyLogo(companyLogoUrl)}
                style={styles.questionLogo}
                contentFit="contain"
                cachePolicy="memory-disk"
              />
            </View>
            <AppText style={styles.questionMetaText}>Asked by {companyName}</AppText>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('smart-summary')}
            accessibilityLabel="Smart summary tab"
            accessibilityRole="tab"
          >
            <AppText
              style={[
                styles.tabLabel,
                activeTab === 'smart-summary' && styles.tabLabelActive,
              ]}
            >
              Smart summary
            </AppText>
            {activeTab === 'smart-summary' && <View style={styles.tabUnderline} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('key-moments')}
            accessibilityLabel="Key moments tab"
            accessibilityRole="tab"
          >
            <AppText
              style={[
                styles.tabLabel,
                activeTab === 'key-moments' && styles.tabLabelActive,
              ]}
            >
              Key moments
            </AppText>
            {activeTab === 'key-moments' && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        </View>

        {/* Tab content */}
        {activeTab === 'smart-summary' ? (
          <SmartSummaryTab
            whatWorkedWell={sessionResult.smartSummary.whatWorkedWell}
            overallTakeaways={sessionResult.smartSummary.overallTakeaways}
          />
        ) : (
          <KeyMomentsTab
            keyMoments={sessionResult.keyMoments}
            audioDurationSeconds={sessionResult.audioDurationSeconds}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* Avatars */
  avatarsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.s,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: palette.gray20,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: colors.background,
  },
  avatarLeft: {
    zIndex: 2,
  },
  avatarRight: {
    zIndex: 1,
    marginLeft: -24,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },

  /* Green question card */
  questionCard: {
    marginHorizontal: spacing.screenPadding,
    backgroundColor: colors.success,
    borderRadius: spacing.cardRadius,
    padding: spacing.cardPadding,
    marginBottom: spacing.m,
    gap: spacing.xs,
    // overflow must be visible so the close button can sit outside the card boundary
    overflow: 'visible',
  },
  closeButton: {
    position: 'absolute',
    top: -14,
    right: -10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.green30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: palette.gray90,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.l,
    color: palette.white,
    lineHeight: typography.sizes.l * 1.4,
    paddingRight: spacing.m,
  },
  questionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  questionLogoWrapper: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  questionLogo: {
    width: 16,
    height: 16,
  },
  questionMetaText: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.s,
    color: palette.white,
    opacity: 0.9,
  },

  /* Tabs */
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.screenPadding,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.s,
    position: 'relative',
  },
  tabLabel: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: typography.sizes.m,
    color: colors.textSecondary,
  },
  tabLabelActive: {
    fontFamily: typography.fonts.inter.semiBold,
    color: colors.textPrimary,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    right: '10%',
    height: 2.5,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});
