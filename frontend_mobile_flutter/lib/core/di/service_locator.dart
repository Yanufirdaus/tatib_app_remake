import 'package:get_it/get_it.dart';

import 'package:frontend_mobile_flutter/core/services/api_service.dart';
import 'package:frontend_mobile_flutter/core/services/storage_service.dart';
import 'package:frontend_mobile_flutter/core/database/database_helper.dart';

/// Global [GetIt] service-locator instance.
///
/// This is the single source of truth for dependency injection throughout the
/// app. Services are registered once during startup via [setupServiceLocator]
/// and can then be resolved anywhere with:
///
/// ```dart
/// final api = getIt<ApiService>();
/// // or use the convenience helper:
/// final api = locate<ApiService>();
/// ```
final GetIt getIt = GetIt.instance;

/// Initialises and registers all application-level services.
///
/// Call this **once** in `main()` before `runApp()`:
///
/// ```dart
/// Future<void> main() async {
///   WidgetsFlutterBinding.ensureInitialized();
///   await setupServiceLocator();
///   runApp(const MyApp());
/// }
/// ```
Future<void> setupServiceLocator() async {
  // ── Core services ───────────────────────────────────────────────────────

  /// [ApiService] — HTTP client backed by Dio.
  getIt.registerSingleton<ApiService>(ApiService.instance);

  // ── Storage ─────────────────────────────────────────────────────────────

  /// [StorageService] — persistent key-value storage via SharedPreferences.
  final storageService = await StorageService.init();
  getIt.registerSingleton<StorageService>(storageService);

  // ── Database ────────────────────────────────────────────────────────────

  /// [DatabaseHelper] — SQLite database helper via sqflite.
  getIt.registerSingleton<DatabaseHelper>(DatabaseHelper.instance);
}

/// Convenience helper to resolve a dependency from the service locator.
///
/// Equivalent to `getIt<T>()` but slightly shorter and can be imported on its
/// own without exposing the full [GetIt] API:
///
/// ```dart
/// final api = locate<ApiService>();
/// ```
///
/// Throws a [StateError] if [T] has not been registered.
T locate<T extends Object>() => getIt<T>();
