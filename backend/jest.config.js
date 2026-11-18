// const { createDefaultPreset } = require("ts-jest");
const config = {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
};
export default config;
