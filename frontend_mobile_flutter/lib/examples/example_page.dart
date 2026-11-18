// ============================================================
//  EXAMPLE PAGE — Contoh implementasi lengkap
//  File ini HANYA untuk referensi, bukan bagian dari fitur.
//  Hapus file ini saat sudah tidak diperlukan.
//
//  Yang dicontohkan:
//   1. Provider (extend BaseProvider, runAction, isLoading, hasError)
//   2. Responsive sizing (Sizes.*)
//   3. AppColors & AppTheme
//   4. Shared widgets (AppButton, AppTextField)
//   5. context.watch / context.read / context.select
//   6. Toggle dark/light mode via AppProvider
// ============================================================

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../core/core.dart';
import '../providers/providers.dart';
import '../shared/widgets/widgets.dart';

// ─────────────────────────────────────────────────────────────
// 1. PROVIDER — extend BaseProvider
// ─────────────────────────────────────────────────────────────

/// Data model sederhana.
class TodoItem {
  final String id;
  final String title;
  final bool isDone;
  const TodoItem({required this.id, required this.title, this.isDone = false});
  TodoItem copyWith({bool? isDone}) =>
      TodoItem(id: id, title: title, isDone: isDone ?? this.isDone);
}

/// Provider untuk mengelola daftar todo.
/// - Extend [BaseProvider] agar dapat isLoading, hasError, runAction.
/// - Gunakan notifyListeners() setiap kali state berubah.
class ExampleTodoProvider extends BaseProvider {
  final List<TodoItem> _todos = [];

  List<TodoItem> get todos => List.unmodifiable(_todos);
  int get doneCount => _todos.where((t) => t.isDone).length;

  /// Simulasi fetch data dari API.
  Future<void> fetchTodos() async {
    await runAction(() async {
      // Simulasi network delay
      await Future.delayed(const Duration(seconds: 1));
      _todos.addAll([
        const TodoItem(id: '1', title: 'Setup Provider'),
        const TodoItem(id: '2', title: 'Setup ScreenUtil'),
        const TodoItem(id: '3', title: 'Buat fitur wallet'),
      ]);
      notifyListeners();
    });
  }

  void toggleDone(String id) {
    final idx = _todos.indexWhere((t) => t.id == id);
    if (idx == -1) return;
    _todos[idx] = _todos[idx].copyWith(isDone: !_todos[idx].isDone);
    notifyListeners();
  }

  Future<void> addTodo(String title) async {
    if (title.trim().isEmpty) return;
    _todos.add(TodoItem(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      title: title.trim(),
    ));
    notifyListeners();
  }
}

// ─────────────────────────────────────────────────────────────
// 2. PAGE — cara daftarkan & consume provider
// ─────────────────────────────────────────────────────────────

/// Cara menavigasi ke halaman ini:
///
///   Navigator.push(
///     context,
///     MaterialPageRoute(
///       builder: (_) => ChangeNotifierProvider(
///         create: (_) => ExampleTodoProvider()..fetchTodos(),
///         child: const ExamplePage(),
///       ),
///     ),
///   );
///
/// Atau daftarkan [ExampleTodoProvider] di MultiProvider pada main.dart
/// jika dibutuhkan secara global.
class ExamplePage extends StatelessWidget {
  const ExamplePage({super.key});

  @override
  Widget build(BuildContext context) {
    // context.watch   → rebuild setiap kali provider notifyListeners()
    // context.read    → ambil sekali, TIDAK rebuild (pakai di callback)
    // context.select  → rebuild hanya saat field tertentu berubah
    final todo = context.watch<ExampleTodoProvider>();
    final app = context.watch<AppProvider>();

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Example Page',
          style: TextStyle(fontSize: Sizes.textXL),
        ),
        actions: [
          // Toggle dark/light mode via AppProvider
          IconButton(
            icon: Icon(
              app.isDarkMode ? Icons.light_mode_rounded : Icons.dark_mode_rounded,
            ),
            onPressed: () => context.read<AppProvider>().toggleTheme(),
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: Sizes.screenPadding),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: Sizes.spaceL),

              // ── Contoh context.select: hanya rebuild teks ini ──────
              _buildSummaryCard(context),

              SizedBox(height: Sizes.spaceL),

