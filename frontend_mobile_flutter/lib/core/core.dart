/// Barrel export for core layer.
///
/// Import only this file in features/providers instead of individual paths:
///   import 'package:my_wallet_management/core/core.dart';
library core;

export 'constants/app_colors.dart';
export 'constants/app_strings.dart';
export 'database/database_helper.dart';
export 'di/service_locator.dart';
export 'router/app_router.dart';
export 'router/app_routes.dart';
export 'services/api_service.dart';
export 'services/api_exception.dart';
export 'services/storage_service.dart';
export 'theme/app_theme.dart';
export 'utils/sizes.dart';
