import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../utils/sizes.dart';

class AppTheme {
  AppTheme._();

  // ── Light Theme ──────────────────────────────────────────────────────────
  static ThemeData get light => ThemeData(
        useMaterial3: true,
        brightness: Brightness.light,
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.primary,
          brightness: Brightness.light,
        ).copyWith(
          primary: AppColors.primary,
          secondary: AppColors.secondary,
          surface: AppColors.surface,
          error: AppColors.error,
        ),
        scaffoldBackgroundColor: AppColors.background,
        appBarTheme: AppBarTheme(
          backgroundColor: AppColors.background,
          elevation: 0,
          centerTitle: false,
          iconTheme: const IconThemeData(color: AppColors.textPrimary),
          titleTextStyle: TextStyle(
            color: AppColors.textPrimary,
            fontSize: Sizes.textXL,
            fontWeight: FontWeight.w700,
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.primary,
            foregroundColor: AppColors.textOnPrimary,
            minimumSize: Size(double.infinity, Sizes.buttonHeight),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(Sizes.radiusM),
            ),
            elevation: 0,
            textStyle: TextStyle(
              fontSize: Sizes.textL,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: AppColors.surface,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(Sizes.radiusM),
            borderSide: BorderSide.none,
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(Sizes.radiusM),
            borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(Sizes.radiusM),
            borderSide: const BorderSide(color: AppColors.primary, width: 2),
          ),
          contentPadding: EdgeInsets.symmetric(
            horizontal: Sizes.spaceM,
            vertical: Sizes.spaceS,
          ),
        ),
        cardTheme: CardTheme(
          color: AppColors.surface,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(Sizes.cardRadius),
            side: const BorderSide(color: Color(0xFFE5E7EB)),
          ),
          margin: EdgeInsets.zero,
        ),
        textTheme: _buildTextTheme(AppColors.textPrimary),
      );

  // ── Dark Theme ───────────────────────────────────────────────────────────
  static ThemeData get dark => ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.primary,
          brightness: Brightness.dark,
        ).copyWith(
          primary: AppColors.primaryLight,
          secondary: AppColors.secondary,
          surface: AppColors.surfaceDarkCard,
          error: AppColors.error,
        ),
        scaffoldBackgroundColor: AppColors.backgroundDark,
        appBarTheme: AppBarTheme(
          backgroundColor: AppColors.backgroundDark,
          elevation: 0,
          centerTitle: false,
          iconTheme: const IconThemeData(color: AppColors.textPrimaryDark),
          titleTextStyle: TextStyle(
            color: AppColors.textPrimaryDark,
            fontSize: Sizes.textXL,
            fontWeight: FontWeight.w700,
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.primary,
            foregroundColor: AppColors.textOnPrimary,
            minimumSize: Size(double.infinity, Sizes.buttonHeight),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(Sizes.radiusM),
            ),
            elevation: 0,
            textStyle: TextStyle(
              fontSize: Sizes.textL,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        cardTheme: CardTheme(
          color: AppColors.surfaceDarkCard,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(Sizes.cardRadius),
          ),
          margin: EdgeInsets.zero,
        ),
        textTheme: _buildTextTheme(AppColors.textPrimaryDark),
      );

  // ── Shared Text Theme ────────────────────────────────────────────────────
  static TextTheme _buildTextTheme(Color textColor) => TextTheme(
        displayLarge: TextStyle(
            fontSize: Sizes.textH1,
            fontWeight: FontWeight.w800,
            color: textColor),
        displayMedium: TextStyle(
            fontSize: Sizes.textH2,
            fontWeight: FontWeight.w700,
            color: textColor),
        headlineMedium: TextStyle(
            fontSize: Sizes.textXXL,
            fontWeight: FontWeight.w700,
            color: textColor),
        titleLarge: TextStyle(
            fontSize: Sizes.textXL,
            fontWeight: FontWeight.w600,
            color: textColor),
        titleMedium: TextStyle(
            fontSize: Sizes.textL,
            fontWeight: FontWeight.w600,
            color: textColor),
        bodyLarge: TextStyle(
            fontSize: Sizes.textL,
            fontWeight: FontWeight.w400,
            color: textColor),
        bodyMedium: TextStyle(
            fontSize: Sizes.textM,
            fontWeight: FontWeight.w400,
            color: textColor),
        bodySmall: TextStyle(
            fontSize: Sizes.textS,
            fontWeight: FontWeight.w400,
            color: textColor.withOpacity(0.7)),
        labelLarge: TextStyle(
            fontSize: Sizes.textM,
            fontWeight: FontWeight.w600,
            color: textColor),
      );
}
