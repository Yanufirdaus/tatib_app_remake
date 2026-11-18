import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Persistent key-value storage wrapper around [SharedPreferences].
///
/// Unlike [ApiService], which can be constructed synchronously,
/// [StorageService] requires an async initialisation step because
/// [SharedPreferences.getInstance] returns a [Future].
///
/// **Initialise once** (typically in `main()` before `runApp`):
///
/// ```dart
/// await StorageService.init();
/// ```
///
/// Then access anywhere via the singleton:
///
/// ```dart
/// final storage = StorageService.instance;
/// final theme = storage.getThemeMode();
/// await storage.setThemeMode(ThemeMode.dark);
/// ```
class StorageService {
  // ── Singleton ──────────────────────────────────────────────────────────

  static StorageService? _instance;

  /// Global singleton instance.
  ///
  /// Throws [StateError] if accessed before [init] is called.
  static StorageService get instance {
    assert(_instance != null,
        'StorageService belum diinisialisasi. Panggil StorageService.init() terlebih dahulu.');
    return _instance!;
  }

  /// Initialises the service by obtaining a [SharedPreferences] instance
  /// and storing it for synchronous access afterwards.
  ///
  /// Call this **once** at app startup (e.g. in `main()`).
  /// Subsequent calls return the existing instance.
  static Future<StorageService> init() async {
    if (_instance != null) return _instance!;
    final prefs = await SharedPreferences.getInstance();
    _instance = StorageService._internal(prefs);
    return _instance!;
  }

  // ── Internal state ─────────────────────────────────────────────────────

  final SharedPreferences _prefs;

  StorageService._internal(this._prefs);

  // ── Keys ───────────────────────────────────────────────────────────────

  /// Key for the user's preferred [ThemeMode], stored as [int].
  static const _keyThemeMode = 'theme_mode';

  /// Key for whether the user has completed the onboarding flow.
  static const _keyOnboardingDone = 'onboarding_done';

  /// Key for the authentication token.
  static const _keyToken = 'auth_token';

  // ═════════════════════════════════════════════════════════════════════════
  // TYPED ACCESSORS — THEME
  // ═════════════════════════════════════════════════════════════════════════

  /// Returns the persisted [ThemeMode].
  ///
  /// Defaults to [ThemeMode.system] when no value has been stored yet.
  ThemeMode getThemeMode() {
    final index = _prefs.getInt(_keyThemeMode);
    if (index == null || index < 0 || index >= ThemeMode.values.length) {
      return ThemeMode.system;
    }
    return ThemeMode.values[index];
  }

  /// Persists the user's preferred [ThemeMode] as its enum index.
  Future<bool> setThemeMode(ThemeMode mode) {
    return _prefs.setInt(_keyThemeMode, mode.index);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // TYPED ACCESSORS — ONBOARDING
  // ═════════════════════════════════════════════════════════════════════════

  /// Returns `true` if the user has completed onboarding.
  ///
  /// Defaults to `false`.
  bool getOnboardingDone() {
    return _prefs.getBool(_keyOnboardingDone) ?? false;
  }

  /// Persists the onboarding completion status.
  Future<bool> setOnboardingDone(bool done) {
    return _prefs.setBool(_keyOnboardingDone, done);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // TYPED ACCESSORS — AUTH TOKEN
  // ═════════════════════════════════════════════════════════════════════════

  /// Returns the stored auth token, or `null` if none has been saved.
  String? getToken() {
    return _prefs.getString(_keyToken);
  }

  /// Persists the auth [token].
  ///
  /// Pass `null` to remove the token (equivalent to [clearToken]).
  Future<bool> setToken(String? token) {
    if (token == null) return clearToken();
    return _prefs.setString(_keyToken, token);
  }

  /// Removes the auth token from storage.
  Future<bool> clearToken() {
    return _prefs.remove(_keyToken);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // GENERIC ACCESSORS
  // ═════════════════════════════════════════════════════════════════════════

  /// Returns the string value for [key], or `null` if absent.
  String? getString(String key) => _prefs.getString(key);

  /// Stores a [value] string under [key].
  Future<bool> setString(String key, String value) =>
      _prefs.setString(key, value);

  /// Returns the boolean value for [key], or `null` if absent.
  bool? getBool(String key) => _prefs.getBool(key);

  /// Stores a [value] boolean under [key].
  Future<bool> setBool(String key, bool value) => _prefs.setBool(key, value);

  /// Returns the integer value for [key], or `null` if absent.
  int? getInt(String key) => _prefs.getInt(key);

  /// Stores a [value] integer under [key].
  Future<bool> setInt(String key, int value) => _prefs.setInt(key, value);

  /// Removes the entry for [key].
  Future<bool> remove(String key) => _prefs.remove(key);

  /// Removes **all** entries from shared preferences.
  ///
  /// Use with caution — this wipes every stored key, not just
  /// the ones managed by this service.
  Future<bool> clear() => _prefs.clear();
}
