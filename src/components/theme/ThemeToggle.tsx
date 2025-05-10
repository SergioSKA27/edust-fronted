'use client';

import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  const lightTheme: Theme = 'light';
  const darkTheme: Theme = 'dark';
  const themes = [
    { name: lightTheme, icon: <Sun className="w-4 h-4" />, color: '#f59e0b' },
    { name: darkTheme, icon: <Moon className="w-4 h-4" />, color: '#3b82f6' },
  ];

  const handleToggle = () => {
    // Alternamos al tema opuesto
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    toggleTheme(newTheme);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className={cn(
          "h-10 w-10 rounded-full flex items-center justify-center transition-all",
          "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700",
          "shadow-lg hover:shadow-xl",
          "border border-gray-200 dark:border-gray-700"
        )}
        aria-label={`Cambiar a tema ${theme === lightTheme ? 'oscuro' : 'claro'}`}
      >
        <motion.div
          key={theme}
          initial={{ rotate: 45, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ rotate: 45, scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          {themes.find(t => t.name === theme)?.icon}
        </motion.div>
      </button>
    </div>
  );
}