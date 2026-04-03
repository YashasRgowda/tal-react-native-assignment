import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { AuthStackParamList } from '@/navigation/types';
import { useAuth } from '@/features/auth/auth-context';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import AppText from '@/components/ui/app-text';
import Button from '@/components/ui/button';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const OTP_LENGTH = 6;
const PHONE_LENGTH = 10;

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));

  const otpRefs = useRef<Array<TextInput | null>>(Array(OTP_LENGTH).fill(null));

  const handleSendOtp = () => {
    if (phone.length !== PHONE_LENGTH) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setPhoneError('');
    setOtpSent(true);
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/[^0-9]/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const filled = otp.filter(Boolean).length;
    if (filled < OTP_LENGTH) return;
    login();
  };

  const isOtpComplete = otp.filter(Boolean).length === OTP_LENGTH;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.titleRow}>
            <AppText style={styles.titleOrange}>Kickstart </AppText>
            <AppText style={styles.titleDark}>your journey</AppText>
          </View>

          <AppText style={styles.subtitle}>
            We will send you an OTP to verify your number.
          </AppText>

          {/* Phone number input */}
          <AppText style={styles.label}>Phone number</AppText>
          <View
            style={[styles.phoneInputRow, phoneError ? styles.inputError : null]}
          >
            <View style={styles.countryCode}>
              <AppText style={styles.flag}>🇮🇳</AppText>
              <AppText style={styles.countryCodeText}>+91</AppText>
              <Ionicons name="chevron-down" size={14} color={colors.textSecondary} />
            </View>
            <View style={styles.divider} />
            <TextInput
              style={styles.phoneInput}
              value={phone}
              onChangeText={(text) => {
                setPhone(text.replace(/[^0-9]/g, '').slice(0, PHONE_LENGTH));
                if (phoneError) setPhoneError('');
              }}
              keyboardType="phone-pad"
              placeholder="Enter mobile number"
              placeholderTextColor={colors.textDisabled}
              editable={!otpSent}
              maxLength={PHONE_LENGTH}
              accessibilityLabel="Mobile number input"
            />
          </View>
          {!!phoneError && (
            <AppText style={styles.errorText}>{phoneError}</AppText>
          )}

          {/* OTP input */}
          {otpSent && (
            <View style={styles.otpSection}>
              <AppText style={styles.label}>Enter the OTP</AppText>
              <View style={styles.otpRow}>
                {otp.map((digit, i) => (
                  <TextInput
                    key={i}
                    ref={(ref) => {
                      otpRefs.current[i] = ref;
                    }}
                    style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                    value={digit}
                    onChangeText={(val) => handleOtpChange(i, val)}
                    onKeyPress={({ nativeEvent }) =>
                      handleOtpKeyPress(i, nativeEvent.key)
                    }
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    accessibilityLabel={`OTP digit ${i + 1}`}
                  />
                ))}
              </View>
            </View>
          )}

          <View style={styles.spacer} />

          <Button
            label={otpSent ? 'Continue' : 'Send OTP'}
            onPress={otpSent ? handleVerify : handleSendOtp}
            disabled={otpSent && !isOtpComplete}
            style={styles.ctaButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.m,
    paddingBottom: spacing.xxl,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.l,
    marginLeft: -spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.xs,
  },
  titleOrange: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.xxxl,
    color: colors.primary,
  },
  titleDark: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.xxxl,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.m,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
    lineHeight: typography.sizes.m * 1.5,
  },
  label: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: typography.sizes.s,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: spacing.inputRadius,
    height: 52,
    paddingHorizontal: spacing.m,
    backgroundColor: colors.background,
  },
  inputError: {
    borderColor: colors.error,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  flag: {
    fontSize: 18,
  },
  countryCodeText: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: typography.sizes.m,
    color: colors.textPrimary,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
    marginHorizontal: spacing.s,
  },
  phoneInput: {
    flex: 1,
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.m,
    color: colors.textPrimary,
    padding: 0,
  },
  errorText: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.xs,
    color: colors.error,
    marginTop: spacing.xxs,
  },
  otpSection: {
    marginTop: spacing.l,
  },
  otpRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  otpBox: {
    flex: 1,
    height: 52,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: spacing.inputRadius,
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.l,
    color: colors.textPrimary,
    backgroundColor: colors.backgroundSecondary,
  },
  otpBoxFilled: {
    borderColor: colors.borderFocused,
    backgroundColor: colors.primaryLight,
  },
  spacer: {
    flex: 1,
    minHeight: spacing.xxl,
  },
  ctaButton: {
    width: '100%',
  },
});
