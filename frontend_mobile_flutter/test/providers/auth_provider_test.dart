import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:frontend_mobile_flutter/core/core.dart';
import 'package:frontend_mobile_flutter/providers/auth_provider.dart';

import 'auth_provider_test.mocks.dart';

// Generates MockApiService using mockito
@GenerateMocks([ApiService])
void main() {
  group('AuthProvider Tests', () {
    late AuthProvider authProvider;
    late MockApiService mockApiService;

    setUp(() {
      authProvider = AuthProvider();
      mockApiService = MockApiService();
    });

    test('Initial state should be unauthenticated and not loading', () {
      expect(authProvider.isLoggedIn, false);
      expect(authProvider.user, isNull);
      expect(authProvider.isLoading, false);
      expect(authProvider.errorMessage, isNull);
    });

    test('login() updates user and sets isLoggedIn to true', () async {
      int notifyCount = 0;
      authProvider.addListener(() {
        notifyCount++;
      });

      await authProvider.login(email: 'test@mail.com', password: 'password123');

      expect(authProvider.isLoggedIn, true);
      expect(authProvider.user?.email, 'test@mail.com');
      expect(authProvider.isLoading, false);
      expect(notifyCount, greaterThan(0));
    });

    test('logout() clears user and sets isLoggedIn to false', () async {
      await authProvider.login(email: 'test@mail.com', password: 'password123');
      expect(authProvider.isLoggedIn, true);

      await authProvider.logout();

      expect(authProvider.isLoggedIn, false);
      expect(authProvider.user, isNull);
    });

    test('Mockito mock demonstration', () {
      // Demonstrates Mockito mock usage
      when(mockApiService.clearToken()).thenReturn(null);
      mockApiService.clearToken();
      verify(mockApiService.clearToken()).called(1);
    });
  });
}

