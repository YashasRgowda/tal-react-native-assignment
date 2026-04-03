# Ready! — AI Interview Practice App

A React Native app built with Expo for the Grapevine React Native Engineer take-home assignment. The app lets users practice top interview questions from Big Tech companies with AI-powered feedback.

## Screenshots

| Welcome | Home | Expanded Card | Feedback | Profile |
|---------|------|---------------|----------|---------|
| Video + orbiting logos | 3D pill cards | Question detail + buttons | Smart summary & key moments | Subscription + settings |

## Tech Stack

- **React Native 0.83** + **Expo 55** (custom dev client, not Expo Go)
- **TypeScript** — strict mode, no `any` types
- **React Navigation v7** — native stack + bottom tabs
- **@shopify/flash-list v2** — performant scrollable lists
- **expo-image** — all images with `cachePolicy="memory-disk"`
- **react-native-reanimated** — orbiting logo animation on welcome screen
- **expo-video** — video playback on welcome screen
- **expo-haptics** — tactile feedback on card presses
- **@expo-google-fonts/inter** — custom typography

## Project Structure

```
src/
├── components/ui/          # Reusable UI (AppText, Button, ReadyLogo)
├── features/
│   ├── auth/               # Splash, Welcome (video + orbiting logos), Login (OTP)
│   ├── home/               # Home screen + 3D question cards + inline expansion
│   ├── session-result/     # Feedback tabs (Smart Summary, Key Moments)
│   ├── settings/           # Profile, subscription card, menu
│   └── store/              # Placeholder store tab
├── navigation/             # Root, Auth, Main navigators + centralized types
├── theme/                  # Brand colors, spacing, typography tokens
├── utils/                  # Company logo resolver
└── mock-data/              # Companies, questions, session results, user profile
```

## Screens Implemented

1. **Splash** — Ready! logo, auto-navigates after 2s
2. **Welcome** — Video with company logos orbiting in circular motion, CTA to login
3. **Login** — Phone input + 6-digit OTP verification (any input works)
4. **Home** — 3D pill-shaped question cards with staggered layout, social proof banners
5. **Home (Open State)** — Inline expansion with question text, FEEDBACK and AI VS AI buttons
6. **Session Result** — Tabbed view with Smart Summary (bullet points) and Key Moments (timestamped highlights with mock audio player)
7. **Settings** — Subscription trial card with illustration, user info, menu items, logout

## Getting Started

```bash
# Install dependencies
yarn

# Generate native folders
yarn prebuild:clean

# Run on iOS simulator
yarn ios

# Run on Android emulator
yarn android
```

> First build takes a few minutes. Subsequent runs are much faster. If you add native libraries, re-run `yarn prebuild:clean`.

## Key Decisions

- **Inline expansion** over bottom sheet — matches the Figma design more closely
- **Local assets** for all company logos and illustrations — no network dependency
- **6-digit OTP** — Figma shows 6 boxes (README said 4, documented the discrepancy)
- **AuthContext** for state management — `useState` + `useContext` is sufficient for this scope
- **3D card design** — double-layer technique with colored shadow layers for depth

See [NOTES.md](./NOTES.md) for detailed trade-offs, assumptions, and what I'd improve with more time.
