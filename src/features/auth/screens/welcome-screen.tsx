import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { VideoView, useVideoPlayer, VideoPlayer } from 'expo-video';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  SharedValue,
} from 'react-native-reanimated';
import { AuthStackParamList } from '@/navigation/types';
import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import ReadyLogo from '@/components/ui/ready-logo';
import AppText from '@/components/ui/app-text';
import Button from '@/components/ui/button';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Orbit configuration
const CONTAINER_SIZE = SCREEN_WIDTH - spacing.screenPadding * 2;
const CIRCLE_SIZE = CONTAINER_SIZE * 0.54;
const ORBIT_RADIUS = CONTAINER_SIZE * 0.38;
const LOGO_BOX = 56;

const ORBIT_LOGOS = [
  { source: require('../../../../assets/amazon.png'), label: 'Amazon' },
  { source: require('../../../../assets/google.png'), label: 'Google' },
  { source: require('../../../../assets/microsoft.png'), label: 'Microsoft' },
  { source: require('../../../../assets/swiggy.png'), label: 'Swiggy' },
  { source: require('../../../../assets/zomato.png'), label: 'Zomato' },
];

const CENTER = CONTAINER_SIZE / 2;

interface OrbitingLogoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any;
  label: string;
  index: number;
  total: number;
  rotation: SharedValue<number>;
}

// Defined outside WelcomeScreen to avoid recreation on re-render
function OrbitingLogo({ source, label, index, total, rotation }: OrbitingLogoProps) {
  const startAngle = (index / total) * (Math.PI * 2) - Math.PI / 2;

  const animStyle = useAnimatedStyle(() => {
    const angle = rotation.value + startAngle;
    const x = CENTER + Math.cos(angle) * ORBIT_RADIUS - LOGO_BOX / 2;
    const y = CENTER + Math.sin(angle) * ORBIT_RADIUS - LOGO_BOX / 2;
    return {
      left: x,
      top: y,
    };
  });

  return (
    <Animated.View style={[styles.orbitingLogo, animStyle]}>
      <Image
        source={source}
        style={styles.orbitLogoImage}
        contentFit="contain"
        cachePolicy="memory-disk"
        accessibilityLabel={label}
      />
    </Animated.View>
  );
}

export default function WelcomeScreen({ navigation }: Props) {
  const rotation = useSharedValue(0);

  const player = useVideoPlayer(require('../../../../assets/1.mp4'), (p: VideoPlayer) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(Math.PI * 2, {
        duration: 10000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [rotation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.header}>
        <ReadyLogo size="medium" />
      </View>

      {/* Illustration area — video + orbiting logos */}
      <View style={styles.illustrationWrapper}>
        <View style={styles.illustrationContainer}>
          {/* Orbiting company logos */}
          {ORBIT_LOGOS.map((logo, i) => (
            <OrbitingLogo
              key={logo.label}
              source={logo.source}
              label={logo.label}
              index={i}
              total={ORBIT_LOGOS.length}
              rotation={rotation}
            />
          ))}

          {/* Center video circle */}
          <View style={styles.videoCircle}>
            <VideoView
              player={player}
              style={styles.video}
              nativeControls={false}
              contentFit="cover"
            />
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <AppText style={styles.tagline}>
          Practice Top Interview{'\n'}Questions{' '}
          <AppText style={styles.taglineHighlight}>with AI</AppText>
        </AppText>

        <Button
          label="  Let's go"
          onPress={() => navigation.navigate('Login')}
          style={styles.ctaButton}
          accessibilityLabel="Get started with Ready AI"
        />

        <AppText style={styles.disclaimer}>
          By continuing, you acknowledge agreeing to our{'\n'}
          <AppText style={styles.disclaimerLink}>terms of service</AppText>
          {' '}and{' '}
          <AppText style={styles.disclaimerLink}>privacy policy</AppText>
        </AppText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.m,
    alignItems: 'center',
  },
  illustrationWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationContainer: {
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    position: 'relative',
  },
  videoCircle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: 'hidden',
    backgroundColor: palette.orange20,
    left: CENTER - CIRCLE_SIZE / 2,
    top: CENTER - CIRCLE_SIZE / 2,
    // Subtle shadow to lift it above the orbiting logos
    shadowColor: palette.orange50,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 2,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  orbitingLogo: {
    position: 'absolute',
    width: LOGO_BOX,
    height: LOGO_BOX,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxs + 2,
    shadowColor: palette.gray90,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 1,
  },
  orbitLogoImage: {
    width: '100%',
    height: '100%',
  },
  footer: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.l,
    alignItems: 'center',
    gap: spacing.m,
  },
  tagline: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.inter.semiBold,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: typography.sizes.xl * 1.4,
  },
  taglineHighlight: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.inter.semiBold,
    color: colors.primary,
  },
  ctaButton: {
    width: '100%',
  },
  disclaimer: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.inter.normal,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.sizes.xs * 1.6,
  },
  disclaimerLink: {
    fontSize: typography.sizes.xs,
    color: colors.textLink,
    textDecorationLine: 'underline',
  },
});
