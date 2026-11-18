import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart' as p;

/// A singleton helper class for managing the local SQLite database.
///
/// Provides lazy initialization of the database connection and generic
/// CRUD helper methods for interacting with any table.
///
/// Usage:
/// ```dart
/// final db = DatabaseHelper.instance;
/// await db.insert('transactions', {'amount': 100.0, 'type': 'income'});
/// ```
class DatabaseHelper {
  /// The singleton instance of [DatabaseHelper].
  static DatabaseHelper get instance => _instance;
  static final DatabaseHelper _instance = DatabaseHelper._internal();

  /// The name of the database file stored on disk.
  static const String _databaseName = 'app_database.db';

  /// The current schema version of the database.
  ///
  /// Increment this value when making schema changes and handle the
  /// migration in [_onUpgrade].
  static const int _databaseVersion = 1;

  /// The cached database instance, lazily initialized.
  Database? _database;

  DatabaseHelper._internal();

  /// Returns the database instance, initializing it if necessary.
  ///
  /// The database is created lazily on first access and cached for
  /// subsequent calls.
  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB();
    return _database!;
  }

  /// Initializes the database by resolving the file path and opening
  /// the connection.
  ///
  /// The database file is stored in the platform-specific databases
  /// directory with the name [_databaseName].
  Future<Database> _initDB() async {
    final databasesPath = await getDatabasesPath();
    final path = p.join(databasesPath, _databaseName);

    return await openDatabase(
      path,
      version: _databaseVersion,
      onCreate: _onCreate,
      onUpgrade: _onUpgrade,
    );
  }

  /// Called when the database is created for the first time.
  ///
  /// Use this method to create the initial table schema.
  ///
  /// Example:
  /// ```dart
  /// await db.execute('''
  ///   CREATE TABLE transactions (
  ///     id INTEGER PRIMARY KEY AUTOINCREMENT,
  ///     amount REAL NOT NULL,
  ///     type TEXT NOT NULL,
  ///     created_at TEXT NOT NULL DEFAULT (datetime('now'))
  ///   )
  /// ''');
  /// ```
  Future<void> _onCreate(Database db, int version) async {
    // Initial tables for local wallet caching & offline data
    await db.execute('''
      CREATE TABLE IF NOT EXISTS wallets (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        balance REAL NOT NULL DEFAULT 0.0,
        currency TEXT NOT NULL DEFAULT 'IDR',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    ''');

    await db.execute('''
      CREATE TABLE IF NOT EXISTS local_cache (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    ''');
  }

  /// Called when the database version is incremented.
  ///
  /// Use this method to perform schema migrations between versions.
  ///
  /// Example:
  /// ```dart
  /// if (oldVersion < 2) {
  ///   await db.execute('ALTER TABLE transactions ADD COLUMN note TEXT');
  /// }
  /// ```
  Future<void> _onUpgrade(Database db, int oldVersion, int newVersion) async {
    // TODO: Add migration logic here when _databaseVersion is incremented.
  }

  /// Inserts a row into the specified [table].
  ///
  /// [data] is a map of column names to values. Returns the id of the
  /// newly inserted row.
  ///
  /// Example:
  /// ```dart
  /// final id = await DatabaseHelper.instance.insert(
  ///   'transactions',
  ///   {'amount': 50.0, 'type': 'expense'},
  /// );
  /// ```
  Future<int> insert(String table, Map<String, dynamic> data) async {
    final db = await database;
    return await db.insert(table, data);
  }

  /// Queries rows from the specified [table].
  ///
  /// Supports optional filtering with [where] and [whereArgs], ordering
  /// with [orderBy], and pagination with [limit].
  ///
  /// Returns a list of maps, where each map represents a row with column
  /// names as keys.
  ///
  /// Example:
  /// ```dart
  /// final rows = await DatabaseHelper.instance.query(
  ///   'transactions',
  ///   where: 'type = ?',
  ///   whereArgs: ['income'],
  ///   orderBy: 'created_at DESC',
  ///   limit: 10,
  /// );
  /// ```
  Future<List<Map<String, dynamic>>> query(
    String table, {
    String? where,
    List<dynamic>? whereArgs,
    String? orderBy,
    int? limit,
  }) async {
    final db = await database;
    return await db.query(
      table,
      where: where,
      whereArgs: whereArgs,
      orderBy: orderBy,
      limit: limit,
    );
  }

  /// Updates rows in the specified [table] that match the given [where]
  /// clause.
  ///
  /// [data] is a map of column names to their new values. Returns the
  /// number of rows affected.
  ///
  /// Example:
  /// ```dart
  /// final count = await DatabaseHelper.instance.update(
  ///   'transactions',
  ///   {'amount': 75.0},
  ///   where: 'id = ?',
  ///   whereArgs: [1],
  /// );
  /// ```
  Future<int> update(
    String table,
    Map<String, dynamic> data, {
    String? where,
    List<dynamic>? whereArgs,
  }) async {
    final db = await database;
    return await db.update(
      table,
      data,
      where: where,
      whereArgs: whereArgs,
    );
  }

  /// Deletes rows from the specified [table] that match the given [where]
  /// clause.
  ///
  /// Returns the number of rows deleted.
  ///
  /// Example:
  /// ```dart
  /// final count = await DatabaseHelper.instance.delete(
  ///   'transactions',
  ///   where: 'id = ?',
  ///   whereArgs: [1],
  /// );
  /// ```
  Future<int> delete(
    String table, {
    String? where,
    List<dynamic>? whereArgs,
  }) async {
    final db = await database;
    return await db.delete(
      table,
      where: where,
      whereArgs: whereArgs,
    );
  }

  /// Executes a raw SQL query and returns the result rows.
  ///
  /// Use this for complex queries that cannot be expressed with the
  /// generic [query] method, such as joins or aggregations.
  ///
  /// [sql] is the raw SQL string. [arguments] are optional positional
  /// parameters to bind into the query.
  ///
  /// Example:
  /// ```dart
  /// final results = await DatabaseHelper.instance.rawQuery(
  ///   'SELECT type, SUM(amount) as total FROM transactions GROUP BY type',
  /// );
  /// ```
  Future<List<Map<String, dynamic>>> rawQuery(
    String sql, [
    List<dynamic>? arguments,
  ]) async {
    final db = await database;
    return await db.rawQuery(sql, arguments);
  }

  /// Closes the database connection and releases resources.
  ///
  /// After calling this method, the next access to [database] will
  /// re-initialize the connection.
  Future<void> close() async {
    final db = await database;
    await db.close();
    _database = null;
  }
}
