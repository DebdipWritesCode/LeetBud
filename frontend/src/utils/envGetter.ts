function getEnvVar(key: string): string {
  const value = import.meta.env[key as keyof ImportMetaEnv];
  if (!value) {
    throw new Error(`Environment variable "${key}" is not defined`);
  }
  return value;
}

export function getJdoodleClientId(): string {
  return getEnvVar('VITE_JDOODLE_CLIENT_ID');
}

export function getJdoodleClientSecret(): string {
  return getEnvVar('VITE_JDOODLE_CLIENT_SECRET');
}
