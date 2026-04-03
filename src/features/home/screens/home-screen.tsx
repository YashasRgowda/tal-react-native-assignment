import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import AppText from '@/components/ui/app-text';
import QuestionCard from '../components/question-card';
import { Question } from '../types';
import { HomeStackParamList } from '@/navigation/types';
import questionsData from '@/mock-data/questions.json';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const questions: Question[] = questionsData as Question[];

// Social proof banner is injected after the 3rd question
interface SocialProofItem {
  type: 'social-proof';
  id: string;
  text: string;
}

type ListItem = Question | SocialProofItem;

function isSocialProof(item: ListItem): item is SocialProofItem {
  return (item as SocialProofItem).type === 'social-proof';
}

const SOCIAL_PROOF_AFTER_INDEX = 2;

const listData: ListItem[] = questions.reduce<ListItem[]>((acc, q, i) => {
  acc.push(q);
  if (i === SOCIAL_PROOF_AFTER_INDEX) {
    acc.push({
      type: 'social-proof',
      id: 'social-proof',
      text: `${q.completedTodayCount.toLocaleString()} users completed Question ${q.questionNumber} today`,
    });
  }
  return acc;
}, []);

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

export default function HomeScreen({ navigation }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPracticeExpanded, setIsPracticeExpanded] = useState(false);
  const listRef = React.useRef<FlashListRef<ListItem>>(null);

  const handleCardPress = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleFeedbackPress = useCallback(
    (question: Question) => {
      navigation.push('SessionResult', {
        questionId: question.id,
        questionText: question.text,
        companyName: question.companyName,
        companyLogoUrl: question.companyLogoUrl,
      });
    },
    [navigation],
  );

  // Maps list index → question's visual index (0 = lime, 1 = yellow, 2+ = gray)
  const getQuestionIndex = useCallback((listIndex: number): number => {
    return listIndex > SOCIAL_PROOF_AFTER_INDEX + 1 ? listIndex - 1 : listIndex;
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: ListItem; index: number }) => {
      if (isSocialProof(item)) {
        return (
          <View style={styles.socialProofBanner}>
            <Ionicons name="ribbon" size={16} color={colors.primary} />
            <AppText style={styles.socialProofText}>{item.text}</AppText>
            <Ionicons name="ribbon" size={16} color={colors.primary} />
          </View>
        );
      }
      const questionIndex = getQuestionIndex(index);
      return (
        <QuestionCard
          question={item}
          index={questionIndex}
          isSelected={selectedId === item.id}
          onPress={() => handleCardPress(item.id)}
          onFeedbackPress={() => handleFeedbackPress(item)}
        />
      );
    },
    [selectedId, handleCardPress, handleFeedbackPress, getQuestionIndex],
  );

  const keyExtractor = useCallback((item: ListItem) => item.id, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <AppText style={styles.headerLogo}>Ready!</AppText>
        <View style={styles.headerRight}>
          <View style={styles.notificationBadge}>
            <Ionicons name="flash" size={12} color={palette.white} />
            <AppText style={styles.notificationCount}>8</AppText>
          </View>
          <TouchableOpacity
            style={styles.menuButton}
            accessibilityLabel="Open menu"
            accessibilityRole="button"
          >
            <Ionicons name="menu" size={26} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Practice set card */}
      <TouchableOpacity
        style={styles.practiceCard}
        onPress={() => setIsPracticeExpanded((v) => !v)}
        activeOpacity={0.85}
        accessibilityLabel="Practicing Top 50 Questions for Big Tech Companies"
        accessibilityRole="button"
      >
        <Ionicons name="barbell-outline" size={22} color={colors.primary} />
        <View style={styles.practiceTextContainer}>
          <AppText style={styles.practiceSubtitle}>Practicing Top 50 Questions for</AppText>
          <AppText style={styles.practiceTitle}>Big Tech Companies</AppText>
        </View>
        <Ionicons
          name={isPracticeExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      {/* Question list */}
      <FlashList
        ref={listRef}
        data={listData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.m,
  },
  headerLogo: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.xxl,
    color: colors.primary,
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
  },
  notificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    borderRadius: 14,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxxs + 2,
    gap: 2,
  },
  notificationCount: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.s,
    color: palette.white,
  },
  menuButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing.m,
    backgroundColor: palette.orange10,
    borderRadius: spacing.cardRadius,
    paddingHorizontal: spacing.cardPadding,
    paddingVertical: spacing.s,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: palette.orange30,
  },
  practiceTextContainer: {
    flex: 1,
  },
  practiceSubtitle: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.s,
    color: colors.textSecondary,
  },
  practiceTitle: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.m,
    color: colors.textPrimary,
  },
  listContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xxxl,
  },
  socialProofBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: palette.orange10,
    borderRadius: 28,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
    marginBottom: spacing.s,
    borderWidth: 1.5,
    borderColor: palette.orange30,
    shadowColor: palette.orange40,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  socialProofText: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.s,
    color: colors.primary,
    flex: 1,
    textAlign: 'center',
  },
});
