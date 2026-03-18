/**
 * Validated environment configuration.
 * Ensures that all required environment variables are present and valid.
 */

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue;
  
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is missing!`);
  }
  
  return value;
};

export const ENV = {
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL'),
  NODE_ENV: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;
