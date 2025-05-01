// types/theme.d.ts
type Theme = "light" | "dark" | "system";

interface ThemeContextType {
    theme: Theme | string;
    toggleTheme: (theme: Theme) => void;
}