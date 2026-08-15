# Daily Bible Confession / Daily Faith Declaration — PRD

## Original Problem Statement
Build an Android + iOS mobile app to help users make a daily Bible confession (Daily Bible Confession).
Full-year calendar-based daily schedule; each day ≥7 verses on faith, blessing, healing, protection,
victory, grace and God's love; each verse shown one-by-one full screen with attractive visuals/glow;
"Next Verse" navigation; a short daily prayer after 7 verses; an appreciation screen
("बहुत अच्छा! आपने आज का अंगीकार पूरा किया") with Faith Points, Streak, Daily Badge; daily streak tracking;
calendar with completed/missed/current-day colors and tap-to-reread; offline; Hindi + English; Dark + Light;
gamification (points, streaks, weekly champion, monthly certificate, progress dashboard); modern Christian
theme, elegant typography, premium look, easy for elderly.

## User Choices (gathered)
- Deliverable: a real, working mobile app.
- Framework: React Native (Expo) — user accepted (originally requested Flutter; not available on platform).
- Content: first ~30 days real content + scaffold. (Implemented as themed verse pools that deterministically
  compose a unique-feeling plan for every day of the year, fully offline.)
- Daily reminder notifications: Yes (local scheduled reminders; works on real build).
- Language: both Hindi + English, default Hindi. Theme: both Light + Dark.

## Architecture
- **Frontend:** Expo Router (SDK 54, React Native 0.81, New Arch). Bottom tabs: Today, Calendar, Progress, Settings.
  Full-screen stack route `reader/[date]` for the verse reader + appreciation.
- **Offline-first / no backend dependency:** All content bundled locally (`src/content/content.ts`).
  Progress, language, theme persisted via `@/src/utils/storage` (AsyncStorage). Backend is the default template only.
- **State:** React Context — ThemeContext, LanguageContext (i18n hi/en), ProgressContext (points/streak/badges).
- **Design:** Warm Amber & Stone palette (design_guidelines.json). Playfair Display (display) + DM Sans (text),
  loaded via expo-font from static TTFs in `assets/fonts`. Feather icons. LinearGradient scrim over expo-image.
- **Notifications:** `expo-notifications` local DAILY trigger (`src/utils/notifications.ts`), web-guarded.

## Key Files
- `app/_layout.tsx` — providers, font loading (icon + custom), root stack.
- `app/(tabs)/{index,calendar,progress,settings}.tsx` — tab screens.
- `app/reader/[date].tsx` — immersive reader (confession → 7 verses → prayer → appreciation).
- `src/content/content.ts` — bilingual verses (7 themes), confessions, prayers, encouragements + `getDayContent`.
- `src/context/ProgressContext.tsx` — streak/points/badges/certificate logic.
- `src/theme/*`, `src/i18n/LanguageContext.tsx`, `src/utils/{date,format,notifications}.ts`.

## Implemented (2026-06 / build date 2026-08-15)
- Today dashboard: greeting, elegant date, hero card CTA, 7-day tracker, streak + points stats, completed-today state.
- Immersive Verse Reader: gradient-scrim over sunrise/cross imagery, theme chips, Playfair verse text, ref,
  progress segments, smooth cross-fade transitions, large "अगला वचन" CTA, haptics.
- Daily prayer + Appreciation screen (+10 Faith Points, streak, encouragement, daily badge).
- Calendar: month grid + prev/next nav, completed/missed/today colors, tap any past/today date to re-read, legend.
- Progress dashboard: total points, current/longest streak, days completed, 5 achievement badges, monthly certificate.
- Settings: language toggle (hi/en, live + persisted), theme (light/dark/system, persisted), daily reminder toggle + time chips.
- Offline persistence of progress, language, theme across reloads.
- Bilingual (Hindi default + English) throughout; Light + Dark themes.

## Testing
- Testing agent iteration_1: ~85% pass; 2 bugs found & FIXED:
  1) duplicate `(tabs)` mount after appreciation (router.replace → router.back) — verified single mount.
  2) reminder switch on web (added `Platform.OS === 'web'` guard).
- Testing agent iteration_2: ALL PASS (backend 8/8 pytest + full frontend). No new bugs.

## Iteration 2 (2026-08-15) — 4 new features
- **Verse Sharing**: share current verse/confession/prayer as a premium amber image-card
  (`src/components/ShareCard.tsx` + react-native-view-shot + expo-sharing). Web shows graceful toast.
- **Audio Narration**: Listen button in reader plays verse/prayer via OpenAI TTS.
  Backend `POST /api/tts` (caches mp3 by sha256) + `GET /api/tts/{key}.mp3` (FileResponse). Uses EMERGENT_LLM_KEY,
  model tts-1, voice onyx. Frontend module-level expo-audio player (`src/utils/narration.ts`).
  Note: OpenAI voices read Hindi with a slight English accent (provider ceiling). Needs internet.
- **Fuller Content**: deepened every theme pool with extra hand-picked verses + curated SPECIAL DAYS
  (01-01 New Year, 12-24 Christmas Eve, 12-25 Christmas, 12-31 Year End) with own verses/prayer + special badge
  (`src/content/special.ts`, `src/content/types.ts`).
- **Prayer Journal**: new 5th tab `जर्नल` — add/edit/delete prayer & thanksgiving notes, persisted locally
  (`src/context/JournalContext.tsx`, `app/(tabs)/journal.tsx`). Toast feedback (`src/components/Toast.tsx`).

## Backlog / Future
- P1: Verse-level bookmarking / favourites.
- P2: ElevenLabs multilingual voice for natural Hindi narration (if OpenAI accent unsatisfactory).
- P2: Journal reminders / mood tags; export journal.
- P2: Expand special days (Easter/Good Friday — movable dates), weekly leaderboard.
- P2: Backend TTS cache size cap; migrate remaining RN-web shadow*/pointerEvents props.

## Next Tasks
- On user request: journal export, natural Hindi voice refinements, additional bookmark organization.

## Iteration 3 (2026-08-15) — first-person verses + favourites + more special days + ElevenLabs
- **First-person अंगीकार**: every daily verse rewritten as a personal declaration ("मैं...") in Hindi + English,
  with the scripture kept as source shown as "आधार: <ref>". Files: `src/content/content.ts`, `src/content/special.ts`, `src/content/types.ts`.
- **Favourite Verses**: `reader-bookmark-button` (verse steps only) toggles saving; `/app/favourites.tsx` screen
  (opened via `open-favourites-button` on Today header) lists/removes saved verses; persisted locally
  (`src/context/FavouritesContext.tsx`).
- **More Special Days**: added movable Good Friday & Easter via Gregorian computus (`getMovableSpecial` in special.ts),
  alongside fixed New Year / Christmas Eve / Christmas / Year End; reader shows special-day badge.
- **ElevenLabs (natural Hindi)**: backend TTS now prefers ElevenLabs `eleven_multilingual_v2` when
  `ELEVENLABS_API_KEY` is set (env placeholder empty for now → OpenAI `tts-1` remains the active fallback).
  User can paste their ElevenLabs key (+ optional `ELEVENLABS_VOICE_ID`) in .env / deployment secrets to activate.
- Testing agent iteration_3: ALL PASS (backend 8/8 + full frontend). No blocking bugs.
