import 'package:flutter/material.dart';
import '../../core/core.dart';

/// A styled text input field built on top of the theme's InputDecorationTheme.
///
/// Example:
///   AppTextField(
///     label: 'Email',
///     hint: 'you@example.com',
///     controller: _emailCtrl,
///     keyboardType: TextInputType.emailAddress,
///   )
class AppTextField extends StatelessWidget {
  const AppTextField({
    super.key,
    required this.label,
    this.hint,
    this.controller,
    this.keyboardType,
    this.obscureText = false,
    this.suffixIcon,
    this.validator,
    this.onChanged,
  });

  final String label;
  final String? hint;
  final TextEditingController? controller;
  final TextInputType? keyboardType;
  final bool obscureText;
  final Widget? suffixIcon;
  final String? Function(String?)? validator;
  final void Function(String)? onChanged;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: Sizes.textM,
            fontWeight: FontWeight.w500,
            color: AppColors.textSecondary,
          ),
        ),
        SizedBox(height: Sizes.spaceXS),
        TextFormField(
          controller: controller,
          keyboardType: keyboardType,
          obscureText: obscureText,
          onChanged: onChanged,
          validator: validator,
          style: TextStyle(fontSize: Sizes.textM),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: TextStyle(
              color: AppColors.textSecondary,
              fontSize: Sizes.textM,
            ),
            suffixIcon: suffixIcon,
            contentPadding: EdgeInsets.symmetric(
              horizontal: Sizes.spaceM,
              vertical: Sizes.spaceS,
            ),
          ),
        ),
      ],
    );
  }
}
