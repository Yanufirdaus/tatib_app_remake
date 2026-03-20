import { getDefaultConfig } from "expo/metro-config";
// @ts-ignore
import { withNativeWind } from "nativewind/metro";

const config = getDefaultConfig(__dirname);

// @ts-ignore
module.exports = withNativeWind(config, { input: "./global.css" });