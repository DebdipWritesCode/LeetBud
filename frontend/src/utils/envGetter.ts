function getEnvVar(key: string): string {
  const value = import.meta.env[key as keyof ImportMetaEnv];
  if (!value) {
    throw new Error(`Environment variable "${key}" is not defined`);
  }
  return value;
}

export function getBackendUrl(): string {
  return getEnvVar('VITE_BACKEND_URL');
}