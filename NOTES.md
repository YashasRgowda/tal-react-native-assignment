# NOTES.md — Ready! Take-Home Assignment

## Trade-offs & Decisions

### 1. Home Open State — Inline Expansion over Bottom Sheet
The assignment listed `@gorhom/bottom-sheet` as a tool to consider, but the Figma clearly shows the question detail expanding inline within the list (not as an overlay). I chose inline expansion because it matches the visual design more closely and is less disruptive to the scroll experience.
**Trade-off:** A bottom sheet would enable richer gestures (drag to dismiss, snap points). If the design were a modal overlay, I would have used `@gorhom/bottom-sheet` with `SnapPoints`.

### 2. Session Result Data — Single Object, Not Per-Question
The `session-result.json` contains one mock result. When navigating from any question card's "FEEDBACK" button, the same result is displayed. The question text and company shown in the header are passed via navigation params (so they're always accurate), while the tab content (Smart Summary, Key Moments) is from the JSON.
**Assumption:** In production, this would be a POST to an AI inference endpoint after a live session. The mock simulates a completed session for question 1 only.

### 3. Inter Font Loading
Fonts are loaded in `App.tsx` using `useFonts`. The app renders `null` while fonts load — this is the standard Expo pattern and avoids layout shifts. With `expo-splash-screen`, we could keep the native splash visible instead of a blank frame, but that would require additional native configuration outside the app's JS layer.

### 4. Logo Images — Wikipedia/CDN URLs
Company logos use Wikipedia Commons SVG/PNG URLs since clearbit has moved to a paid tier. These URLs are stable and well-cached. In a production app, logos would be served from your own CDN or bundled as local assets.

### 5. Welcome Screen Illustration
The Figma uses a custom cartoon character illustration that is not available in the repository assets. I created a functional replacement using company logos arranged in a circular layout. The character illustration would be added as a local asset (`assets/illustration.png`) in a production build.

### 6. `@shopify/flash-list` v2
The installed version is `2.0.2`, which is a major breaking change from v1. `estimatedItemSize` was removed. The v2 API uses an internal layout manager and auto-sizes items. The `FlashListRef` type is now separate from `FlashList` for `useRef` typing.

### 7. OTP Length — 6 digits
The README states "4-digit OTP" but the Figma clearly shows 6 input boxes. I implemented 6-digit OTP to match the visual design, noting this discrepancy here.

### 8. Card Colors
The active card (green-yellow) and next card (yellow) colors (`#C8F75E`, `#FEF08A`) are outside the provided theme palette, which only includes orange, green, and gray tones. These are defined as local constants inside `question-card.tsx` with comments. In a production app, I would add these to `src/theme/colors.ts` as `palette.lime40` and `palette.yellow20`.

### 9. AuthContext Over Redux/Zustand
Authentication state (isAuthenticated, hasLaunched) is managed via React Context. This is sufficient for the mock data flow and avoids bringing in a state management library. The `hasLaunched` flag ensures we skip the Splash screen on logout (user goes directly to Welcome instead of seeing the 2-second splash again).

---

## What I Would Improve With More Time

1. **Native Splash Screen** — Use `expo-splash-screen.hideAsync()` after fonts/data load to eliminate the brief white flash on startup.
2. **Animated Inline Expansion** — Use `react-native-reanimated`'s `useAnimatedStyle` with `withTiming` for a smoother height animation on card expand/collapse instead of `LayoutAnimation`.
3. **Skeleton Loading** — Add shimmer skeletons for the question list and session result while data "loads" (even with mock data, a brief skeleton improves perceived performance).
4. **Real Bottom Sheet** — Implement `@gorhom/bottom-sheet` for a more polished question detail experience with gesture-based dismissal.
5. **Accessibility Audit** — Add `accessibilityHint`, `accessibilityState` (for selected/expanded cards), and `accessibilityLiveRegion` on dynamic content updates.
6. **Error Boundaries** — Wrap screens in React error boundaries to handle unexpected crashes gracefully.
7. **Welcome Screen Character** — Request the Figma illustration asset from design and bundle it as a local asset.
8. **Deep Link Support** — Add deep link navigation so users can share a specific question card and have it open directly.

---

## Assumptions About the Figma Design

- The "Progress" label visible in one Home Open State screenshot was treated as a design artifact; the assignment README specifies "Home, Settings, Store" for tab labels.
- The Settings screen back button navigates to the Home tab (not a true back navigation, since Settings is a root tab).
- The "AI VS AI (LISTEN)" button is non-functional per the assignment spec — rendered as a disabled/decorative button.
- The subscription trial card in Settings uses placeholder pricing (₹1 trial, ₹299/month) based on what's visible in the Figma screenshot.
- User data (phone, learning since date) is read from `user.json` and matches what is shown in the Figma.
