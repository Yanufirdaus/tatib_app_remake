import 'package:flutter/material.dart';
import '../../core/core.dart';

/// A responsive, themed primary button.
///
/// Example:
///   AppButton(label: 'Save', onPressed: () {})
///   AppButton.outline(label: 'Cancel', onPressed: () {})
class AppButton extends StatelessWidget {
  const AppButton({
    super.key,
    required this.label,
    this.onPressed,
    this.isLoading = false,
    this.icon,
    this.width,
  }) : _isOutline = false;

  const AppButton.outline({
    super.key,
    required this.label,
    this.onPressed,
    this.isLoading = false,
    this.icon,
    this.width,
  }) : _isOutline = true;

  final String label;
  final VoidCallback? onPressed;
  final bool isLoading;
  final Widget? icon;
  final double? width;
  final bool _isOutline;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    Widget child = isLoading
        ? SizedBox(
            width: Sizes.r(20),
            height: Sizes.r(20),
            child: CircularProgressIndicator(
              strokeWidth: 2,
              color: _isOutline ? colorScheme.primary : AppColors.textOnPrimary,
            ),
          )
        : Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (icon != null) ...[icon!, SizedBox(width: Sizes.spaceXS)],
              Text(label),
            ],
          );

    final style = _isOutline
        ? OutlinedButton.styleFrom(
            side: BorderSide(color: colorScheme.primary),
            minimumSize: Size(width ?? double.infinity, Sizes.buttonHeight),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(Sizes.radiusM),
            ),
            textStyle: TextStyle(fontSize: Sizes.textL, fontWeight: FontWeight.w600),
          )
        : ElevatedButton.styleFrom(
            minimumSize: Size(width ?? double.infinity, Sizes.buttonHeight),
          );

    return _isOutline
        ? OutlinedButton(onPressed: isLoading ? null : onPressed, style: style, child: child)
        : ElevatedButton(onPressed: isLoading ? null : onPressed, style: style, child: child);
  }
}
