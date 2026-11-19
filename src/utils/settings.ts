export type ThemePreference = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';
export type TextSize = 'normal' | 'large' | 'extra-large';

export interface AppSettings {
  theme: ThemePreference;
  textSize: TextSize;
}

const SETTINGS_STORAGE_KEY = 'gitstart-settings-v1';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'system',
  textSize: 'normal',
};

export function getSavedSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw) as Partial<AppSettings>;
    const theme: ThemePreference =
      parsed.theme === 'light' || parsed.theme === 'dark' || parsed.theme === 'system'
        ? parsed.theme
        : 'system';
    const textSize: TextSize =
      parsed.textSize === 'normal' ||
      parsed.textSize === 'large' ||
      parsed.textSize === 'extra-large'
        ? parsed.textSize
        : 'normal';
    return { theme, textSize };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: AppSettings) {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage write errors
  }
}

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === 'light' || preference === 'dark') {
    return preference;
  }
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

export function applySettingsToDocument(settings: AppSettings): ResolvedTheme {
  const resolved = resolveTheme(settings.theme);
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.classList.toggle('dark', resolved === 'dark');
    root.setAttribute('data-theme', resolved);
    root.setAttribute('data-text-size', settings.textSize);
    root.style.colorScheme = resolved;
  }
  return resolved;
}
