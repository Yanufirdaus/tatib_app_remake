import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'storage_service.dart';

/// Central HTTP client for all API calls.
///
/// Uses [Dio] under the hood with base configuration loaded from `.env`.
/// All providers should use this service instead of creating their own
/// Dio instances.
///
/// Usage:
/// ```dart
/// final api = ApiService.instance;
/// final response = await api.get('/users');
/// ```
class ApiService {
  // ── Singleton ──────────────────────────────────────────────────────────
  static final ApiService _instance = ApiService._internal();

  /// Global singleton instance. Access via `ApiService.instance`.
  static ApiService get instance => _instance;

  late final Dio _dio;

  /// Exposes the raw [Dio] instance for advanced use-cases
  /// (e.g. download, multipart upload). Prefer using the helper methods.
  Dio get dio => _dio;

  // ── Private constructor ────────────────────────────────────────────────
  ApiService._internal() {
    final baseUrl = dotenv.env['API_BASE_URL'];
    assert(baseUrl != null && baseUrl.isNotEmpty,
        'API_BASE_URL belum diatur di file .env');

    _dio = Dio(
      BaseOptions(
        baseUrl: baseUrl!,
        connectTimeout: const Duration(seconds: 15),
        receiveTimeout: const Duration(seconds: 15),
        sendTimeout: const Duration(seconds: 15),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    // ── Interceptors ───────────────────────────────────────────────────
    _dio.interceptors.addAll([
      _authInterceptor(),
      _loggingInterceptor(),
    ]);
  }

  // ── Auth Interceptor ───────────────────────────────────────────────────
  /// Automatically attaches the auth token to every request if available.
  /// Override [_getToken] to plug in your token storage.
  InterceptorsWrapper _authInterceptor() {
    return InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await _getToken();
        if (token != null && token.isNotEmpty) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        handler.next(options);
      },
      onError: (error, handler) {
        // TODO: Handle 401 → refresh token or force logout
        handler.next(error);
      },
    );
  }

  // ── Logging Interceptor ────────────────────────────────────────────────
  /// Logs request/response in debug mode for easier development.
  LogInterceptor _loggingInterceptor() {
    return LogInterceptor(
      request: true,
      requestHeader: false,
      requestBody: true,
      responseHeader: false,
      responseBody: true,
      error: true,
    );
  }

  // ── Persistent Token storage ──────────────────────────────────────────
  String? _token;

  Future<String?> _getToken() async {
    if (_token != null) return _token;
    try {
      _token = StorageService.instance.getToken();
    } catch (_) {}
    return _token;
  }

  /// Sets the auth token in memory and local persistent storage.
  void setToken(String? token) {
    _token = token;
    try {
      StorageService.instance.setToken(token);
    } catch (_) {}
  }

  /// Clears the auth token from memory and persistent storage.
  void clearToken() {
    _token = null;
    try {
      StorageService.instance.clearToken();
    } catch (_) {}
  }

  // ═══════════════════════════════════════════════════════════════════════
  // HTTP METHODS
  // ═══════════════════════════════════════════════════════════════════════

  /// Sends a **GET** request.
  ///
  /// ```dart
  /// final res = await api.get('/users', queryParameters: {'page': 1});
  /// ```
  Future<Response<T>> get<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) {
    return _dio.get<T>(
      path,
      queryParameters: queryParameters,
      options: options,
    );
  }

  /// Sends a **POST** request.
  ///
  /// ```dart
  /// final res = await api.post('/auth/login', data: {'email': '...', 'password': '...'});
  /// ```
  Future<Response<T>> post<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) {
    return _dio.post<T>(
      path,
      data: data,
      queryParameters: queryParameters,
      options: options,
    );
  }

  /// Sends a **PUT** request (full resource replacement).
  ///
  /// ```dart
  /// final res = await api.put('/users/1', data: {'name': 'New Name'});
  /// ```
  Future<Response<T>> put<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) {
    return _dio.put<T>(
      path,
      data: data,
      queryParameters: queryParameters,
      options: options,
    );
  }

  /// Sends a **PATCH** request (partial resource update).
  ///
  /// ```dart
  /// final res = await api.patch('/users/1', data: {'name': 'Updated'});
  /// ```
  Future<Response<T>> patch<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) {
    return _dio.patch<T>(
      path,
      data: data,
      queryParameters: queryParameters,
      options: options,
    );
  }

  /// Sends a **DELETE** request.
  ///
  /// ```dart
  /// final res = await api.delete('/users/1');
  /// ```
  Future<Response<T>> delete<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) {
    return _dio.delete<T>(
      path,
      data: data,
      queryParameters: queryParameters,
      options: options,
    );
  }

  /// Sends a **multipart/form-data** request (for file uploads).
  ///
  /// ```dart
  /// final formData = FormData.fromMap({
  ///   'file': await MultipartFile.fromFile('/path/to/file.jpg'),
  /// });
  /// final res = await api.upload('/upload', formData: formData);
  /// ```
  Future<Response<T>> upload<T>(
    String path, {
    required FormData formData,
    void Function(int, int)? onSendProgress,
    Options? options,
  }) {
    return _dio.post<T>(
      path,
      data: formData,
      onSendProgress: onSendProgress,
      options: options,
    );
  }
}

