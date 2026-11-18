import 'package:flutter/material.dart';
import '../core/core.dart';
import 'base_provider.dart';

/// Manages app-wide UI state: theme mode, locale, onboarding status.
class AppProvider extends BaseProvider {
  ThemeMode _themeMode = ThemeMode.system;
  bool _isOnboardingDone = false;

  AppProvider() {
    _loadFromStorage();
  }

  void _loadFromStorage() {
    try {
      _themeMode = StorageService.instance.getThemeMode();
      _isOnboardingDone = StorageService.instance.getOnboardingDone();
    } catch (_) {}
  }

  ThemeMode get themeMode => _themeMode;
  bool get isOnboardingDone => _isOnboardingDone;
  bool get isDarkMode => _themeMode == ThemeMode.dark;

  void setThemeMode(ThemeMode mode) {
    _themeMode = mode;
    notifyListeners();
    StorageService.instance.setThemeMode(mode);
  }

  void toggleTheme() {
    final nextMode = isDarkMode ? ThemeMode.light : ThemeMode.dark;
    setThemeMode(nextMode);
  }

  void completeOnboarding() {
    _isOnboardingDone = true;
    notifyListeners();
    StorageService.instance.setOnboardingDone(true);
  }
}
