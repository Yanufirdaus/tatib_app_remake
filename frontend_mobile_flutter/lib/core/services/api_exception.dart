import 'package:dio/dio.dart';

/// Custom exception class that wraps Dio errors into user-friendly messages.
///
/// Usage in providers:
/// ```dart
/// await runAction(() async {
///   try {
///     final res = await api.get('/data');
///     // handle success...
///   } on DioException catch (e) {
///     throw ApiException.fromDioError(e);
///   }
/// });
/// ```
class ApiException implements Exception {
  final String message;
  final int? statusCode;
  final dynamic data;

  const ApiException({
    required this.message,
    this.statusCode,
    this.data,
  });

  /// Creates an [ApiException] from a [DioException].
  /// Maps common HTTP error types to Indonesian-friendly messages.
  factory ApiException.fromDioError(DioException error) {
    String message;
    int? statusCode;
    dynamic data;

    switch (error.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        message = 'Koneksi timeout. Periksa jaringan Anda.';
        break;

      case DioExceptionType.connectionError:
        message = 'Tidak dapat terhubung ke server.';
        break;

      case DioExceptionType.cancel:
        message = 'Permintaan dibatalkan.';
        break;

      case DioExceptionType.badResponse:
        statusCode = error.response?.statusCode;
        data = error.response?.data;
        message = _mapStatusCode(statusCode, data);
        break;

      default:
        message = 'Terjadi kesalahan. Silakan coba lagi.';
    }

    return ApiException(
      message: message,
      statusCode: statusCode,
      data: data,
    );
  }

  /// Maps HTTP status codes to readable error messages.
  static String _mapStatusCode(int? statusCode, dynamic data) {
    // Try to extract server-provided message first
    if (data is Map<String, dynamic>) {
      final serverMsg = data['message'] ?? data['error'];
      if (serverMsg != null) return serverMsg.toString();
    }

    switch (statusCode) {
      case 400:
        return 'Permintaan tidak valid.';
      case 401:
        return 'Sesi telah berakhir. Silakan login kembali.';
      case 403:
        return 'Anda tidak memiliki akses.';
      case 404:
        return 'Data tidak ditemukan.';
      case 409:
        return 'Data sudah ada atau terjadi konflik.';
      case 422:
        return 'Data yang dikirim tidak valid.';
      case 429:
        return 'Terlalu banyak permintaan. Coba lagi nanti.';
      case 500:
        return 'Terjadi kesalahan pada server.';
      case 502:
        return 'Server sedang tidak tersedia.';
      case 503:
        return 'Server sedang dalam pemeliharaan.';
      default:
        return 'Terjadi kesalahan (kode: $statusCode).';
    }
  }

  @override
  String toString() => message;
}

