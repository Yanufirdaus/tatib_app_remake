import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:frontend_mobile_flutter/examples/example_page.dart';
import 'package:provider/provider.dart';

import 'core/core.dart';
import 'providers/providers.dart';

// Uncomment baris di bawah untuk mencoba ExamplePage
// import 'examples/example_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // 1. Load environment variables from .env file
  await dotenv.load(fileName: '.env');

  // 2. Setup Dependency Injection (GetIt, StorageService, DatabaseHelper, ApiService)
  await setupServiceLocator();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // ── 1. Register all top-level providers ──────────────────────────────
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppProvider()),
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        // Provider untuk mencoba ExamplePage:
        ChangeNotifierProvider(
            create: (_) => ExampleTodoProvider()..fetchTodos()),
        // TODO: add WalletProvider, TransactionProvider here
      ],

      // ── 2. Consume AppProvider & AuthProvider ────────────────────────
      child: Consumer2<AppProvider, AuthProvider>(
        builder: (_, appProvider, authProvider, __) {
          // ── 3. Init ScreenUtil with design canvas ────────────────────
          return ScreenUtilInit(
            designSize: const Size(
              Sizes.designWidth, // 375.0
              Sizes.designHeight, // 812.0
            ),
            minTextAdapt: true,
            splitScreenMode: true,
            builder: (_, child) {
              return MaterialApp.router(
                title: AppStrings.appName,
                debugShowCheckedModeBanner: false,
                theme: AppTheme.light,
                darkTheme: AppTheme.dark,
                themeMode: appProvider.themeMode,
                routerConfig: AppRouter.router(
                  isLoggedIn: authProvider.isLoggedIn,
                  enableAuthGuard: false, // ubah true saat login UI siap
                ),
              );
            },
          );
        },
      ),
    );
  }
}
