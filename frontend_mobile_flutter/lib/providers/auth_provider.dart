import 'base_provider.dart';

/// Represents the authenticated user.
class UserModel {
  final String id;
  final String name;
  final String email;

  const UserModel({
    required this.id,
    required this.name,
    required this.email,
  });
}

/// Manages authentication state (login / logout / register).
class AuthProvider extends BaseProvider {
  UserModel? _user;

  UserModel? get user => _user;
  bool get isLoggedIn => _user != null;
  String get displayName => _user?.name ?? '';

  Future<void> login({required String email, required String password}) async {
    await runAction(() async {
      // TODO: replace with real API call
      await Future.delayed(const Duration(seconds: 1)); // simulate network
      _user = UserModel(id: '1', name: 'Demo User', email: email);
    });
  }

  Future<void> logout() async {
    _user = null;
    notifyListeners();
  }
}
