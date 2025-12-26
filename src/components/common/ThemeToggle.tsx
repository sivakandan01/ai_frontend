import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center bg-[rgb(var(--input-bg))] border border-[rgb(var(--border-color))] rounded-lg shadow-sm">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md transition-all duration-200 ${
          theme === 'light'
            ? 'bg-[rgb(var(--button-primary))] text-white'
            : 'text-[rgb(var(--secondary-text))] hover:text-[rgb(var(--primary-text))]'
        }`}
        aria-label="Light mode"
        title="Light mode"
      >
        <Sun className="w-5 h-5" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-[rgb(var(--button-primary))] text-white'
            : 'text-[rgb(var(--secondary-text))] hover:text-[rgb(var(--primary-text))]'
        }`}
        aria-label="Dark mode"
        title="Dark mode"
      >
        <Moon className="w-5 h-5" />
      </button>
    </div>
  );
}
