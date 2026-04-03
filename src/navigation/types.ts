import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  SessionResult: {
    questionId: string;
    questionText: string;
    companyName: string;
    companyLogoUrl: string;
  };
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  Settings: undefined;
  Store: undefined;
};
