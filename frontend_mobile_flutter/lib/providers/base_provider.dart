import 'package:flutter/foundation.dart';

/// Base provider that all app providers should extend.
/// Provides common state management helpers (loading, error).
abstract class BaseProvider extends ChangeNotifier {
  bool _isLoading = false;
  String? _errorMessage;

  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get hasError => _errorMessage != null;

  @protected
  void setLoading(bool value) {
    _isLoading = value;
    notifyListeners();
  }

  @protected
  void setError(String? message) {
    _errorMessage = message;
    notifyListeners();
  }

  @protected
  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  /// Runs [action] while managing loading state and error catching.
  @protected
  Future<void> runAction(Future<void> Function() action) async {
    try {
      setLoading(true);
      clearError();
      await action();
    } catch (e) {
      setError(e.toString());
    } finally {
      setLoading(false);
    }
  }
}
