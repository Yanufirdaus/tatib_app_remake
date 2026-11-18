/// Centralised route-path constants for the application.
///
/// Use these constants everywhere instead of hard-coding path strings so that
/// renaming a route is a single-place change.
///
/// ```dart
/// context.go(AppRoutes.login);
/// ```
class AppRoutes {
  AppRoutes._(); // prevent instantiation

  /// Root / home page.
  static const String home = '/';

  /// Login page.
  static const String login = '/login';

  /// Registration page.
  static const String register = '/register';

  /// Example demo page showcasing design tokens, components & state.
  static const String example = '/example';
}
