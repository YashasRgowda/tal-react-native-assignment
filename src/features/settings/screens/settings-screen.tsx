import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useAuth } from '@/features/auth/auth-context';
import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import AppText from '@/components/ui/app-text';
import { MainTabParamList } from '@/navigation/types';
import userData from '@/mock-data/user.json';
import { User, MenuItem } from '../types';

type Props = BottomTabScreenProps<MainTabParamList, 'Settings'>;

const PROFILE_ILLUSTRATION = require('../../../../assets/your-profile.png');

const user = userData as User;

const MENU_ITEMS: MenuItem[] = [
  { id: 'update', label: 'New update available', icon: 'download-outline', hasChevron: false },
  { id: 'phone', label: 'Phone number', icon: 'call-outline', value: user.phone, hasChevron: false },
  { id: 'since', label: 'Learning since', icon: 'calendar-outline', value: user.learningSince, hasChevron: false },
  { id: 'chat', label: 'Chat with us', icon: 'chatbubble-outline', hasChevron: true },
  { id: 'share', label: 'Share the app', icon: 'share-social-outline', hasChevron: true },
  { id: 'rate', label: 'Rate the app', icon: 'star-outline', hasChevron: true },
];

export default function SettingsScreen({ navigation }: Props) {
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('HomeTab', { screen: 'HomeMain' })}
          accessibilityLabel="Go back to home"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Your Profile</AppText>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Subscription card */}
        <View style={styles.subscriptionCard}>
          {/* Top row: text left + illustration right */}
          <View style={styles.subTopRow}>
            <View style={styles.subTextCol}>
              <AppText style={styles.subTrialText}>3 days free trial for</AppText>
              <AppText style={styles.subPrice}>₹1</AppText>
              <AppText style={styles.subMonthly}>Then ₹299/month</AppText>
            </View>
            <Image
              source={PROFILE_ILLUSTRATION}
              style={styles.illustrationImage}
              contentFit="contain"
              cachePolicy="memory-disk"
            />
          </View>

          {/* Full-width CTA button */}
          <TouchableOpacity
            style={styles.subButton}
            activeOpacity={0.85}
            accessibilityLabel="Start 3 day trial for 1 rupee"
            accessibilityRole="button"
          >
            <AppText style={styles.subButtonText}>START 3 DAYS TRIAL @ ₹1</AppText>
          </TouchableOpacity>
        </View>

        {/* Menu items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index < MENU_ITEMS.length - 1 && styles.menuItemBorder,
              ]}
              activeOpacity={item.hasChevron ? 0.7 : 1}
              accessibilityLabel={item.label}
              accessibilityRole={item.hasChevron ? 'button' : 'text'}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                  size={20}
                  color={colors.textSecondary}
                />
                <AppText style={styles.menuItemLabel}>{item.label}</AppText>
              </View>
              <View style={styles.menuItemRight}>
                {item.value && (
                  <AppText style={styles.menuItemValue}>{item.value}</AppText>
                )}
                {item.id === 'update' && (
                  <View style={styles.updateBadge}>
                    <Ionicons name="download-outline" size={16} color={colors.success} />
                  </View>
                )}
                {item.hasChevron && (
                  <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
                )}
              </View>
            </TouchableOpacity>
          ))}

          {/* Log out */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={logout}
            accessibilityLabel="Log out"
            accessibilityRole="button"
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="log-out-outline" size={20} color={colors.error} />
              <AppText style={[styles.menuItemLabel, styles.logoutLabel]}>Log out</AppText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.m,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.l,
    color: colors.textPrimary,
  },
  headerRight: {
    width: 36,
  },

  /* Subscription card */
  subscriptionCard: {
    margin: spacing.screenPadding,
    backgroundColor: '#1A1A2E',
    borderRadius: spacing.cardRadius,
    padding: spacing.cardPadding,
    overflow: 'hidden',
  },
  subTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  subTextCol: {
    flex: 1,
    gap: spacing.xxs,
  },
  subTrialText: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.s,
    color: palette.white,
    opacity: 0.8,
  },
  subPrice: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: 36,
    lineHeight: 40,
    color: '#FFD700',
  },
  subMonthly: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.xs,
    color: palette.white,
    opacity: 0.6,
  },
  illustrationImage: {
    width: 130,
    height: 110,
    marginTop: -spacing.xs,
    marginRight: -spacing.xxs,
  },
  subButton: {
    backgroundColor: '#F5EDE0',
    borderRadius: spacing.buttonRadius,
    paddingVertical: spacing.s,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.s,
  },
  subButtonText: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.s,
    color: '#1A1A2E',
    letterSpacing: 0.5,
  },

  /* Menu list */
  menuContainer: {
    marginHorizontal: spacing.screenPadding,
    backgroundColor: colors.background,
    borderRadius: spacing.cardRadius,
    overflow: 'hidden',
    marginBottom: spacing.xxl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.cardPadding,
    paddingVertical: spacing.m,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
    flex: 1,
  },
  menuItemLabel: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.m,
    color: colors.textPrimary,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  menuItemValue: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.s,
    color: colors.textSecondary,
  },
  updateBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutLabel: {
    color: colors.error,
  },
});
