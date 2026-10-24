# Publishing on Google Play

Everything the store needs is in this folder or built by CI:

| What | Where |
|---|---|
| Signed app bundle (AAB) | Built by the Android job once the four secrets below are set. Attached to each GitHub Release as `HN-Anatomy-<version>-play.aab`, and kept as a workflow artifact on pull requests |
| Store listing text | [`listing.md`](listing.md) |
| Data safety, content rating, ads, audience answers | [`data-safety.md`](data-safety.md) |
| Privacy policy | `privacy.html`, published at https://mohammedhanafi2013mh-oss.github.io/head-and-neck-surgical-anatomy/privacy.html |
| Icon 512 × 512 | `icons/icon-512.png` |
| Feature graphic 1024 × 500 | [`feature-graphic.png`](feature-graphic.png) |
| Phone screenshots 1080 × 1920 | [`screenshots/`](screenshots/) |

Google changes Play Console screens, fees and testing rules from time to time. Check each figure below against Play Console when you get there.

## 1. Create the developer account (once)

1. Go to https://play.google.com/console and sign up with the Google account that will own the app. There is a one-time registration fee (US$25 at the time of writing). You'll also need to verify your identity.
2. Choose a **personal** account, unless you have an organisation with a D-U-N-S number.
3. New personal accounts must run a **closed test** before they can publish to production. Google's rule has been at least **12 testers** opted in for **14 days** in a row. Line up colleagues with Android phones and their Google account emails early.

## 2. Make the upload key (once, on your computer)

The app is signed with an *upload key*. Google re-signs it with the app signing key it keeps (Play App Signing). If you lose the upload key, Google can reset it, but keep a backup anyway.

```
keytool -genkeypair -v -keystore upload.jks -alias upload -keyalg RSA -keysize 2048 -validity 10000
```

`keytool` comes with Java; Android Studio includes it too. Choose a strong password, then store `upload.jks` and the password somewhere safe. **Never commit it to the repository.**

## 3. Give the key to GitHub Actions (once)

In the repository, open **Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret | Value |
|---|---|
| `PLAY_KEYSTORE_BASE64` | the key file as base64: `base64 -w0 upload.jks` (Linux), `base64 -i upload.jks` (macOS), or `[Convert]::ToBase64String([IO.File]::ReadAllBytes("upload.jks"))` (PowerShell) |
| `PLAY_KEYSTORE_PASSWORD` | the keystore password |
| `PLAY_KEY_ALIAS` | `upload` (or the alias you chose) |
| `PLAY_KEY_PASSWORD` | the key password (the same as the keystore password unless you set another) |

From the next merge to `main`, the release includes `HN-Anatomy-<version>-play.aab`. Each build has a higher `versionCode` (the workflow run number), which Play requires.

## 4. Create the app in Play Console

1. **Create app:** name *Head & Neck Surgical Anatomy*, default language English, **App**, **Free**. Accept the declarations.
2. **App content:** answer each section from [`data-safety.md`](data-safety.md): privacy policy, ads, app access, target audience (18+), content rating, data safety, and the health apps declaration if you choose the Medical category.
3. **Store listing:** paste from [`listing.md`](listing.md) and upload the icon, feature graphic and screenshots. A support email is required.
4. **Category:** *Medical* fits best (it adds the health apps declaration: answer "education / reference"). *Education* is the simpler alternative.

## 5. Closed test, then production

1. **Testing → Closed testing → Create track.** Upload the `.aab` from the latest GitHub Release, add your testers' emails (or a Google Group), and send them the opt-in link.
2. Testers install from the Play Store through that link. Uninstall any copy installed from the GitHub APK first: the APK is signed with a different key, so the two can't update each other.
3. After the testing period (12 testers, 14 days, per Google's rule), **apply for production access** in Play Console. Answer the questions about your test, then create a **production release** with the same or a newer `.aab`.
4. Google reviews the release (usually a few days for a first app).

## Later updates

Merge to `main` as usual. Each release has a new `.aab`; upload it to the track (production, or testing first). Automating the upload is possible with a Play Console service account and the Play Developer API, once the app is live.

## Things that are fixed once published

- **Package name:** `io.github.mohammedhanafi2013mhoss.hnanatomy` (`capacitor.config.json`). It can never change for this listing.
- **Launcher name on the phone:** "H&N Anatomy" (`appName` in `capacitor.config.json`). It can change in a later release.
