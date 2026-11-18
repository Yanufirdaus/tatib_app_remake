# 📱 Flutter Project Architecture
## APPS TEMPLATE WITH PROVIDER STATE MANAGEMENT

> **Disclaimer**: This is AI Generated Template for developer to learn how to build apps with clean architecture
> **Stack**: Flutter 3.16.5 · Provider 6.1.5 · flutter_screenutil 5.9.3 · google_fonts 6.2.0 · Dio 5.x · flutter_dotenv 5.1.0 · GoRouter 12.x · SharedPreferences 2.x · Sqflite 2.x · GetIt 7.x · Mockito 5.x
> **Pattern**: Feature-first + Provider state management + ScreenUtil responsive sizing + Service Locator (GetIt)

---

## 📋 Daftar Isi

1. [Folder Structure](#-folder-structure)
2. [Dependencies](#-dependencies)
3. [Layer 1 — Core](#-layer-1--core)
4. [Layer 2 — Providers](#-layer-2--providers)
5. [Layer 3 — Shared Widgets](#-layer-3--shared-widgets)
6. [Layer 4 — Features](#-layer-4--features)
7. [main.dart Setup](#-maindart-setup)
8. [Cara Pakai ScreenUtil](#-cara-pakai-screenutil--sizes)
9. [Cara Pakai Provider](#-cara-pakai-provider)
10. [Cara Pakai ApiService](#-cara-pakai-apiservice)
11. [Cara Pakai GoRouter](#-cara-pakai-gorouter)
12. [Cara Pakai StorageService (SharedPreferences)](#-cara-pakai-storageservice-sharedpreferences)
13. [Cara Pakai DatabaseHelper (SQLite)](#-cara-pakai-databasehelper-sqlite)
14. [Cara Pakai Dependency Injection (GetIt)](#-cara-pakai-dependency-injection-getit)
15. [Cara Menulis Unit Test & Mocking](#-cara-menulis-unit-test--mocking)
16. [Menambah Fitur Baru](#-menambah-fitur-baru)
17. [Konvensi & Rules](#-konvensi--rules)
18. [Roadmap Pengembangan](#-roadmap-pengembangan)

---

## 🗂️ Folder Structure

```
my_wallet_management/
│
├── .env                         ← Environment variables (API_BASE_URL)
├── ARCHITECTURE.md              ← Dokumentasi ini
├── pubspec.yaml
├── test/                        ← Unit & Widget Tests
│   └── providers/
│       ├── auth_provider_test.dart       ← Contoh unit test + mock
│       └── auth_provider_test.mocks.dart ← Generated mock dari build_runner
│
└── lib/
    ├── main.dart                ← Entry point (init env, DI, router, theme)
    │
    ├── core/                    ← Fondasi app (tanpa business logic)
    │   ├── core.dart            ← Barrel export semua modul core
    │   ├── constants/
    │   │   ├── app_colors.dart  ← Color palette tokens
    │   │   └── app_strings.dart ← String literals terpusat
    │   ├── database/
    │   │   └── database_helper.dart ← SQLite database helper (sqflite)
    │   ├── di/
    │   │   └── service_locator.dart ← Dependency injection container (get_it)
    │   ├── router/
    │   │   ├── app_routes.dart  ← Konstanta nama rute (/login, /home, dll)
    │   │   └── app_router.dart  ← Konfigurasi GoRouter & auth redirect guard
    │   ├── services/
    │   │   ├── api_service.dart   ← Singleton HTTP client (Dio wrapper)
    │   │   ├── api_exception.dart ← Error mapping DioException → pesan user
    │   │   └── storage_service.dart ← Key-value persistent storage (SharedPreferences)
    │   ├── theme/
    │   │   └── app_theme.dart   ← ThemeData light & dark
    │   └── utils/
    │       └── sizes.dart       ← ScreenUtil wrapper + design tokens
    │
    ├── providers/               ← State management layer
    │   ├── providers.dart       ← Barrel export
    │   ├── base_provider.dart   ← Abstract base (loading, error, runAction)
    │   ├── app_provider.dart    ← Theme mode, onboarding (persistent via storage)
    │   └── auth_provider.dart   ← Auth state (login/logout/user)
    │
    ├── shared/                  ← Komponen UI reusable
    │   └── widgets/
    │       ├── widgets.dart     ← Barrel export
    │       ├── app_button.dart  ← Primary & outline button
    │       └── app_text_field.dart ← Labeled text input
    │
    └── features/                ← Modul fitur (screen + logika)
        └── home/
            └── home_page.dart   ← Contoh home screen
```

### Aturan Dependency Antar Layer

```
features/  →  providers/  →  core/
features/  →  shared/     →  core/
providers/ →  core/
```

> ⚠️ Feature tidak boleh import dari feature lain secara langsung.
> core/ tidak boleh import dari providers/ atau features/.

---

## 📦 Dependencies

| Package | Versi | Kegunaan |
|---------|-------|----------|
| `provider` | ^6.1.5 | State management via `ChangeNotifier` |
| `flutter_screenutil` | ^5.9.3 | Responsive sizing `.w` `.h` `.r` `.sp` |
| `google_fonts` | ^6.1.0 | Premium typography |
| `dio` | ^5.11.1 | HTTP client untuk API call |
| `flutter_dotenv` | ^5.1.0 | Load environment variables dari `.env` |
| `go_router` | ^12.1.3 | Declarative routing & navigation |
| `shared_preferences` | ^2.2.2 | Persistent key-value storage (token, theme, settings) |
| `sqflite` | ^2.3.0 | Local embedded SQLite database |
| `path` | ^1.8.3 | Manipulasi path file & database |
| `get_it` | ^7.6.4 | Service locator / Dependency injection |
| `mockito` (dev) | ^5.4.4 | Mocking framework untuk unit testing |
| `build_runner` (dev) | ^2.4.7 | Code generator untuk mockito |

```yaml
# pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2
  provider: ^6.1.5+1
  flutter_native_splash: 2.3.11
  flutter_screenutil: ^5.9.3
  dio: ^5.11.1
  flutter_dotenv: ^5.1.0
  go_router: ^12.1.3
  shared_preferences: ^2.2.2
  sqflite: ^2.3.0
  path: ^1.8.3
  get_it: ^7.6.4

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0
  mockito: ^5.4.4
  build_runner: ^2.4.7
```

---

## 🎨 Layer 1 — Core

Layer ini adalah **fondasi** — tidak boleh bergantung pada layer lain.
Semua file di-export melalui satu barrel: `import 'package:my_wallet_management/core/core.dart';`

---

### `core/constants/app_colors.dart`

Single source of truth untuk semua warna aplikasi.

```dart
// ✅ BENAR — gunakan AppColors
Container(color: AppColors.primary)
Text('Hello', style: TextStyle(color: AppColors.textSecondary))

// ❌ SALAH — jangan hardcode warna
Container(color: Color(0xFF4361EE))
```

**Token yang tersedia:**

| Token | Hex | Kegunaan |
|-------|-----|----------|
| `AppColors.primary` | `#4361EE` | Warna utama / tombol |
| `AppColors.primaryLight` | `#738EF5` | Varian terang |
| `AppColors.primaryDark` | `#2B3EBF` | Varian gelap |
| `AppColors.secondary` | `#7209B7` | Warna sekunder |
| `AppColors.accent` | `#F72585` | Aksen / highlight |
| `AppColors.background` | `#F8F9FE` | Latar belakang (light) |
| `AppColors.surface` | `#FFFFFF` | Permukaan card (light) |
| `AppColors.textPrimary` | `#1A1A2E` | Teks utama |
| `AppColors.textSecondary` | `#6B7280` | Teks sekunder |
| `AppColors.success` | `#10B981` | Status sukses |
| `AppColors.error` | `#EF4444` | Status error |
| `AppColors.warning` | `#F59E0B` | Status peringatan |
| `AppColors.backgroundDark` | `#0D0D1A` | Latar belakang (dark) |

---

### `core/utils/sizes.dart`

Wrapper ScreenUtil dengan **design tokens semantik**. Import file ini, bukan `flutter_screenutil` langsung.

**Design Canvas** (referensi dari desain Figma/Adobe XD):
```
Sizes.designWidth  = 375.0 dp  (iPhone 12 Pro)
Sizes.designHeight = 812.0 dp
```

**Fungsi Responsive:**

```dart
Sizes.w(200)  // skala berdasarkan lebar layar
Sizes.h(60)   // skala berdasarkan tinggi layar
Sizes.r(12)   // skala uniform (untuk radius & padding)
Sizes.sp(16)  // skala font size

// Shorthand extension (dari ScreenUtil langsung)
200.w    60.h    12.r    16.sp
```

**Design Tokens Semantik:**

| Token | Nilai | Kegunaan |
|-------|-------|----------|
| `Sizes.spaceXXS` | `4.w` | Gap sangat kecil |
| `Sizes.spaceXS` | `8.w` | Gap kecil |
| `Sizes.spaceS` | `12.w` | Gap kecil-sedang |
| `Sizes.spaceM` | `16.w` | Gap sedang (default) |
| `Sizes.spaceL` | `24.w` | Gap besar |
| `Sizes.spaceXL` | `32.w` | Gap sangat besar |
| `Sizes.spaceXXL` | `48.w` | Gap ekstra besar |
| `Sizes.radiusS` | `8.r` | Radius kecil |
| `Sizes.radiusM` | `12.r` | Radius sedang |
| `Sizes.radiusL` | `16.r` | Radius besar |
| `Sizes.radiusXL` | `24.r` | Radius sangat besar |
| `Sizes.radiusFull` | `999.r` | Pill / bulat penuh |
| `Sizes.textXS` | `11.sp` | Caption kecil |
| `Sizes.textS` | `12.sp` | Label kecil |
| `Sizes.textM` | `14.sp` | Body text |
| `Sizes.textL` | `16.sp` | Body besar / tombol |
| `Sizes.textXL` | `20.sp` | Subtitle |
| `Sizes.textXXL` | `24.sp` | Heading kecil |
| `Sizes.textH2` | `28.sp` | Heading |
| `Sizes.textH1` | `32.sp` | Display |
| `Sizes.buttonHeight` | `52.h` | Tinggi tombol standar |
| `Sizes.inputHeight` | `56.h` | Tinggi input field |
| `Sizes.screenPadding` | `= spaceM` | Padding horizontal halaman |

---

### `core/theme/app_theme.dart`

Menyediakan `ThemeData` light dan dark. Semua ukuran menggunakan `Sizes.*` sehingga otomatis responsif.

```dart
// Penggunaan di main.dart
MaterialApp(
  theme:     AppTheme.light,
  darkTheme: AppTheme.dark,
  themeMode: appProvider.themeMode,  // dikontrol oleh AppProvider
)
```

---

### `core/services/api_service.dart`

Singleton HTTP client berbasis **Dio** yang membaca `API_BASE_URL` dari file `.env`.
Semua API call di provider harus melalui service ini.

**Konfigurasi `.env`:**
```env
API_BASE_URL=type_your_base_url
```

> ⚠️ File `.env` harus didaftarkan di `pubspec.yaml` → `flutter.assets` agar bisa dibaca oleh `flutter_dotenv`.

**Inisialisasi:** `main.dart` memanggil `await dotenv.load(fileName: '.env')` **sebelum** `runApp()`.

**Akses Instance:**
```dart
import 'package:frontend_mobile_flutter/core/core.dart';

final api = ApiService.instance;
```

**HTTP Methods yang tersedia:**

| Method | Signature | Kegunaan |
|--------|-----------|----------|
| `get` | `get<T>(path, {queryParameters, options})` | Ambil data |
| `post` | `post<T>(path, {data, queryParameters, options})` | Kirim data baru |
| `put` | `put<T>(path, {data, queryParameters, options})` | Update data (replace) |
| `patch` | `patch<T>(path, {data, queryParameters, options})` | Update data (partial) |
| `delete` | `delete<T>(path, {data, queryParameters, options})` | Hapus data |
| `upload` | `upload<T>(path, {formData, onSendProgress, options})` | Upload file (multipart) |

**Contoh Penggunaan di Provider:**
```dart
class AuthProvider extends BaseProvider {
  final _api = ApiService.instance;

  Future<void> login({required String email, required String password}) async {
    await runAction(() async {
      try {
        final res = await _api.post('/auth/login', data: {
          'email': email,
          'password': password,
        });
        _user = UserModel.fromJson(res.data);
        _api.setToken(res.data['token']); // simpan token
      } on DioException catch (e) {
        throw ApiException.fromDioError(e); // → pesan user-friendly
      }
    });
  }
}
```

**Token Management:**

| Method | Kegunaan |
|--------|----------|
| `setToken(String?)` | Simpan token setelah login berhasil |
| `clearToken()` | Hapus token saat logout |

Token otomatis dilampirkan ke header `Authorization: Bearer <token>` pada setiap request melalui auth interceptor.

---

### `core/services/api_exception.dart`

Memetakan `DioException` menjadi **pesan error yang user-friendly** (dalam Bahasa Indonesia).

```dart
// Di dalam provider:
try {
  await _api.get('/data');
} on DioException catch (e) {
  throw ApiException.fromDioError(e);
  // Otomatis: timeout → "Koneksi timeout. Periksa jaringan Anda."
  //           401     → "Sesi telah berakhir. Silakan login kembali."
  //           500     → "Terjadi kesalahan pada server."
}
```

**Mapping Error Bawaan:**

| Status / Tipe | Pesan |
|---------------|-------|
| Timeout | Koneksi timeout. Periksa jaringan Anda. |
| Connection Error | Tidak dapat terhubung ke server. |
| `400` | Permintaan tidak valid. |
| `401` | Sesi telah berakhir. Silakan login kembali. |
| `403` | Anda tidak memiliki akses. |
| `404` | Data tidak ditemukan. |
| `422` | Data yang dikirim tidak valid. |
| `429` | Terlalu banyak permintaan. Coba lagi nanti. |
| `500` | Terjadi kesalahan pada server. |

> 💡 Jika response body dari server mengandung key `message` atau `error`, pesan tersebut akan digunakan sebagai pengganti pesan default.

---

### `core/services/storage_service.dart`

Wrapper persistent storage berbasis **`shared_preferences`**.
Menyediakan typed getter/setter untuk token auth, theme mode, onboarding, serta generic key-value access.

```dart
final storage = StorageService.instance;

// Typed accessors:
final token = storage.getToken();
await storage.setToken('jwt_token_here');

final themeMode = storage.getThemeMode(); // ThemeMode.dark / light / system
await storage.setThemeMode(ThemeMode.dark);

// Generic accessors:
await storage.setString('key', 'value');
final val = storage.getString('key');
await storage.clear(); // Hapus semua
```

---

### `core/database/database_helper.dart`

Singleton SQLite helper menggunakan **`sqflite`**.
Mendukung lazy initialization, auto-table creation, migrasi versi, CRUD helpers, serta raw query.

```dart
final db = DatabaseHelper.instance;

// Insert
final id = await db.insert('wallets', {
  'id': 'w_01',
  'name': 'Dompet Tabungan',
  'balance': 500000.0,
});

// Query
final rows = await db.query(
  'wallets',
  where: 'balance > ?',
  whereArgs: [100000],
  orderBy: 'created_at DESC',
);

// Update & Delete
await db.update('wallets', {'balance': 750000.0}, where: 'id = ?', whereArgs: ['w_01']);
await db.delete('wallets', where: 'id = ?', whereArgs: ['w_01']);

// Raw Query & Transaction
final results = await db.rawQuery('SELECT SUM(balance) as total FROM wallets');
```

---

### `core/di/service_locator.dart`

Dependency injection container menggunakan **`get_it`**.
Mengizinkan decoupling modul dan mempermudah unit testing dengan mock.

```dart
// Akses service di mana saja:
final api = locate<ApiService>();         // atau getIt<ApiService>()
final storage = locate<StorageService>(); // atau getIt<StorageService>()
final db = locate<DatabaseHelper>();      // atau getIt<DatabaseHelper>()
```

Inisialisasi dilakukan sekali di `main.dart`:
```dart
await setupServiceLocator();
```

---

### `core/router/app_router.dart` & `app_routes.dart`

Declarative routing menggunakan **`go_router`**.
Mendukung navigasi berbasis URL, path parameters, query parameters, redirect auth guard, dan error 404 page.

**Konstanta Rute (`app_routes.dart`):**
```dart
class AppRoutes {
  static const String home = '/';
  static const String login = '/login';
  static const String register = '/register';
  static const String example = '/example';
}
```

**Navigasi di Widget:**
```dart
// Pindah halaman (push / go):
context.go(AppRoutes.home);
context.push(AppRoutes.login);

// Kembali:
context.pop();
```

---

## 🔄 Layer 2 — Providers

State management menggunakan **Provider** dengan pola `ChangeNotifier`.

### Hierarki Provider

```
BaseProvider  (abstract)
├── AppProvider         — theme mode, onboarding status
├── AuthProvider        — sesi pengguna (login/logout)
├── WalletProvider      — (TODO) saldo & daftar dompet
└── TransactionProvider — (TODO) riwayat transaksi
```

---

### `BaseProvider` — Pattern Standard

**Semua provider wajib extend `BaseProvider`** untuk mendapatkan loading & error yang konsisten.

```dart
class WalletProvider extends BaseProvider {
  List<Wallet> _wallets = [];
  List<Wallet> get wallets => _wallets;

  Future<void> fetchWallets() async {
    // runAction otomatis: isLoading=true, tangkap error, isLoading=false
    await runAction(() async {
      _wallets = await api.getWallets();
      notifyListeners();
    });
  }
}
```

**API BaseProvider:**

| Method / Getter | Tipe | Kegunaan |
|-----------------|------|----------|
| `isLoading` | `bool` | Tampilkan spinner/shimmer |
| `errorMessage` | `String?` | Pesan error (`null` jika aman) |
| `hasError` | `bool` | Shortcut: `errorMessage != null` |
| `setLoading(bool)` | `void` | Set loading + `notifyListeners()` |
| `setError(String?)` | `void` | Set error + `notifyListeners()` |
| `clearError()` | `void` | Hapus error + `notifyListeners()` |
| `runAction(fn)` | `Future<void>` | Wrapper async dengan loading & error otomatis |

---

### `AppProvider`

```dart
context.read<AppProvider>().toggleTheme();
context.read<AppProvider>().setThemeMode(ThemeMode.dark);
context.watch<AppProvider>().isDarkMode   // bool
context.watch<AppProvider>().themeMode    // ThemeMode
```

### `AuthProvider`

```dart
await context.read<AuthProvider>().login(
  email: 'user@mail.com',
  password: 'password',
);
await context.read<AuthProvider>().logout();
context.watch<AuthProvider>().isLoggedIn   // bool
context.watch<AuthProvider>().user         // UserModel?
context.watch<AuthProvider>().displayName  // String
```

---

### Mendaftarkan Provider Baru

**Step 1:** Buat `lib/providers/wallet_provider.dart`
```dart
import 'base_provider.dart';
class WalletProvider extends BaseProvider { ... }
```

**Step 2:** Export di `lib/providers/providers.dart`
```dart
export 'wallet_provider.dart';
```

**Step 3:** Daftarkan di `main.dart`
```dart
MultiProvider(providers: [
  ChangeNotifierProvider(create: (_) => AppProvider()),
  ChangeNotifierProvider(create: (_) => AuthProvider()),
  ChangeNotifierProvider(create: (_) => WalletProvider()), // ← tambah
])
```

---

## 🖼️ Layer 3 — Shared Widgets

Import via: `import 'package:my_wallet_management/shared/widgets/widgets.dart';`

### `AppButton`

```dart
AppButton(label: 'Simpan', onPressed: () {}, isLoading: provider.isLoading)
AppButton.outline(label: 'Batal', onPressed: () {})
AppButton(label: 'Tambah', icon: const Icon(Icons.add), onPressed: () {})
```

### `AppTextField`

```dart
AppTextField(
  label: 'Email',
  hint: 'nama@email.com',
  controller: _ctrl,
  keyboardType: TextInputType.emailAddress,
  validator: (v) => v!.isEmpty ? 'Wajib diisi' : null,
)
```

---

## 📱 Layer 4 — Features

### Struktur Folder Feature

```
features/
└── wallet/
    ├── wallet_page.dart       ← UI utama
    ├── wallet_viewmodel.dart  ← (opsional) logika lokal
    └── widgets/
        └── wallet_card.dart   ← (opsional) widget khusus
```

### Cara Consume Provider

```dart
// READ + rebuild otomatis
final auth = context.watch<AuthProvider>();

// READ tanpa rebuild (untuk onPressed / callback)
final auth = context.read<AuthProvider>();

// SELECT — rebuild hanya saat field tertentu berubah
final name = context.select<AuthProvider, String>((p) => p.displayName);
```

### Pola Loading & Error

```dart
class WalletPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final wallet = context.watch<WalletProvider>();

    if (wallet.isLoading) return const Center(child: CircularProgressIndicator());
    if (wallet.hasError) return Center(
      child: Column(children: [
        Text(wallet.errorMessage!),
        AppButton(label: 'Coba Lagi', onPressed: wallet.fetchWallets),
      ]),
    );

    return ListView.builder(/* ... */);
  }
}
```

---

## 🚀 `main.dart` Setup

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // 1. Load environment variables (.env)
  await dotenv.load(fileName: '.env');

  // 2. Setup Dependency Injection (GetIt)
  // Mendaftarkan ApiService, StorageService, dan DatabaseHelper
  await setupServiceLocator();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppProvider()),
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => ExampleTodoProvider()..fetchTodos()),
      ],
      child: Consumer2<AppProvider, AuthProvider>(
        builder: (_, appProvider, authProvider, __) {
          return ScreenUtilInit(
            designSize: const Size(Sizes.designWidth, Sizes.designHeight),
            minTextAdapt: true,
            splitScreenMode: true,
            builder: (context, child) {
              return MaterialApp.router(
                title: AppStrings.appName,
                debugShowCheckedModeBanner: false,
                theme: AppTheme.light,
                darkTheme: AppTheme.dark,
                themeMode: appProvider.themeMode,
                routerConfig: AppRouter.router(
                  isLoggedIn: authProvider.isLoggedIn,
                  enableAuthGuard: false, // ubah true saat halaman auth sudah siap
                ),
              );
            },
          );
        },
      ),
    );
  }
}
```

**Urutan pembungkus (luar → dalam):**
```
dotenv.load()                     ← Baca konfigurasi environment
  └─ setupServiceLocator()        ← Inisialisasi StorageService, DatabaseHelper, ApiService
       └─ MultiProvider           ← Injeksi state providers global
            └─ Consumer2<App, Auth> ← Reaktif terhadap perubahan tema & status auth
                 └─ ScreenUtilInit  ← Inisialisasi responsive sizing
                      └─ MaterialApp.router ← Declarative routing via GoRouter
```

---

## 🌐 Cara Pakai ApiService

### Setup Awal

1. Pastikan `.env` ada di root project dengan `API_BASE_URL`:
   ```env
   API_BASE_URL=http://localhost:3001/
   ```

2. Pastikan `.env` terdaftar di `pubspec.yaml`:
   ```yaml
   flutter:
     assets:
       - .env
   ```

3. Pastikan `main.dart` memuat `.env` sebelum `runApp()`:
   ```dart
   await dotenv.load(fileName: '.env');
   ```

### Pola Penggunaan di Provider

```dart
import 'package:dio/dio.dart';
import 'package:frontend_mobile_flutter/core/core.dart';

class WalletProvider extends BaseProvider {
  final _api = ApiService.instance;

  List<Wallet> _wallets = [];
  List<Wallet> get wallets => _wallets;

  /// Ambil semua wallet dari API.
  Future<void> fetchWallets() async {
    await runAction(() async {
      try {
        final res = await _api.get('/wallets');
        _wallets = (res.data as List)
            .map((json) => Wallet.fromJson(json))
            .toList();
        notifyListeners();
      } on DioException catch (e) {
        throw ApiException.fromDioError(e);
      }
    });
  }

  /// Tambah wallet baru.
  Future<void> createWallet(String name, double balance) async {
    await runAction(() async {
      try {
        await _api.post('/wallets', data: {
          'name': name,
          'balance': balance,
        });
        await fetchWallets(); // refresh list
      } on DioException catch (e) {
        throw ApiException.fromDioError(e);
      }
    });
  }
}
```

### Alur Data

```
UI (Feature)
  │  context.read<WalletProvider>().fetchWallets()
  ▼
Provider (State)
  │  runAction() → isLoading=true → clearError()
  │  _api.get('/wallets')
  ▼
ApiService (Network)
  │  Dio → auth interceptor → attach token
  │  GET http://localhost:3001/wallets
  ▼
Backend API → Response
  │
  ▼
Provider → parse response → notifyListeners()
  │
  ▼
UI rebuilds via context.watch<WalletProvider>()
```

### Mengelola Token Auth

```dart
// Setelah login berhasil
ApiService.instance.setToken(response.data['token']);

// Saat logout
ApiService.instance.clearToken();
```

---

## 🗺️ Cara Pakai GoRouter

### 1. Navigasi Dasar
Gunakan ekstensi context dari `go_router`:

```dart
import 'package:go_router/go_router.dart';
import 'package:frontend_mobile_flutter/core/core.dart';

// Ganti halaman (menghapus stack sebelumnya jika navigasi top-level):
context.go(AppRoutes.home);

// Tumpuk halaman baru ke atas stack:
context.push(AppRoutes.example);

// Kembali ke halaman sebelumnya:
if (context.canPop()) {
  context.pop();
}
```

### 2. Passing Parameter
```dart
// Path parameter: misal '/wallet/:id'
context.go('/wallet/123');
// Di builder: state.pathParameters['id']

// Query parameter: misal '/search?q=gaji'
context.go('/search?q=gaji');
// Di builder: state.uri.queryParameters['q']

// Extra object (kompleks payload):
context.push(AppRoutes.home, extra: myWalletObject);
// Di builder: state.extra as WalletModel
```

### 3. Menambah Rute Baru
1. Buka `lib/core/router/app_routes.dart` → tambahkan konstanta:
   ```dart
   static const String wallet = '/wallet';
   ```
2. Buka `lib/core/router/app_router.dart` → daftarkan di `routes`:
   ```dart
   GoRoute(
     path: AppRoutes.wallet,
     name: 'wallet',
     builder: (context, state) => const WalletPage(),
   ),
   ```

---

## 💾 Cara Pakai StorageService (SharedPreferences)

Gunakan `StorageService.instance` untuk penyimpanan key-value lokal permanen.

### Contoh Pemakaian:
```dart
final storage = StorageService.instance;

// 1. Simpan & Baca Token Auth
await storage.setToken('eyJhbGciOi...');
final token = storage.getToken(); // String?

// 2. Simpan & Baca Tema Aplikasi
await storage.setThemeMode(ThemeMode.dark);
final mode = storage.getThemeMode(); // ThemeMode

// 3. Status Onboarding
await storage.setOnboardingDone(true);
final isDone = storage.getOnboardingDone(); // bool

// 4. Data Umum (String, Int, Bool)
await storage.setString('user_nickname', 'Budi');
final nickname = storage.getString('user_nickname');

// 5. Hapus Data
await storage.remove('user_nickname');
await storage.clear(); // Hapus seluruh SharedPreferences
```

---

## 🗄️ Cara Pakai DatabaseHelper (SQLite)

Gunakan `DatabaseHelper.instance` untuk persistensi tabel terstruktur secara offline via SQLite (`sqflite`).

### 1. Operasi CRUD

```dart
final db = DatabaseHelper.instance;

// ── INSERT ─────────────────────────────────────────────────────────────
final rowId = await db.insert('wallets', {
  'id': 'w_cash',
  'name': 'Uang Tunai',
  'balance': 250000.0,
  'currency': 'IDR',
});

// ── QUERY ──────────────────────────────────────────────────────────────
// Query semua baris:
final allWallets = await db.query('wallets');

// Query dengan filter (WHERE) & sorting:
final filtered = await db.query(
  'wallets',
  where: 'balance >= ?',
  whereArgs: [100000.0],
  orderBy: 'balance DESC',
  limit: 10,
);

// ── UPDATE ─────────────────────────────────────────────────────────────
await db.update(
  'wallets',
  {'balance': 300000.0},
  where: 'id = ?',
  whereArgs: ['w_cash'],
);

// ── DELETE ─────────────────────────────────────────────────────────────
await db.delete(
  'wallets',
  where: 'id = ?',
  whereArgs: ['w_cash'],
);

// ── RAW SQL QUERY ──────────────────────────────────────────────────────
final summary = await db.rawQuery(
  'SELECT SUM(balance) as total_saldo FROM wallets',
);
final total = summary.first['total_saldo'];
```

### 2. Menambah Tabel Baru atau Migrasi
Edit `lib/core/database/database_helper.dart`:
- Tambahkan perintah `CREATE TABLE` pada `_onCreate`.
- Untuk upgrade database, naikkan `_databaseVersion = 2` dan tambahkan skrip di `_onUpgrade`.

---

## 💉 Cara Pakai Dependency Injection (GetIt)

Service Locator `GetIt` mengisolasi pembuatan objek sehingga dependensi dapat diganti dengan mock saat testing.

### Mengambil Dependensi:
```dart
import 'package:frontend_mobile_flutter/core/core.dart';

// Cara 1: Menggunakan helper locate<T>()
final api = locate<ApiService>();
final storage = locate<StorageService>();
final db = locate<DatabaseHelper>();

// Cara 2: Menggunakan getIt<T>()
final api = getIt<ApiService>();
```

### Mendaftarkan Service / Repository Baru:
Buka `lib/core/di/service_locator.dart`:
```dart
Future<void> setupServiceLocator() async {
  // ... core services ...

  // Singleton (dibuat saat pertama kali dipanggil):
  getIt.registerLazySingleton<WalletRepository>(
    () => WalletRepositoryImpl(api: locate<ApiService>(), db: locate<DatabaseHelper>()),
  );

  // Factory (instance baru setiap kali locate):
  getIt.registerFactory<SomeHelper>(() => SomeHelper());
}
```

---

## 🧪 Cara Menulis Unit Test & Mocking

Testing provider dan logika bisnis menggunakan `flutter_test`, `mockito`, dan `build_runner`.

### 1. Struktur File Test
Letakkan pengujian di folder `test/`:
```
test/
└── providers/
    ├── auth_provider_test.dart
    └── auth_provider_test.mocks.dart  ← Generated by build_runner
```

### 2. Contoh Test dengan Mockito
```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:frontend_mobile_flutter/core/core.dart';
import 'package:frontend_mobile_flutter/providers/auth_provider.dart';

import 'auth_provider_test.mocks.dart';

// Anotasi untuk menghasilkan Mock class
@GenerateMocks([ApiService])
void main() {
  group('AuthProvider Tests', () {
    late AuthProvider authProvider;
    late MockApiService mockApiService;

    setUp(() {
      authProvider = AuthProvider();
      mockApiService = MockApiService();
    });

    test('Initial state should be unauthenticated', () {
      expect(authProvider.isLoggedIn, false);
      expect(authProvider.user, isNull);
    });

    test('login() updates user state', () async {
      await authProvider.login(email: 'test@mail.com', password: 'secret');
      expect(authProvider.isLoggedIn, true);
      expect(authProvider.user?.email, 'test@mail.com');
    });

    test('Mock ApiService method call', () {
      when(mockApiService.clearToken()).thenReturn(null);
      mockApiService.clearToken();
      verify(mockApiService.clearToken()).called(1);
    });
  });
}
```

### 3. Perintah Menjalankan Test
```bash
# 1. Generate / update mock classes jika ada perubahan @GenerateMocks
dart run build_runner build --delete-conflicting-outputs

# 2. Jalankan semua unit test
flutter test

# 3. Jalankan satu file test tertentu
flutter test test/providers/auth_provider_test.dart
```

---

## 📋 Menambah Fitur Baru — Checklist

- [ ] Buat folder `lib/features/nama_fitur/`
- [ ] Buat `nama_page.dart` sebagai UI widget
- [ ] Jika butuh state: buat `lib/providers/nama_provider.dart` extend `BaseProvider`
- [ ] Daftarkan provider di `main.dart` → `MultiProvider`
- [ ] Export di `providers/providers.dart`
- [ ] API call: gunakan `ApiService.instance` — **jangan buat Dio sendiri**
- [ ] Error handling: tangkap `DioException` → lempar `ApiException.fromDioError(e)`
- [ ] Semua dimensi: `Sizes.*` atau `.w/.h/.r/.sp` — **jangan hardcode pixel**
- [ ] Semua warna: `AppColors.*` — **jangan hardcode warna**
- [ ] Widget reusable? → pindah ke `shared/widgets/` + export di `widgets.dart`

---

## ⚠️ Konvensi & Rules

| # | Rule | Keterangan |
|---|------|-----------|
| 1 | Jangan import `flutter_screenutil` langsung | Gunakan `core/utils/sizes.dart` |
| 2 | Jangan hardcode dimensi | Pakai `Sizes.*` atau `.w/.h/.r/.sp` |
| 3 | Jangan hardcode warna | Pakai `AppColors.*` |
| 4 | Provider harus extend `BaseProvider` | Loading & error handling konsisten |
| 5 | Gunakan barrel exports | Import via `core.dart`, `providers.dart`, `widgets.dart` |
| 6 | Feature = folder mandiri | Tidak boleh import dari feature lain |
| 7 | `context.read` untuk event | `context.watch` untuk build |
| 8 | `runAction()` untuk async di provider | Jangan `setLoading` manual |
| 9 | Semua API call via `ApiService.instance` | Jangan buat instance `Dio` sendiri |
| 10 | Tangkap `DioException` → `ApiException` | Pesan error konsisten & user-friendly |
| 11 | Base URL di `.env` | Jangan hardcode URL API |
| 12 | Navigasi via `go_router` & `AppRoutes` | Gunakan `context.go()` / `context.push()` dengan `AppRoutes.*` |
| 13 | Local Key-Value via `StorageService` | Token, tema, & preferensi tersimpan otomatis |
| 14 | Local Database via `DatabaseHelper` | SQLite offline caching & query terstruktur |
| 15 | Resolve service via `locate<T>()` | Decoupling service untuk memudahkan mock testing |

---

## 🔮 Roadmap Pengembangan Lanjutan

| Fitur | Package | Status |
|-------|---------|--------|
| Navigasi multi-halaman | `go_router` | ✅ Done — `core/router/app_router.dart` & `app_routes.dart` |
| Persistent state | `shared_preferences` | ✅ Done — `core/services/storage_service.dart` |
| API call | `dio` + `flutter_dotenv` | ✅ Done — `core/services/api_service.dart` |
| Local database | `sqflite` + `path` | ✅ Done — `core/database/database_helper.dart` |
| Dependency injection | `get_it` | ✅ Done — `core/di/service_locator.dart` |
| Testing provider & mock | `mockito` + `flutter_test` + `build_runner` | ✅ Done — `test/providers/auth_provider_test.dart` |

---

*Dokumentasi ini dibuat otomatis · Flutter 3.16.5 · 2026-10-20*
