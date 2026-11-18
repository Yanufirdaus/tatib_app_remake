import 'package:flutter_screenutil/flutter_screenutil.dart';

/// Central responsive sizing helper wrapping flutter_screenutil.
///
/// Usage (after [ScreenUtilInit] is mounted):
///   Container(
///     width:   Sizes.w(200),   // scales with screen width
///     height:  Sizes.h(60),    // scales with screen height
///     padding: EdgeInsets.all(Sizes.r(12)), // uniform radius / padding
///     child: Text('Hi', style: TextStyle(fontSize: Sizes.sp(16))),
///   )
///
/// Or with the extension shorthand:
///   200.w   60.h   12.r   16.sp
class Sizes {
  Sizes._();

  // ── Base design canvas ──────────────────────────────────────────────────
  static const double designWidth = 375.0;  // iPhone 12 Pro width (dp)
  static const double designHeight = 812.0; // iPhone 12 Pro height (dp)

  // ── Dimensions ──────────────────────────────────────────────────────────
  static double w(double value) => value.w;
  static double h(double value) => value.h;
  static double r(double value) => value.r;
  static double sp(double value) => value.sp;

  // ── Semantic spacing tokens ──────────────────────────────────────────────
  static double get spaceXXS => 4.w;
  static double get spaceXS  => 8.w;
  static double get spaceS   => 12.w;
  static double get spaceM   => 16.w;
  static double get spaceL   => 24.w;
  static double get spaceXL  => 32.w;
  static double get spaceXXL => 48.w;

  // ── Semantic radius tokens ───────────────────────────────────────────────
  static double get radiusS  => 8.r;
  static double get radiusM  => 12.r;
  static double get radiusL  => 16.r;
  static double get radiusXL => 24.r;
  static double get radiusFull => 999.r;

  // ── Semantic font size tokens ────────────────────────────────────────────
  static double get textXS  => 11.sp;
  static double get textS   => 12.sp;
  static double get textM   => 14.sp;
  static double get textL   => 16.sp;
  static double get textXL  => 20.sp;
  static double get textXXL => 24.sp;
  static double get textH2  => 28.sp;
  static double get textH1  => 32.sp;

  // ── Component sizes ──────────────────────────────────────────────────────
  static double get buttonHeight   => 52.h;
  static double get inputHeight    => 56.h;
  static double get appBarHeight   => 60.h;
  static double get bottomNavHeight => 70.h;
  static double get cardRadius     => radiusL;
  static double get screenPadding  => spaceM;
}