              // ── Input tambah todo ──────────────────────────────────
              _AddTodoInput(),

              SizedBox(height: Sizes.spaceM),

              // ── List state: loading / error / data ─────────────────
              Expanded(child: _buildBody(todo)),
            ],
          ),
        ),
      ),
    );
  }

  /// context.select: widget ini hanya rebuild saat [doneCount] berubah,
  /// bukan setiap kali todo list berubah.
  Widget _buildSummaryCard(BuildContext context) {
    final doneCount = context.select<ExampleTodoProvider, int>(
      (p) => p.doneCount,
    );
    final total = context.select<ExampleTodoProvider, int>(
      (p) => p.todos.length,
    );

    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(Sizes.spaceM),
      decoration: BoxDecoration(
        color: AppColors.primary.withOpacity(0.1),
        borderRadius: BorderRadius.circular(Sizes.radiusL),
        border: Border.all(color: AppColors.primary.withOpacity(0.3)),
      ),
      child: Row(
        children: [
          Icon(Icons.checklist_rounded, color: AppColors.primary, size: Sizes.r(24)),
          SizedBox(width: Sizes.spaceS),
          Text(
            'Selesai: $doneCount / $total',
            style: TextStyle(
              fontSize: Sizes.textL,
              fontWeight: FontWeight.w600,
              color: AppColors.primary,
            ),
          ),
        ],
      ),
    );
  }

  /// Menangani 3 state: loading, error, data.
  Widget _buildBody(ExampleTodoProvider todo) {
    // State: loading
    if (todo.isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    // State: error
    if (todo.hasError) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.error_outline, color: AppColors.error, size: Sizes.r(48)),
            SizedBox(height: Sizes.spaceS),
            Text(todo.errorMessage!, style: const TextStyle(color: AppColors.error)),
            SizedBox(height: Sizes.spaceM),
            AppButton(
              label: 'Coba Lagi',
              width: 160,
              onPressed: todo.fetchTodos,
            ),
          ],
        ),
      );
    }

    // State: data kosong
    if (todo.todos.isEmpty) {
      return Center(
        child: Text(
          'Belum ada todo.\nTambahkan di atas!',
          textAlign: TextAlign.center,
          style: TextStyle(color: AppColors.textSecondary, fontSize: Sizes.textM),
        ),
      );
    }

    // State: ada data
    return ListView.separated(
      itemCount: todo.todos.length,
      separatorBuilder: (_, __) => SizedBox(height: Sizes.spaceXS),
      itemBuilder: (context, i) {
        final item = todo.todos[i];
        return _TodoTile(item: item);
      },
    );
  }
}

// ─────────────────────────────────────────────────────────────
// 3. SUB-WIDGETS
// ─────────────────────────────────────────────────────────────

class _AddTodoInput extends StatefulWidget {
  @override
  State<_AddTodoInput> createState() => _AddTodoInputState();
}

class _AddTodoInputState extends State<_AddTodoInput> {
  final _ctrl = TextEditingController();

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: AppTextField(
            label: '',
            hint: 'Tambah todo baru...',
            controller: _ctrl,
          ),
        ),
        SizedBox(width: Sizes.spaceS),
        AppButton(
          label: 'Tambah',
          width: 90,
          onPressed: () {
            // context.read → tidak memicu rebuild
            context.read<ExampleTodoProvider>().addTodo(_ctrl.text);
            _ctrl.clear();
          },
        ),
      ],
    );
  }
}

class _TodoTile extends StatelessWidget {
  const _TodoTile({required this.item});
  final TodoItem item;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        contentPadding: EdgeInsets.symmetric(
          horizontal: Sizes.spaceM,
          vertical: Sizes.spaceXS,
        ),
        leading: Checkbox(
          value: item.isDone,
          activeColor: AppColors.primary,
          onChanged: (_) =>
              context.read<ExampleTodoProvider>().toggleDone(item.id),
        ),
        title: Text(
          item.title,
          style: TextStyle(
            fontSize: Sizes.textM,
            fontWeight: FontWeight.w500,
            decoration: item.isDone ? TextDecoration.lineThrough : null,
            color: item.isDone ? AppColors.textSecondary : AppColors.textPrimary,
          ),
        ),
      ),
    );
  }
}
