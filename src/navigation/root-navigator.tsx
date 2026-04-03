import React from 'react';
import { useAuth } from '@/features/auth/auth-context';
import AuthNavigator from './auth-navigator';
import MainNavigator from './main-navigator';

export default function RootNavigator() {
  const { isAuthenticated, hasLaunched } = useAuth();

  if (isAuthenticated) {
    return <MainNavigator />;
  }

  // Skip Splash on logout — go directly to Welcome
  return <AuthNavigator initialRouteName={hasLaunched ? 'Welcome' : 'Splash'} />;
}
