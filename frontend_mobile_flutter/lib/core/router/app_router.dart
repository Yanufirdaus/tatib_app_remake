import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'package:frontend_mobile_flutter/core/router/app_routes.dart';
import 'package:frontend_mobile_flutter/features/home/home_page.dart';
import 'package:frontend_mobile_flutter/examples/example_page.dart';

/// Application-level [GoRouter] configuration.
///
/// Usage in `main.dart` / your root widget:
/// ```dart
/// MaterialApp.router(
///   routerConfig: AppRouter.router(
///     isLoggedIn: authProvider.isLoggedIn,
///     enableAuthGuard: false, // ubah true jika auth page sudah selesai
///   ),
/// )
/// ```
class AppRouter {
  AppRouter._(); // prevent instantiation

  /// Builds a [GoRouter] instance.
  ///
  /// [isLoggedIn] – pass current auth status (e.g. from [AuthProvider]).
  /// [enableAuthGuard] – if true, redirects unauthenticated users to `/login`.
  static GoRouter router({
    required bool isLoggedIn,
    bool enableAuthGuard = false,
  }) {
    return GoRouter(
      initialLocation: AppRoutes.home,
      debugLogDiagnostics: true,

      // ── Redirect guard ──────────────────────────────────────────────
      redirect: (BuildContext context, GoRouterState state) {
        if (!enableAuthGuard) return null;

        final bool loggingIn = state.matchedLocation == AppRoutes.login ||
            state.matchedLocation == AppRoutes.register;

        // Not authenticated → force login (unless already heading there or example page).
        if (!isLoggedIn &&
            !loggingIn &&
            state.matchedLocation != AppRoutes.example) {
          return AppRoutes.login;
        }

        // Authenticated but on login/register → send home.
        if (isLoggedIn && loggingIn) {
          return AppRoutes.home;
        }

        // No redirect needed.
        return null;
      },

      // ── Routes ──────────────────────────────────────────────────────
      routes: <RouteBase>[
        GoRoute(
          path: AppRoutes.home,
          name: 'home',
          builder: (BuildContext context, GoRouterState state) {
            return const HomePage();
          },
        ),
        GoRoute(
          path: AppRoutes.login,
          name: 'login',
          builder: (BuildContext context, GoRouterState state) {
            return const _PlaceholderPage(title: 'Login');
          },
        ),
        GoRoute(
          path: AppRoutes.register,
          name: 'register',
          builder: (BuildContext context, GoRouterState state) {
            return const _PlaceholderPage(title: 'Register');
          },
        ),
        GoRoute(
          path: AppRoutes.example,
          name: 'example',
          builder: (BuildContext context, GoRouterState state) {
            return const ExamplePage();
          },
        ),
      ],

      // ── Error / 404 page ────────────────────────────────────────────
      errorBuilder: (BuildContext context, GoRouterState state) {
        return _ErrorPage(error: state.error);
      },
    );
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Private placeholder / error widgets
// ───────────────────────────────────────────────────────────────────────────

/// Temporary placeholder page used for routes that have not been built yet.
///
/// Replace each usage with the real feature page when ready.
class _PlaceholderPage extends StatelessWidget {
  const _PlaceholderPage({required this.title});

  /// The title shown in the [AppBar] and body.
  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: Center(
        child: Text(
          '$title — coming soon',
          style: Theme.of(context).textTheme.headlineSmall,
        ),
      ),
    );
  }
}

/// A simple 404 / error page shown when no route matches.
class _ErrorPage extends StatelessWidget {
  const _ErrorPage({this.error});

  /// The routing error, if any.
  final Exception? error;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Page Not Found')),
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.error_outline, size: 64, color: Colors.red),
            const SizedBox(height: 16),
            Text(
              '404 — Page not found',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            if (error != null)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32),
                child: Text(
                  error.toString(),
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ),
            const SizedBox(height: 24),
            FilledButton.icon(
              onPressed: () => GoRouter.of(context).go(AppRoutes.home),
              icon: const Icon(Icons.home),
              label: const Text('Go Home'),
            ),
          ],
        ),
      ),
    );
  }
}
